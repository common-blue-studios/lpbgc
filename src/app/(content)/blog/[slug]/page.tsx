import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import client from "@/lib/contentful";
import { FiArrowLeft, FiCalendar, FiClock, FiUser } from "react-icons/fi";
import Markdown from "react-markdown";
import Link from "next/link";

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: string;
    author: string;
    reading_time: number;
    content: string;
  };
}

async function fetchPost(slug: string): Promise<Post | null> {
  const entries = await client.getEntries({
    content_type: "blogPost",
    "fields.slug": slug,
  });

  if (!entries.items.length) return null;

  const post = entries.items[0].fields as any;

  const calculateReadingTime = (content: any[] | string) => {
    if (content.length === 0) return 0;
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
      author: post.author || "Luana",
      reading_time: calculateReadingTime(post.content || []),
      content: post.content || "",
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = await fetchPost(params.slug);

  if (!post) {
    return (
      <div className="text-center mt-10 text-lg">
        <p>Post not found</p>
      </div>
    );
  }

  return (
    <section className="container mx-auto">
      <Link
        href="/blog"
        className="flex items-center text-gray-800 dark:text-white gap-2 hover:underline"
      >
        <FiArrowLeft className="text-lg" />
        <span>Go Back</span>
      </Link>
      <div className="h-[60vh]">
        <img
          src={post.data.banner}
          alt={post.data.title}
          className="w-full h-full object-cover"
        />
      </div>
      <article className="max-w-3xl mx-auto mt-12">
        <h1 className="text-4xl font-bold mb-6">{post.data.title}</h1>
        <div className="flex flex-col sm:flex-row gap-6 text-gray-600 mb-8">
          <time className="flex items-center gap-2 text-sm">
            <FiCalendar className="text-lg" />
            {post.first_publication_date}
          </time>
          <p className="flex items-center gap-2 text-sm">
            <FiUser className="text-lg" />
            {post.data.author}
          </p>
          <p className="flex items-center gap-2 text-sm">
            <FiClock className="text-lg" />
            {post.data.reading_time} min
          </p>
        </div>
        <div className="space-y-8">
          <Markdown>{post.data.content}</Markdown>
        </div>
      </article>
    </section>
  );
}
