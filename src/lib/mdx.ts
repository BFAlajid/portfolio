import fs from "fs";
import path from "path";
import matter from "gray-matter";

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  author?: string;
  tags?: string[];
  readingTime: string;
};

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  return matter(rawContent);
}

function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
  return `${minutes} min read`;
}

export function extractHeadings(content: string): { level: number; text: string; slug: string }[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: { level: number; text: string; slug: string }[] = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const text = match[2].trim();
    const slug = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
    headings.push({
      level: match[1].length,
      text,
      slug,
    });
  }
  return headings;
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { data, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata: { ...data, readingTime: calculateReadingTime(content) } as Metadata,
      slug,
      content,
    };
  });
}

export function getBlogPosts() {
  return getMDXData(path.join(process.cwd(), "src/content/blogs"));
}

export function getBlogPost(slug: string) {
  const filePath = path.join(process.cwd(), "src/content/blogs", `${slug}.mdx`);
  const { data, content } = readMDXFile(filePath);
  return {
    metadata: { ...data, readingTime: calculateReadingTime(content) } as Metadata,
    content,
  };
}
