"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Filter, Briefcase, Calendar, DollarSign, Trash2, CheckCircle2, Building2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StorageService, SavedApplication } from "@/lib/storage";

type StatusType = "SAVED" | "APPLIED" | "PHONE_SCREEN" | "INTERVIEW" | "OFFER" | "REJECTED";

export default function ApplicationTrackerPage() {
  const [applications, setApplications] = useState<SavedApplication[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [showAddForm, setShowAddForm] = useState(false);

  const [newCompany, setNewCompany] = useState("");
  const [newPosition, setNewPosition] = useState("");
  const [newLocation, setNewLocation] = useState("Remote");
  const [newSalary, setNewSalary] = useState("$160,000");
  const [newNotes, setNewNotes] = useState("");

  useEffect(() => {
    const loaded = StorageService.getApplications();
    if (loaded.length === 0) {
      // Seed default applications
      const defaults: SavedApplication[] = [
        {
          id: "1",
          company: "Stripe",
          position: "Staff Frontend Engineer",
          location: "Remote / SF",
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
      defaults.forEach((app) => StorageService.saveApplication(app));
      setApplications(defaults);
    } else {
      setApplications(loaded);
    }
  }, []);

  const handleAddApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany || !newPosition) return;

    const saved = StorageService.saveApplication({
      company: newCompany,
      position: newPosition,
      location: newLocation,
      salary: newSalary,
      status: "APPLIED",
      appliedDate: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      notes: newNotes || "Added to tracker.",
    });

    setApplications([saved, ...applications]);
    setNewCompany("");
    setNewPosition("");
    setNewNotes("");
    setShowAddForm(false);
  };

  const updateStatus = (id: string, newStatus: StatusType) => {
    const target = applications.find((a) => a.id === id);
    if (target) {
      const updated = StorageService.saveApplication({ ...target, status: newStatus });
      setApplications(applications.map((app) => (app.id === id ? updated : app)));
    }
  };

  const deleteApplication = (id: string) => {
    StorageService.deleteApplication(id);
    setApplications(applications.filter((app) => app.id !== id));
  };

  const getStatusBadge = (status: StatusType) => {
    switch (status) {
      case "OFFER":
        return <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">Offer Received 🎉</span>;
      case "INTERVIEW":
        return <span className="px-2.5 py-1 rounded-full bg-purple-500/15 text-purple-400 text-[10px] font-bold border border-purple-500/20">Interviewing</span>;
      case "PHONE_SCREEN":
        return <span className="px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-400 text-[10px] font-bold border border-amber-500/20">Phone Screen</span>;
      case "APPLIED":
        return <span className="px-2.5 py-1 rounded-full bg-blue-500/15 text-blue-400 text-[10px] font-bold border border-blue-500/20">Applied</span>;
      case "REJECTED":
        return <span className="px-2.5 py-1 rounded-full bg-rose-500/15 text-rose-400 text-[10px] font-bold border border-rose-500/20">Archived</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full bg-muted text-muted-foreground text-[10px] font-bold">Saved</span>;
    }
  };

  const filtered = applications.filter((app) => {
    const matchesSearch =
      app.company.toLowerCase().includes(search.toLowerCase()) ||
      app.position.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterStatus === "ALL" || app.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
            Job Application Tracker
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground">
            Track pipeline status, interview rounds, and offers across all your active target roles.
          </p>
        </div>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-primary text-white text-xs font-bold h-10 px-4 shadow-lg shadow-primary/20 hover:opacity-90 transition-all"
        >
          <Plus className="h-4 w-4 mr-1.5" /> {showAddForm ? "Cancel" : "Add Job Application"}
        </Button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddApplication} className="glass-card p-6 border-primary/30 space-y-4 animate-fade-in">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5">
            <Building2 className="h-4 w-4 text-primary" /> Track New Application
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              placeholder="Company Name (e.g. Google, Stripe)"
              value={newCompany}
              onChange={(e) => setNewCompany(e.target.value)}
              required
              className="text-xs h-10 bg-muted/40"
            />
            <Input
              placeholder="Position Title (e.g. Senior Frontend Engineer)"
              value={newPosition}
              onChange={(e) => setNewPosition(e.target.value)}
              required
              className="text-xs h-10 bg-muted/40"
            />
            <Input
              placeholder="Location (e.g. Remote, San Francisco)"
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              className="text-xs h-10 bg-muted/40"
            />
            <Input
              placeholder="Target Salary Range"
              value={newSalary}
              onChange={(e) => setNewSalary(e.target.value)}
              className="text-xs h-10 bg-muted/40"
            />
          </div>
          <textarea
            rows={2}
            placeholder="Notes or recruiter contact details..."
            value={newNotes}
            onChange={(e) => setNewNotes(e.target.value)}
            className="w-full p-3 rounded-xl bg-muted/40 border border-border text-xs resize-none"
          />
          <Button type="submit" size="sm" className="bg-primary text-white text-xs font-bold px-5">
            Save Application
          </Button>
        </form>
      )}

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {["ALL", "APPLIED", "PHONE_SCREEN", "INTERVIEW", "OFFER"].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                filterStatus === st
                  ? "bg-primary text-white shadow-xs"
                  : "bg-muted/40 text-muted-foreground hover:text-foreground"
              }`}
            >
              {st === "ALL" ? "All Applications" : st.replace("_", " ")}
            </button>
          ))}
        </div>

        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Search company or title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 text-xs h-9 bg-muted/40"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filtered.map((app) => (
          <div
            key={app.id}
            className="glass-card p-5 space-y-3 card-hover border-border flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <h3 className="text-sm font-bold text-foreground">{app.position}</h3>
                <span className="text-xs text-muted-foreground">
                  at <strong className="text-foreground">{app.company}</strong>
                </span>
                {getStatusBadge(app.status)}
              </div>
              <div className="flex flex-wrap items-center gap-4 text-[11px] text-muted-foreground">
                <span className="flex items-center"><MapPin className="h-3 w-3 mr-1 text-primary" /> {app.location}</span>
                <span className="flex items-center"><DollarSign className="h-3 w-3 mr-1 text-emerald-500" /> {app.salary}</span>
                <span className="flex items-center"><Calendar className="h-3 w-3 mr-1 text-purple-400" /> Applied {app.appliedDate}</span>
              </div>
              <p className="text-xs text-muted-foreground/90 pt-1 italic">{app.notes}</p>
            </div>

            <div className="flex items-center gap-2 self-end md:self-center">
              <select
                value={app.status}
                onChange={(e) => updateStatus(app.id, e.target.value as StatusType)}
                className="h-8 px-2.5 rounded-lg bg-muted/60 border border-border text-xs font-semibold text-foreground focus:ring-1 focus:ring-primary"
              >
                <option value="SAVED">Saved</option>
                <option value="APPLIED">Applied</option>
                <option value="PHONE_SCREEN">Phone Screen</option>
                <option value="INTERVIEW">Interviewing</option>
                <option value="OFFER">Offer Received</option>
                <option value="REJECTED">Archived</option>
              </select>

              <button
                onClick={() => deleteApplication(app.id)}
                className="p-2 rounded-lg text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                title="Delete application"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
