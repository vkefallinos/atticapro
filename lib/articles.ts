import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const ARTICLES_DIR = path.join(process.cwd(), 'content/articles');

export interface ArticleFrontmatter {
  title: { el: string; en: string };
  excerpt: { el: string; en: string };
  date: string;
  coverImage: string;
  author: string;
  category: 'insulation' | 'painting';
}

export interface ArticleMeta extends ArticleFrontmatter {
  slug: string;
}

export interface Article extends ArticleMeta {
  content: string;
}

function getArticleSlugs(): string[] {
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
}

export function getAllArticles(): ArticleMeta[] {
  return getArticleSlugs()
    .map((slug) => {
      const fullPath = path.join(ARTICLES_DIR, `${slug}.mdx`);
      const raw = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(raw);
      return { slug, ...(data as ArticleFrontmatter) };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticleBySlug(slug: string): Article | null {
  const fullPath = path.join(ARTICLES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  const raw = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(raw);

  return {
    slug,
    content,
    ...(data as ArticleFrontmatter),
  };
}
