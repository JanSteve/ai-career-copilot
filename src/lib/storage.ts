"use client";

// Client-side local persistence helper that syncs across page reloads

export interface SavedResume {
  id: string;
  title: string;
  content: string;
  atsScore?: number;
  updatedAt: string;
}

export interface SavedApplication {
  id: string;
  company: string;
  position: string;
  location: string;
  salary: string;
  status: "SAVED" | "APPLIED" | "PHONE_SCREEN" | "INTERVIEW" | "OFFER" | "REJECTED";
  appliedDate: string;
  notes: string;
}

export interface SavedInterview {
  id: string;
  role: string;
  date: string;
  overallScore: number;
  questionsCount: number;
}

export interface UserSettings {
  apiKey: string;
  aiProvider: "OPENAI" | "GEMINI" | "CLAUDE";
  targetRole: string;
  targetSalary: string;
}

const STORAGE_KEYS = {
  RESUMES: "acc_resumes_v1",
  APPLICATIONS: "acc_applications_v1",
  INTERVIEWS: "acc_interviews_v1",
  SETTINGS: "acc_user_settings_v1",
};

export const StorageService = {
  // Resumes
  getResumes(): SavedResume[] {
    if (typeof window === "undefined") return [];
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RESUMES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },
  saveResume(resume: Omit<SavedResume, "id" | "updatedAt"> & { id?: string }): SavedResume {
    const resumes = this.getResumes();
    const now = new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
    let updatedItem: SavedResume;

    if (resume.id) {
      const idx = resumes.findIndex((r) => r.id === resume.id);
      if (idx !== -1) {
        resumes[idx] = { ...resumes[idx], ...resume, updatedAt: now };
        updatedItem = resumes[idx];
      } else {
        updatedItem = { ...resume, id: Date.now().toString(), updatedAt: now };
        resumes.unshift(updatedItem);
      }
    } else {
      updatedItem = { ...resume, id: Date.now().toString(), updatedAt: now };
      resumes.unshift(updatedItem);
    }

    localStorage.setItem(STORAGE_KEYS.RESUMES, JSON.stringify(resumes));
    return updatedItem;
  },

  // Applications
  getApplications(): SavedApplication[] {
    if (typeof window === "undefined") return [];
    try {
      const data = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },
  saveApplication(app: Omit<SavedApplication, "id"> & { id?: string }): SavedApplication {
    const apps = this.getApplications();
    let updatedApp: SavedApplication;

    if (app.id) {
      const idx = apps.findIndex((a) => a.id === app.id);
      if (idx !== -1) {
        apps[idx] = { ...apps[idx], ...app };
        updatedApp = apps[idx];
      } else {
        updatedApp = { ...app, id: Date.now().toString() };
        apps.unshift(updatedApp);
      }
    } else {
      updatedApp = { ...app, id: Date.now().toString() };
      apps.unshift(updatedApp);
    }

    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));
    return updatedApp;
  },
  deleteApplication(id: string) {
    const apps = this.getApplications().filter((a) => a.id !== id);
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));
  },

  // Interviews
  getInterviews(): SavedInterview[] {
    if (typeof window === "undefined") return [];
    try {
      const data = localStorage.getItem(STORAGE_KEYS.INTERVIEWS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },
  saveInterview(interview: Omit<SavedInterview, "id" | "date">): SavedInterview {
    const interviews = this.getInterviews();
    const newInterview: SavedInterview = {
      ...interview,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
    };
    interviews.unshift(newInterview);
    localStorage.setItem(STORAGE_KEYS.INTERVIEWS, JSON.stringify(interviews));
    return newInterview;
  },

  // Settings
  getSettings(): UserSettings {
    if (typeof window === "undefined")
      return { apiKey: "", aiProvider: "OPENAI", targetRole: "Software Architect", targetSalary: "$180,000" };
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data
        ? JSON.parse(data)
        : { apiKey: "", aiProvider: "OPENAI", targetRole: "Software Architect", targetSalary: "$180,000" };
    } catch {
      return { apiKey: "", aiProvider: "OPENAI", targetRole: "Software Architect", targetSalary: "$180,000" };
    }
  },
  saveSettings(settings: Partial<UserSettings>): UserSettings {
    const current = this.getSettings();
    const updated = { ...current, ...settings };
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
    return updated;
  },
};
