"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  Briefcase,
  Bot,
  Compass,
  TrendingUp,
  BarChart3,
  Settings,
  Sparkles,
  Zap,
  CheckSquare,
  Award,
  BookOpen,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  Share2,
  Code,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  href: string;
  icon: any;
  badge?: string;
}

interface NavGroup {
  category: string;
  items: NavItem[];
}

const navigationItems: NavGroup[] = [
  {
    category: "Overview",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
    ],
  },
  {
    category: "Resume & Applications",
    items: [
      { name: "Resume Review", href: "/resume/review", icon: FileText, badge: "AI" },
      { name: "ATS Checker", href: "/resume/ats", icon: CheckSquare },
      { name: "Resume Builder", href: "/resume/builder", icon: Sparkles },
      { name: "Cover Letter", href: "/resume/cover-letter", icon: Zap },
      { name: "Application Tracker", href: "/jobs/applications", icon: Briefcase },
    ],
  },
  {
    category: "AI Interview Coach",
    items: [
      { name: "Mock Interview", href: "/interview/mock", icon: Bot, badge: "Hot" },
      { name: "Behavioral Prep", href: "/interview/behavioral", icon: UserCheck },
      { name: "Technical Prep", href: "/interview/technical", icon: Award },
    ],
  },
  {
    category: "Career Acceleration",
    items: [
      { name: "Career Roadmap", href: "/career/roadmap", icon: Compass },
      { name: "Skill Gap Analyzer", href: "/career/skills", icon: TrendingUp },
      { name: "Salary Predictor", href: "/career/salary", icon: DollarSign },
      { name: "LinkedIn Optimizer", href: "/career/linkedin", icon: Share2 },
      { name: "GitHub & Portfolio", href: "/career/github", icon: Code },
      { name: "Learning Paths", href: "/career/learning", icon: BookOpen },
    ],
  },
  {
    category: "Account",
    items: [
      { name: "Analytics", href: "/analytics", icon: BarChart3 },
      { name: "Settings", href: "/settings", icon: Settings },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "relative flex flex-col border-r border-border bg-card/60 backdrop-blur-xl transition-all duration-300 z-30",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-border">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-primary via-purple-600 to-pink-500 text-white font-bold shadow-md shadow-primary/25">
            <Sparkles className="h-5 w-5" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-base leading-none gradient-text">
                AI Career
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                Copilot Pro
              </span>
            </div>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          aria-label="Toggle sidebar"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 no-scrollbar">
        {navigationItems.map((group, i) => (
          <div key={i} className="space-y-1">
            {!collapsed && (
              <h3 className="px-3 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                {group.category}
              </h3>
            )}
            {group.items.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative",
                    isActive
                      ? "bg-primary/10 text-primary font-semibold shadow-xs"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                  title={collapsed ? item.name : undefined}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110",
                      isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                    )}
                  />
                  {!collapsed && <span className="truncate">{item.name}</span>}
                  {!collapsed && item.badge && (
                    <span className="ml-auto px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-primary/20 text-primary border border-primary/30">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Pro Upgrade Box */}
      {!collapsed && (
        <div className="p-4 m-3 rounded-xl bg-gradient-to-br from-primary/15 via-purple-500/10 to-pink-500/10 border border-primary/20 space-y-2">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-xs font-bold text-foreground">Pro Plan Unlocked</span>
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Unlimited AI analyses, mock interviews, and career roadmap active.
          </p>
        </div>
      )}
    </aside>
  );
}
