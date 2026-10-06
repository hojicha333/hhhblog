import { getCollection, type CollectionEntry } from "astro:content";
import { collectionMeta, type CollectionName } from "../data/site";

export type SiteEntry =
  | CollectionEntry<"essays">
  | CollectionEntry<"projects">
  | CollectionEntry<"research">
  | CollectionEntry<"signals">;

export async function getAllEntries(options: { includeArchived?: boolean } = {}) {
  const [essays, projects, research, signals] = await Promise.all([
    getCollection("essays"),
    getCollection("projects"),
    getCollection("research"),
    getCollection("signals")
  ]);
  const entries: SiteEntry[] = [...essays, ...projects, ...research, ...signals];
  return entries
    .filter((entry) => options.includeArchived || entry.data.status !== "archived")
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function entryHref(entry: SiteEntry) {
  return `/${entry.collection}/${entry.data.slug}/`;
}

export function formatDate(date: Date, locale = "zh-CN") {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(date);
}

export function formatIssueDate(date: Date) {
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit"
  })
    .format(date)
    .replace("-", ".");
}

export function collectionInfo(entry: SiteEntry) {
  return collectionMeta[entry.collection as CollectionName];
}

export function readingLabel(minutes: number) {
  return `${minutes} 分钟`;
}
