import { FiCalendar, FiClock, FiUser } from "react-icons/fi";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from "@contentful/rich-text-types";
import Image from "next/image";
import { Metadata, ResolvingMetadata } from "next";
import { fetchPost } from "@/lib/api/blog";
import { SEO } from "@/config/seo";

export async function generateMetadata(
  { params }: any,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const {slug} = await params;

  if (!slug) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  const post = await fetchPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  const previousImages = (await parent)?.openGraph?.images || [];

  return {
    title: post.data.title,
    description: post.data.subtitle ?? post.data.title,
    openGraph: {
      title: post.data.title,
      description: post.data.subtitle ?? post.data.title,
      url: `${SEO.url}/blog/${slug}`,
      images: [post.data.banner, ...previousImages],
    },
    twitter: {
      card: "summary_large_image",
      title: post.data.title,
      description: post.data.subtitle ?? post.data.title,
      images: [post.data.banner],
    },
  };
}

export default async function BlogPost({ params }: any) {
  const {slug} = await params;
  const post = await fetchPost(slug);

  if (!post) {
    return (
      <div className="text-center mt-10 text-lg">
        <p>Post not found</p>
      </div>
    );
  }

  return (
    <section className="container mx-auto">
      {/* Banner Image */}
      <div className="h-[60vh]">
        <img
          src={post.data.banner}
          alt={post.data.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Blog Content */}
      <article className="max-w-3xl mx-auto mt-12">
        <h1 className="text-4xl font-bold mb-6">{post.data.title}</h1>
        <div className="flex flex-col sm:flex-row gap-6 text-gray-600 mb-8">
          <time className="place-items-center justify-items-center gap-2 text-sm flex items-center">
            <FiCalendar className="text-lg" />
            {post.first_publication_date}
          </time>
          <p className="place-items-center justify-items-center gap-2 text-sm flex items-center">
            <FiUser className="text-lg" />
            {post.data.author}
          </p>
          <p className="place-items-center justify-items-center gap-2 text-sm flex items-center">
            <FiClock className="text-lg" />
            {post.data.reading_time} min
          </p>
        </div>

        {/* Render Rich Text Content */}
        <div className="space-y-8 py-8 pb-16">
          {documentToReactComponents(post.data.post as any, {
            renderNode: {
              [BLOCKS.EMBEDDED_ASSET]: (node) => (
                <Image
                  src={`https:${node.data.target.fields.file.url}`}
                  height={node.data.target.fields.file.details.image.height}
                  width={node.data.target.fields.file.details.image.width}
                  alt={node.data.target.fields.title}
                />
              ),
            },
          })}
        </div>
      </article>
    </section>
  );
}
