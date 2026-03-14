import React from "react";
import { getBlogPost, getBlogPosts, extractHeadings } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import ScrollProgress from "@/components/ui/scroll-progress";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarDays, Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import RevealAnimation from "@/components/reveal-animations";
import PageTransition from "@/components/page-transition";
import TableOfContents from "@/components/table-of-contents";
import { CodeBlock } from "@/components/ui/code-block";
import Breadcrumb from "@/components/ui/breadcrumb";
import { config } from "@/data/config";

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);
  const ogImage = post.metadata.image
    ? `${config.site}${post.metadata.image}`
    : config.ogImg;

  return {
    title: `${post.metadata.title} | Portfolio`,
    description: post.metadata.summary,
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.summary,
      type: "article",
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metadata.title,
      description: post.metadata.summary,
      images: [ogImage],
    },
    alternates: {
      canonical: `${config.site}/blogs/${params.slug}`,
    },
  };
}

function getHeadingId(children: React.ReactNode): string {
  const text = typeof children === "string"
    ? children
    : Array.isArray(children)
      ? children.map((c) => (typeof c === "string" ? c : "")).join("")
      : "";
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

const components = {
  h1: (props: React.ComponentPropsWithoutRef<"h1">) => (
    <h1 className="text-3xl md:text-5xl font-bold mt-12 mb-6 text-zinc-100" {...props} />
  ),
  h2: ({ children, ...props }: React.ComponentPropsWithoutRef<"h2">) => (
    <h2 id={getHeadingId(children)} className="text-2xl md:text-3xl font-semibold mt-10 mb-4 text-zinc-200 scroll-mt-24" {...props}>{children}</h2>
  ),
  h3: ({ children, ...props }: React.ComponentPropsWithoutRef<"h3">) => (
    <h3 id={getHeadingId(children)} className="text-xl md:text-2xl font-semibold mt-8 mb-3 text-zinc-300 scroll-mt-24" {...props}>{children}</h3>
  ),
  p: (props: React.ComponentPropsWithoutRef<"p">) => (
    <p className="text-zinc-400 leading-relaxed mb-6 text-lg" {...props} />
  ),
  ul: (props: React.ComponentPropsWithoutRef<"ul">) => (
    <ul className="list-disc list-inside mb-6 text-zinc-400 space-y-2" {...props} />
  ),
  ol: (props: React.ComponentPropsWithoutRef<"ol">) => (
    <ol className="list-decimal list-inside mb-6 text-zinc-400 space-y-2" {...props} />
  ),
  li: (props: React.ComponentPropsWithoutRef<"li">) => <li className="ml-4" {...props} />,
  blockquote: (props: React.ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="border-l-4 border-purple-500 pl-4 italic text-zinc-400 my-6 bg-zinc-900/50 py-2 pr-4 rounded-r"
      {...props}
    />
  ),
  code: ({ className, ...props }: React.ComponentPropsWithoutRef<"code">) => {
    // Inline code (not inside a pre/CodeBlock) gets simple styling
    const isInline = !className?.startsWith("language-");
    if (isInline) {
      return <code className="bg-zinc-900 text-purple-300 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />;
    }
    // Code inside pre blocks keeps its className for language detection
    return <code className={`${className || ""} text-sm font-mono`} {...props} />;
  },
  pre: (props: React.ComponentPropsWithoutRef<"pre">) => (
    <CodeBlock {...props} />
  ),
  a: (props: React.ComponentPropsWithoutRef<"a">) => (
    <a className="text-purple-400 hover:text-purple-300 underline underline-offset-4 transition-colors" {...props} />
  ),
};

function getRelatedPosts(
  currentSlug: string,
  currentTags: string[] | undefined,
  allPosts: { metadata: { title: string; publishedAt: string; summary: string; image?: string; author?: string; tags?: string[]; readingTime: string }; slug: string; content: string }[],
  limit = 3
) {
  const otherPosts = allPosts.filter((p) => p.slug !== currentSlug);
  if (!currentTags || currentTags.length === 0) {
    return otherPosts.slice(0, limit);
  }

  const scored = otherPosts.map((p) => {
    const sharedTags = (p.metadata.tags || []).filter((t) => currentTags.includes(t));
    return { post: p, score: sharedTags.length };
  });

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return new Date(b.post.metadata.publishedAt).getTime() - new Date(a.post.metadata.publishedAt).getTime();
  });

  return scored.slice(0, limit).map((s) => s.post);
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);
  const headings = extractHeadings(post.content);
  const allPosts = getBlogPosts().sort((a, b) =>
    new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt) ? -1 : 1
  );
  const currentIndex = allPosts.findIndex((p) => p.slug === params.slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const relatedPosts = getRelatedPosts(params.slug, post.metadata.tags, allPosts);

  return (
    <PageTransition>
    <div className="min-h-screen relative font-sans">
      <ScrollProgress className="bg-gradient-to-r from-purple-500 to-pink-500" />

      <div className="container mx-auto px-4 py-24 max-w-3xl">
        <RevealAnimation>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blogs" },
              { label: post.metadata.title, href: `/blogs/${params.slug}` },
            ]}
          />
        </RevealAnimation>

        <RevealAnimation delay={0.1}>
          <div className="mb-8">
            <div className="flex gap-2 mb-4 flex-wrap">
              {post.metadata.tags?.map((tag) => (
                <Badge key={tag} variant="outline" className="border-purple-500/30 text-purple-400">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">
              {post.metadata.title}
            </h1>
            <div className="flex items-center gap-6 text-zinc-500 text-sm border-b border-zinc-800 pb-8">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.metadata.author}
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4" />
                {post.metadata.publishedAt}
              </div>
              <span className="font-mono text-xs text-zinc-600 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.metadata.readingTime}
              </span>
            </div>
          </div>
        </RevealAnimation>

        <RevealAnimation delay={0.2}>
          <TableOfContents headings={headings} />
          <article className="prose prose-invert max-w-none">
            <MDXRemote source={post.content} components={components} />
          </article>
        </RevealAnimation>

        <div className="flex items-center justify-between border-t border-zinc-800 pt-8 mt-12">
          {prevPost ? (
            <Link
              href={`/blogs/${prevPost.slug}`}
              className="inline-flex items-center gap-2 text-sm font-mono text-zinc-500 hover:text-purple-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {prevPost.metadata.title}
            </Link>
          ) : (
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-sm font-mono text-zinc-500 hover:text-purple-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              All Posts
            </Link>
          )}
          {nextPost ? (
            <Link
              href={`/blogs/${nextPost.slug}`}
              className="inline-flex items-center gap-2 text-sm font-mono text-zinc-500 hover:text-purple-400 transition-colors text-right"
            >
              {nextPost.metadata.title}
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-sm font-mono text-zinc-500 hover:text-purple-400 transition-colors"
            >
              All Posts
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {relatedPosts.length > 0 && (
          <RevealAnimation delay={0.3}>
            <div className="border-t border-zinc-800 pt-10 mt-10">
              <h2 className="text-2xl font-bold text-zinc-100 mb-6">Related Posts</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedPosts.map((related) => (
                  <Link key={related.slug} href={`/blogs/${related.slug}`}>
                    <div className="h-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-5 hover:border-purple-500/50 transition-colors group">
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {related.metadata.tags?.map((tag) => (
                          <Badge key={tag} variant="outline" className="border-purple-500/30 text-purple-400 text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <h3 className="text-base font-semibold text-zinc-200 group-hover:text-purple-400 transition-colors mb-2 line-clamp-2">
                        {related.metadata.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-zinc-500 mt-auto">
                        <span className="flex items-center gap-1">
                          <CalendarDays className="w-3 h-3" />
                          {related.metadata.publishedAt}
                        </span>
                        <span className="font-mono flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {related.metadata.readingTime}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </RevealAnimation>
        )}
      </div>
    </div>
    </PageTransition>
  );
}
