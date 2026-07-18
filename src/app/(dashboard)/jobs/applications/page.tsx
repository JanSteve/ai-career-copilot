"use client";

import { useState } from "react";
import { Plus, Search, Filter, MoreVertical, Briefcase, ExternalLink, Calendar, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialApplications = [
  {
    id: "1",
    company: "Stripe",
    position: "Staff Frontend Engineer",
    location: "Remote",
    salary: "$180,000 - $220,000",
    status: "PHONE_SCREEN",
    appliedDate: "Jul 12, 2026",
    notes: "Phone screen scheduled with engineering manager.",
  },
  {
    id: "2",
    company: "Vercel",
    position: "Senior Fullstack Architect",
    location: "San Francisco, CA",
    salary: "$195,000",
    status: "INTERVIEW",
    appliedDate: "Jul 08, 2026",
    notes: "System design round coming up this Thursday.",
  },
  {
    id: "3",
    company: "Linear",
    position: "Principal Product Engineer",
    location: "Remote",
    salary: "$190,000",
    status: "OFFER",
    appliedDate: "Jun 28, 2026",
    notes: "Received formal offer letter. Reviewing equity package.",
  },
];

export default function ApplicationTrackerPage() {
  const [applications, setApplications] = useState(initialApplications);
  const [search, setSearch] = useState("");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "OFFER":
        return <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold">Offer Received</span>;
      case "INTERVIEW":
        return <span className="px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-500 text-[10px] font-bold">Interviewing</span>;
      case "PHONE_SCREEN":
        return <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-500 text-[10px] font-bold">Phone Screen</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-bold">Applied</span>;
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
            Job Application Tracker
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground">
            Track pipeline status, interview rounds, and offers across all your active target roles.
          </p>
        </div>
        <Button className="bg-primary text-white text-xs font-semibold h-10 px-4 shadow-lg shadow-primary/25">
          <Plus className="h-4 w-4 mr-1.5" /> Add Job Application
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Filter by company or title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 text-xs h-9 bg-muted/40"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {applications
          .filter(
            (app) =>
              app.company.toLowerCase().includes(search.toLowerCase()) ||
              app.position.toLowerCase().includes(search.toLowerCase())
          )
          .map((app) => (
            <div
              key={app.id}
              className="glass-card p-5 space-y-3 card-hover border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-sm font-bold text-foreground">{app.position}</h3>
                  <span className="text-xs text-muted-foreground">at <strong className="text-foreground">{app.company}</strong></span>
                  {getStatusBadge(app.status)}
                </div>
                <div className="flex items-center gap-4 text-[11px] text-muted-foreground pt-1">
                  <span className="flex items-center"><Briefcase className="h-3 w-3 mr-1" /> {app.location}</span>
                  <span className="flex items-center"><DollarSign className="h-3 w-3 mr-1" /> {app.salary}</span>
                  <span className="flex items-center"><Calendar className="h-3 w-3 mr-1" /> Applied {app.appliedDate}</span>
                </div>
                <p className="text-xs text-muted-foreground/90 pt-1 italic">{app.notes}</p>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <Button size="sm" variant="outline" className="text-xs h-8">
                  Update Status
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
