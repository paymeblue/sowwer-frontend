import { moments } from "@lib/momentsContent";
import { SITE_URL } from "@lib/siteMeta";
import { MetadataRoute } from "next";

const PROGRAMS = [
  "widow-care",
  "dad-project",
  "mission-care",
  "partnerships",
] as const;

const DONATIONS = [
  "widow-care",
  "dad-project",
  "mission-care",
  "general-giving",
] as const;

const STATIC_PAGES: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/about-us", priority: 0.8, changeFrequency: "monthly" },
  { path: "/contact-us", priority: 0.6, changeFrequency: "yearly" },
  { path: "/newsletters", priority: 0.7, changeFrequency: "monthly" },
  { path: "/registry/join", priority: 0.6, changeFrequency: "yearly" },
  { path: "/ministries", priority: 0.6, changeFrequency: "weekly" },
  { path: "/projects", priority: 0.6, changeFrequency: "weekly" },
  { path: "/testimonies", priority: 0.6, changeFrequency: "weekly" },
  { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms-of-use", priority: 0.2, changeFrequency: "yearly" },
  { path: "/acceptable-use-policy", priority: 0.2, changeFrequency: "yearly" },
];

const sitemap = (): MetadataRoute.Sitemap => {
  const now = new Date();

  return [
    ...STATIC_PAGES.map((page) => ({
      url: `${SITE_URL}${page.path}`,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...PROGRAMS.map((slug) => ({
      url: `${SITE_URL}/programs/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...DONATIONS.map((slug) => ({
      url: `${SITE_URL}/donate/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...moments.map((moment) => ({
      url: `${SITE_URL}/moments/${moment.slug}`,
      lastModified: new Date(moment.dateISO),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
};

export default sitemap;
