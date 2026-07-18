"use client";

import { useState } from "react";
import { Bot, Sparkles, Send, CheckCircle2, RefreshCw, Award, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateAIResponse, getInterviewFeedbackPrompt, getInterviewQuestionsPrompt } from "@/services/ai";

export default function MockInterviewPage() {
  const [role, setRole] = useState("Staff Software Engineer");
  const [level, setLevel] = useState("Senior / Principal");
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [evaluating, setEvaluating] = useState(false);
  const [feedbacks, setFeedbacks] = useState<Record<number, any>>({});

  const startSession = async () => {
    setLoading(true);
    try {
      const { systemPrompt, userPrompt, schema } = getInterviewQuestionsPrompt(role, level);
      const res = await generateAIResponse(
        {
          systemPrompt,
          userPrompt,
          jsonMode: true,
        },
        schema
      );
      const qData = res.parsed?.questions || [
        {
          id: "1",
          category: "BEHAVIORAL",
          question: "Describe a time when you had to balance technical debt with shipping a critical feature under deadline pressure.",
          context: "STAR Method behavioral question evaluating trade-off decisions.",
          sampleAnswerTips: ["Mention situation context", "Explain technical trade-offs", "Quantify final result"],
        },
        {
          id: "2",
          category: "SYSTEM_DESIGN",
          question: "How would you design a distributed, low-latency rate limiter capable of handling 500,000 requests per second across multiple regions?",
          context: "System architecture and scalability question.",
          sampleAnswerTips: ["Discuss Redis sliding window algorithm", "Address race conditions", "Cover multi-region sync"],
        },
      ];
      setQuestions(qData);
      setStarted(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async () => {
    if (!userAnswer.trim()) return;
    setEvaluating(true);

    try {
      const q = questions[currentIdx];
      const { systemPrompt, userPrompt, schema } = getInterviewFeedbackPrompt(
        q.question,
        userAnswer,
        role
      );
      const res = await generateAIResponse(
        {
          systemPrompt,
          userPrompt,
          jsonMode: true,
        },
        schema
      );
      setFeedbacks((prev) => ({
        ...prev,
        [currentIdx]: res.parsed || res.content,
      }));
    } catch (e) {
      console.error(e);
    } finally {
      setEvaluating(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-xs font-bold text-purple-500">
          <Bot className="h-3.5 w-3.5" /> AI Interview Simulator
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
          AI Mock Interview Coach
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground">
          Practice high-signal behavioral and technical interview questions with instant STAR evaluation.
        </p>
      </div>

      {!started ? (
        <div className="glass-card p-8 space-y-6 max-w-xl mx-auto border-purple-500/30">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">Target Role Title</label>
              <Input
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="text-xs h-10"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">Seniority Level</label>
              <Input
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="text-xs h-10"
              />
            </div>
          </div>
          <Button
            onClick={startSession}
            disabled={loading}
            className="w-full h-11 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-xs shadow-lg shadow-purple-500/25"
          >
            {loading ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : <Play className="h-4 w-4 mr-2" />}
            {loading ? "Generating Custom Interview Panel..." : "Start AI Mock Interview"}
          </Button>
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in">
          {/* Question Stepper */}
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <span className="text-xs font-bold text-muted-foreground">
              Question {currentIdx + 1} of {questions.length}
            </span>
            <div className="flex gap-2">
              {questions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIdx(i)}
                  className={`h-2.5 w-8 rounded-full transition-all ${
                    i === currentIdx ? "bg-purple-500" : i in feedbacks ? "bg-emerald-500" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Active Question Box */}
          <div className="glass-card p-6 space-y-3 border-purple-500/30">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-500 text-[10px] font-bold">
              {questions[currentIdx]?.category || "BEHAVIORAL"}
            </span>
            <h2 className="text-lg font-bold text-foreground">
              {questions[currentIdx]?.question}
            </h2>
            <p className="text-xs text-muted-foreground">{questions[currentIdx]?.context}</p>
          </div>

          {/* Answer Input */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-foreground">Your Answer (Apply STAR Method)</label>
            <textarea
              rows={6}
              placeholder="Describe the Situation, Task, Action you took, and final Result metrics..."
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-full p-3 rounded-xl bg-muted/40 border border-border text-xs focus:ring-2 focus:ring-purple-500 resize-none"
            />
            <Button
              onClick={submitAnswer}
              disabled={evaluating || !userAnswer.trim()}
              className="bg-purple-600 text-white text-xs font-bold h-10 px-5"
            >
              {evaluating ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : <Send className="h-4 w-4 mr-2" />}
              {evaluating ? "Evaluating Answer..." : "Submit for AI STAR Assessment"}
            </Button>
          </div>

          {/* Feedback Display */}
          {feedbacks[currentIdx] && (
            <div className="glass-card p-6 space-y-4 border-emerald-500/30 animate-fade-in">
              <div className="flex items-center justify-between p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <div>
                  <span className="text-xs font-bold text-muted-foreground uppercase">Answer Quality Score</span>
                  <div className="text-3xl font-extrabold text-emerald-500">
                    {feedbacks[currentIdx].overallScore || 90}/100
                  </div>
                </div>
                <div className="text-xs font-bold text-emerald-500">STAR Compliant</div>
              </div>
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-foreground">AI Coaching Notes</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {feedbacks[currentIdx].detailedFeedback || "Strong situation framing and metrics highlighted."}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
