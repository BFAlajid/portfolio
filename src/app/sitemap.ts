import { MetadataRoute } from "next";
import { config } from "@/data/config";
import { getBlogPosts } from "@/lib/mdx";
import { getAllCaseStudyIds } from "@/data/case-studies";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = getBlogPosts().map((post) => ({
    url: `${config.site}/blogs/${post.slug}`,
    lastModified: new Date(post.metadata.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const caseStudies = getAllCaseStudyIds().map((id) => ({
    url: `${config.site}/projects/${id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: config.site,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${config.site}/blogs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogPosts,
    ...caseStudies,
  ];
}
