import { defineCollection } from "astro:content";
import { file } from "astro/loaders";
import { z } from "astro/zod";
import { researchTopicIds } from "./data/research-topics";

const httpsUrl = z.url().refine((value) => new URL(value).protocol === "https:", {
  message: "URL must use HTTPS",
});

const localAssetPath = z.string().refine(
  (value) => value.startsWith("/") && !value.startsWith("//") && !value.includes(".."),
  { message: "Photo must be a local path inside the public directory" },
);

const members = defineCollection({
  loader: file("src/data/members.json"),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    group: z.enum(["lead", "researchers", "members", "students", "alumni"]),
    photo: localAssetPath.nullable().optional(),
    linkedin: httpsUrl.refine((value) => {
      const url = new URL(value);
      return ["linkedin.com", "www.linkedin.com"].includes(url.hostname) && url.pathname.startsWith("/in/") && url.pathname.length > 4 && !url.username && !url.password;
    }, { message: "Use a personal LinkedIn URL: https://www.linkedin.com/in/your-profile/" }).nullable().optional(),
    email: z.email().nullable().optional(),
    status: z.enum(["founder", "new", "current", "former"]),
    order: z.number().int().nonnegative(),
  }),
});

const publications = defineCollection({
  loader: file("src/data/publications.json"),
  schema: z.object({
    year: z.number().int(),
    title: z.string(),
    authors: z.string(),
    venue: z.string(),
    paper: httpsUrl.nullable().optional(),
    code: httpsUrl.nullable().optional(),
    topics: z.array(z.enum(researchTopicIds)).min(1),
  }),
});

const openings = defineCollection({
  loader: file("src/data/openings.json"),
  schema: z.object({
    title: z.string(),
    kind: z.string(),
    text: z.string(),
    requirements: z.array(z.string()).default([]),
    order: z.number().int().nonnegative(),
  }),
});

const news = defineCollection({
  loader: file("src/data/news.json"),
  schema: z.object({
    date: z.coerce.date(),
    title: z.string(),
    text: z.string(),
    category: z.enum(["lab", "world"]).default("lab"),
    source: z.object({ name: z.string(), url: httpsUrl }).optional(),
  }),
});

const posts = defineCollection({
  loader: file("src/data/posts.json"),
  schema: z.object({
    date: z.coerce.date(),
    title: z.string(),
    text: z.string(),
    url: httpsUrl.nullable().optional(),
  }),
});

export const collections = { members, publications, openings, news, posts };
