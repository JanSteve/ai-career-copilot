"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp, signIn } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signUp.email({
        email,
        password,
        name,
      });

      if (res.error) {
        setError(res.error.message || "Failed to create account.");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignup = async (provider: "google" | "github" | "linkedin") => {
    try {
      await signIn.social({
        provider,
        callbackURL: "/dashboard",
      });
    } catch (err) {
      setError(`Failed to sign up with ${provider}.`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Create account</h1>
        <p className="text-xs text-muted-foreground">Start optimizing your career with AI intelligence</p>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-xs text-destructive">
          {error}
        </div>
      )}

      {/* Social OAuth */}
      <div className="grid grid-cols-3 gap-3">
        <Button
          variant="outline"
          onClick={() => handleSocialSignup("google")}
          className="w-full flex items-center justify-center gap-2 h-10 border-border hover:bg-muted text-xs font-semibold"
        >
          Google
        </Button>
        <Button
          variant="outline"
          onClick={() => handleSocialSignup("github")}
          className="w-full flex items-center justify-center gap-2 h-10 border-border hover:bg-muted text-xs font-semibold"
        >
          GitHub
        </Button>
        <Button
          variant="outline"
          onClick={() => handleSocialSignup("linkedin")}
          className="w-full flex items-center justify-center gap-2 h-10 border-border hover:bg-muted text-xs font-semibold text-blue-500"
        >
          LinkedIn
        </Button>
      </div>

      <div className="relative flex items-center justify-center">
        <span className="absolute px-2 bg-background text-[11px] text-muted-foreground uppercase tracking-wider">
          Or sign up with email
        </span>
        <hr className="w-full border-border/60" />
      </div>

      <form onSubmit={handleSignup} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-foreground">Full name</label>
          <Input
            type="text"
            placeholder="Jan Steve Daniel"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            required
            className="h-10 bg-muted/40 border-border text-sm"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-foreground">Work or personal email</label>
          <Input
            type="email"
            placeholder="you@domain.com"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            required
            className="h-10 bg-muted/40 border-border text-sm"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-foreground">Password (min 8 chars)</label>
          <Input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            required
            minLength={8}
            className="h-10 bg-muted/40 border-border text-sm"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-10 bg-gradient-to-r from-primary to-purple-600 text-white font-semibold text-xs shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Free Account"}
        </Button>
      </form>

      <p className="text-xs text-center text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="text-primary font-semibold hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
