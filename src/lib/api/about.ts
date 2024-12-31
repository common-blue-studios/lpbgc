import { CONTENTFUL } from "@/config/contentful";
import client from "../contentful";

export interface AboutContent {
  banner: string; 
  title: string;
  content: string;
}

export async function getAboutContent(): Promise<AboutContent | null> {
    const entries = await client.getEntries({
      content_type: CONTENTFUL.aboutApiKey, 
      limit: 1,
    }) as any;

    if (!entries.items.length) {
      console.error("No entries found for the 'about' content type.");
      return null;
    }

    const item = entries.items[0];
    const banner = item.fields.banner?.fields?.file?.url
      ? `https:${item.fields.banner.fields.file.url}`
      : "";
    const title = item.fields.title || "Untitled";
    const content = item.fields.content || "No content available.";

    return { banner, title, content };
}
