import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://aicareercopilot.com";

  const seoSlugs = [
    "ats-checker",
    "resume-review",
    "linkedin-optimizer",
    "cover-letter-generator",
    "interview-ai",
    "resume-score",
    "portfolio-review",
    "job-match",
    "career-roadmap",
    "github-review",
    "salary-predictor",
  ];

  const seoUrls = seoSlugs.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    ...seoUrls,
  ];
}
