"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, FileText, Bot, Compass, User } from "lucide-react";
import { cn } from "@/lib/utils";

const mobileItems = [
  { name: "Home", href: "/dashboard", icon: BarChart3 },
  { name: "Resume", href: "/resume/review", icon: FileText },
  { name: "Interview", href: "/interview/mock", icon: Bot },
  { name: "Roadmap", href: "/career/roadmap", icon: Compass },
  { name: "Profile", href: "/settings", icon: User },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/90 backdrop-blur-xl px-4 py-2">
      <div className="flex items-center justify-around">
        {mobileItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-lg text-xs font-medium transition-colors",
                isActive ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
