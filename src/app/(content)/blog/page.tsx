import Link from "next/link";
import { FiCalendar, FiUser } from "react-icons/fi";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import client from "@/lib/contentful";
import Image from "next/image";

interface BlogPost {
  title: string;
  content: any;
  banner: string;
  first_publication_date: string;
  author: string;
  slug: string;
  subtitle?: string;
}

// Fetch data at the server level
async function fetchBlogPosts(): Promise<BlogPost[]> {
  const entries = await client.getEntries({
    content_type: "blogPost",
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
    author: "Luana",
    banner: item.fields.banner?.fields?.file?.url || "",
  }));
}

export default async function Blogs() {
  const posts = await fetchBlogPosts();

  return (
    <div className="container mx-auto max-w-2xl px-6">
      <div className="flex justify-center items-center flex-col ">
        <Image src="/blog.png" alt="Blog" width={300} height={300} />
      </div>
      <div className="posts">
        {posts.length ? (
          posts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug}>
              <div className="mt-12 transition-transform filter hover:brightness-95 hover:bg-neutral-50 cursor-pointer rounded border border-neutral-100 p-4">
                <h1 className="text-xl font-bold mb-2">{post.title}</h1>
                <p>{post.subtitle ?? post.title}</p>
                <div className="info flex gap-6 mt-6">
                  <time className="flex items-center gap-2 text-sm">
                    <FiCalendar className="text-lg" />
                    {post.first_publication_date}
                  </time>
                  <p className="flex items-center gap-2 text-sm">
                    <FiUser className="text-lg" />
                    {post.author}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No posts found</p>
        )}
      </div>
    </div>
  );
}
