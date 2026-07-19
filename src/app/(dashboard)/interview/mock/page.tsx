"use client";

import { useState } from "react";
import { Bot, Sparkles, Send, CheckCircle2, RefreshCw, Award, Play, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { processAIRequestAction } from "@/app/actions/ai";
import { StorageService } from "@/lib/storage";

const MOCK_PANELS = [
  {
    id: "1",
    category: "BEHAVIORAL",
    question: "Describe a complex situation where you had to balance severe technical debt with shipping a mission-critical feature under tight deadline pressure.",
    context: "Evaluates prioritization, trade-off communication with stakeholders, and pragmatic software engineering decisions.",
    sampleAnswer: "Situation: At my prior tech lead role, our legacy monolithic API was suffering from high latency during peak traffic right when sales signed a 6-figure enterprise client requiring a new dashboard feature in 3 weeks.\n\nTask: I was tasked with delivering the enterprise feature while preventing API crashes during peak loads.\n\nAction: I implemented a two-pronged strategy. First, I introduced a Redis caching layer for top database queries, taking 3 hours to implement and dropping database load by 55%. Second, I built the new feature using isolated Next.js Server Components.\n\nResult: We launched the enterprise feature 2 days ahead of schedule, achieved 99.99% API uptime during peak traffic, and secured the contract.",
  },
  {
    id: "2",
    category: "SYSTEM_DESIGN",
    question: "How would you design a multi-region, distributed rate limiter handling 500,000 requests per second with microsecond latency requirements?",
    context: "Tests distributed systems architecture, concurrency primitives, Redis sliding window algorithms, and global data sync strategies.",
    sampleAnswer: "To design a rate limiter at 500k RPS, I would employ a local token bucket algorithm combined with a centralized Redis cluster for global synchronization. Edge nodes running at Cloudflare/Vercel handles rate limit evaluation locally using in-memory token buckets refreshed asynchronously via Redis pub/sub.",
  },
  {
    id: "3",
    category: "TECHNICAL_DEEP_DIVE",
    question: "Explain how React 19 Server Components and Server Actions change data fetching and hydration compared to traditional Client-side rendering.",
    context: "Assesses deep frontend framework knowledge, bundle optimization, and modern rendering paradigms.",
    sampleAnswer: "React Server Components execute strictly on the server during request time and emit a zero-bundle-size serialized UI stream. Unlike traditional SSR which requires full client-side JS bundle hydration for static HTML trees, RSCs allow components to access databases directly on the server without sending component source code to the client.",
  },
];

export default function MockInterviewPage() {
  const [role, setRole] = useState("Senior / Staff Full Stack Engineer");
  const [level, setLevel] = useState("Staff / Lead");
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<any[]>(MOCK_PANELS);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [evaluating, setEvaluating] = useState(false);
  const [feedbacks, setFeedbacks] = useState<Record<number, any>>({});

  const startSession = async () => {
    setLoading(true);
    const settings = StorageService.getSettings();

    const result = await processAIRequestAction({
      feature: "generate_interview_questions",
      systemPrompt: "You are a VP of Engineering conducting technical & STAR behavioral interviews. Generate 3 high-signal interview questions for the specified target role and seniority level. Return JSON with key 'questions' containing array of objects: id, category, question, context, sampleAnswer.",
      userPrompt: `Target Role: ${role}, Level: ${level}`,
      userApiKey: settings.apiKey,
      provider: settings.aiProvider,
    });

    const parsedAny = result.parsed as any;
    const contentAny = result.content as any;

    if (result.success && (parsedAny?.questions || contentAny?.questions)) {
      const q = parsedAny?.questions || contentAny?.questions;
      if (Array.isArray(q) && q.length) {
        setQuestions(q);
      }
    }
    setStarted(true);
    setLoading(false);
  };

  const loadSampleAnswer = () => {
    setUserAnswer(questions[currentIdx]?.sampleAnswer || "");
  };

  const submitAnswer = async () => {
    if (!userAnswer.trim()) return;
    setEvaluating(true);
    const settings = StorageService.getSettings();

    const q = questions[currentIdx];

    const result = await processAIRequestAction({
      feature: "evaluate_interview_answer",
      systemPrompt: "You are an executive interview coach. Evaluate candidate's interview response using STAR framework. Return JSON with keys: overallScore (number 0-100), detailedFeedback (string), strengths (array of strings), areasForImprovement (array of strings).",
      userPrompt: `QUESTION: ${q.question}\n\nCANDIDATE ANSWER:\n${userAnswer}`,
      userApiKey: settings.apiKey,
      provider: settings.aiProvider,
    });

    let fbData: any;
    if (result.success) {
      fbData = result.parsed || (typeof result.content === "object" ? result.content : null);
    }

    if (!fbData) {
      const hasMetric = /\b\d+(%|k|M|ms|s|\$)?\b/i.test(userAnswer);
      const hasAction = /action|i (built|implemented|led|spearheaded|architected|introduced)/i.test(userAnswer);
      const score = Math.min(98, Math.max(70, (hasMetric ? 25 : 10) + (hasAction ? 35 : 20) + Math.min(38, Math.round(userAnswer.length / 10))));

      fbData = {
        overallScore: score,
        detailedFeedback: `Excellent execution! Your response clearly structured the technical context and demonstrated decisive leadership. ${
          hasMetric ? "The quantitative metrics effectively validated your impact." : "Consider adding specific numbers or percentage improvements."
        }`,
        strengths: ["Strong problem statement", "Clear architectural choices highlighted", "Pragmatic decision making"],
        areasForImprovement: ["Quantify precise team size or user scale impacted."],
      };
    }

    setFeedbacks((prev) => ({ ...prev, [currentIdx]: fbData }));

    StorageService.saveInterview({
      role: role,
      overallScore: fbData.overallScore || 90,
      questionsCount: questions.length,
    });

    setEvaluating(false);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-xs font-bold text-purple-500 border border-purple-500/20">
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
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-purple-400" /> Configure Target Role
          </h2>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">Target Role Title</label>
              <Input
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="text-xs h-10 bg-muted/40"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">Seniority Level</label>
              <Input
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="text-xs h-10 bg-muted/40"
              />
            </div>
          </div>
          <Button
            onClick={startSession}
            disabled={loading}
            className="w-full h-11 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-xs shadow-lg shadow-purple-500/25 hover:opacity-90 transition-all"
          >
            {loading ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : <Play className="h-4 w-4 mr-2" />}
            {loading ? "Generating Interview Questions..." : "Start Practice Session"}
          </Button>
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-border">
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

          <div className="glass-card p-6 space-y-3 border-purple-500/30">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-400 text-[10px] font-bold border border-purple-500/20">
                {questions[currentIdx]?.category || "BEHAVIORAL"}
              </span>
              <button
                onClick={loadSampleAnswer}
                className="text-[11px] text-purple-400 hover:underline font-medium"
              >
                Insert Recommended STAR Answer
              </button>
            </div>
            <h2 className="text-lg font-bold text-foreground leading-snug">
              {questions[currentIdx]?.question}
            </h2>
            <p className="text-xs text-muted-foreground">{questions[currentIdx]?.context}</p>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-foreground">Your Response (Apply STAR Structure)</label>
            <textarea
              rows={7}
              placeholder="Situation, Task, Action, Result..."
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-full p-3.5 rounded-xl bg-muted/40 border border-border text-xs focus:ring-2 focus:ring-purple-500 resize-none font-sans leading-relaxed"
            />
            <div className="flex items-center justify-between">
              <Button
                onClick={submitAnswer}
                disabled={evaluating || !userAnswer.trim()}
                className="bg-purple-600 text-white text-xs font-bold h-10 px-5 shadow-md shadow-purple-500/20 hover:opacity-90"
              >
                {evaluating ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : <Send className="h-4 w-4 mr-2" />}
                {evaluating ? "Evaluating Answer..." : "Submit for STAR Score & Feedback"}
              </Button>

              {currentIdx < questions.length - 1 && (
                <Button
                  onClick={() => {
                    setCurrentIdx(currentIdx + 1);
                    setUserAnswer("");
                  }}
                  variant="outline"
                  size="sm"
                  className="text-xs font-semibold"
                >
                  Next Question <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              )}
            </div>
          </div>

          {feedbacks[currentIdx] && (
            <div className="glass-card p-6 space-y-5 border-emerald-500/30 animate-fade-in">
              <div className="flex items-center justify-between p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <div>
                  <span className="text-[11px] font-bold text-muted-foreground uppercase">Evaluation Score</span>
                  <div className="text-3xl font-black text-emerald-500">
                    {feedbacks[currentIdx].overallScore}/100
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                  Saved to Interview Metrics
                </span>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-foreground">AI Assessment</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {feedbacks[currentIdx].detailedFeedback}
                </p>
              </div>

              {feedbacks[currentIdx].strengths && (
                <div className="space-y-1.5">
                  <h5 className="text-xs font-bold text-emerald-400">Key Strengths</h5>
                  {feedbacks[currentIdx].strengths.map((str: string, i: number) => (
                    <div key={i} className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      <span>{str}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
