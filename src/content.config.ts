import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const sharedSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  slug: z.string(),
  kind: z.enum(["essays", "projects", "research", "signals"]),
  lang: z.string().default("zh-CN"),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  status: z.enum(["published", "sample", "archived"]).default("published"),
  readingMinutes: z.number().int().positive(),
  sourcePath: z.string(),
  cover: z.enum(["editorial", "console", "rooms"]).optional(),
  coverAlt: z.string().optional(),
  eyebrow: z.string().optional(),
  stage: z.string().optional(),
  role: z.string().optional(),
  outputs: z.array(z.string()).optional(),
  series: z.string().optional()
});

const makeCollection = (name: string) =>
  defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: `./.generated/content/${name}` }),
    schema: sharedSchema
  });

export const collections = {
  essays: makeCollection("essays"),
  projects: makeCollection("projects"),
  research: makeCollection("research"),
  signals: makeCollection("signals")
};
