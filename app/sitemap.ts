import type { MetadataRoute } from 'next';

import { locales } from '@/i18n';
import { getAllArticles } from '@/lib/articles';

const baseUrl = 'https://atticapro.example.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ['', '/services/insulation', '/services/painting', '/portfolio', '/knowledge-hub', '/contact'];
  const articles = getAllArticles();

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(),
      });
    }
    for (const article of articles) {
      entries.push({
        url: `${baseUrl}/${locale}/knowledge-hub/${article.slug}`,
        lastModified: article.date,
      });
    }
  }

  return entries;
}
