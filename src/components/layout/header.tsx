"use client";

import { Bell, Search, User, LogOut, Settings, CreditCard, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-border bg-background/80 backdrop-blur-xl px-6">
      {/* Search Bar */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search AI tools, resumes, applications..."
            className="w-full pl-9 bg-muted/50 border-border/60 focus-visible:ring-primary h-9 text-sm rounded-lg"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Credits Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary">
          <Sparkles className="h-3.5 w-3.5 fill-primary" />
          <span>Unlimited AI Credits</span>
        </div>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl bg-card border border-border shadow-2xl p-4 z-50 animate-fade-up">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <span className="font-semibold text-sm">Notifications</span>
                <span className="text-xs text-primary font-medium cursor-pointer">Mark all read</span>
              </div>
              <div className="py-3 space-y-3">
                <div className="text-xs space-y-1">
                  <p className="font-medium text-foreground">ATS Resume Analysis Complete</p>
                  <p className="text-muted-foreground">Your resume score increased to 92/100!</p>
                  <span className="text-[10px] text-muted-foreground/60">5 mins ago</span>
                </div>
                <div className="text-xs space-y-1 pt-2 border-t border-border/50">
                  <p className="font-medium text-foreground">Weekly Interview Coach Report</p>
                  <p className="text-muted-foreground">You completed 3 behavioral mock sessions this week.</p>
                  <span className="text-[10px] text-muted-foreground/60">2 hours ago</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-primary/40 transition-all"
          >
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-pink-500 flex items-center justify-center text-white font-bold text-xs shadow-md">
              JD
            </div>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl bg-card border border-border shadow-2xl p-2 z-50 animate-fade-up">
              <div className="px-3 py-2 border-b border-border">
                <p className="text-sm font-semibold text-foreground">Jan Steve Daniel</p>
                <p className="text-xs text-muted-foreground truncate">user@aicareercopilot.com</p>
              </div>
              <div className="py-1">
                <Link
                  href="/settings"
                  className="flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <User className="h-3.5 w-3.5" /> Profile Settings
                </Link>
                <Link
                  href="/settings/billing"
                  className="flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <CreditCard className="h-3.5 w-3.5" /> Billing & Subscription
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <Settings className="h-3.5 w-3.5" /> Preferences
                </Link>
              </div>
              <div className="pt-1 border-t border-border">
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="h-3.5 w-3.5" /> Sign Out
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
