import { CONTENTFUL } from "@/config/contentful";
import client from "../contentful";

export interface ContactContent {
  title: string;
  content: string;
}

export async function getContactContent() {
    const entries = await client.getEntries({
      content_type: CONTENTFUL.contactApiKey,
      limit: 1,
    }) as any;

    const item = entries.items[0];
    const title = item.fields.title || "Untitled";
    const content = item.fields.content || "No content available.";

    return { title, content };
}
