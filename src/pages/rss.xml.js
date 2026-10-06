import rss from "@astrojs/rss";
import { getAllEntries, entryHref } from "../lib/content";
import { site } from "../data/site";

export async function GET(context) {
  const entries = await getAllEntries();
  return rss({
    title: site.name,
    description: site.description,
    site: context.site,
    customData: `<language>zh-CN</language>`,
    items: entries.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.date,
      link: entryHref(entry),
      categories: entry.data.tags
    }))
  });
}
