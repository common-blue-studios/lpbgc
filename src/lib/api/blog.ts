import { PRESENTATION } from "@/config/presentation";
import client from "../contentful";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CONTENTFUL } from "@/config/contentful";

export interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: string;
    author: string;
    reading_time: number;
    post: string;
  };
}

export interface BlogPost {
  title: string;
  content: any;
  banner: string;
  first_publication_date: string;
  author: string;
  slug: string;
  subtitle?: string;
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const entries = await client.getEntries({
    content_type: CONTENTFUL.blogApiKey,
  });
  return entries.items.map((item: any) => ({
    ...item.fields,
    slug: item.fields.slug,
    first_publication_date: format(
      new Date(item.sys.createdAt),
      "dd LLL yyyy",
      {
        locale: ptBR,
      }
    ),
    author: PRESENTATION.blog.author,
    banner: item.fields.banner?.fields?.file?.url || "",
  }));
}

export async function fetchPost(slug: string): Promise<Post | null> {
  const entries = await client.getEntries({
    content_type: CONTENTFUL.blogApiKey,
    "fields.slug": slug,
  });

  if (!entries.items.length) return null;

  const post = entries.items[0].fields as any;

  const calculateReadingTime = (content: any[] | string) => {
    const wordsPerMinute = 200;
    if (typeof content === "string") {
      const words = content.split(" ").length;
      return Math.ceil(words / wordsPerMinute);
    }
    const totalWords = content.reduce((acc, item) => {
      if (item.nodeType === "paragraph") {
        return (
          acc +
          item.content.reduce((acc: any, item: any) => {
            return acc + item.value.split(" ").length;
          }, 0)
        );
      }
      return acc;
    }, 0);
    return Math.ceil(totalWords / wordsPerMinute);
  };

  return {
    first_publication_date: format(
      new Date(entries.items[0].sys.createdAt),
      "dd LLL yyyy",
      {
        locale: ptBR,
      }
    ),
    data: {
      title: post.title,
      banner: post.banner?.fields?.file?.url || "",
      author: post.author || "",
      reading_time: calculateReadingTime(post.content || []),
      post: post.post || "",
    },
  };
}