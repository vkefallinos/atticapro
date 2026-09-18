import type { MetadataRoute } from 'next';

import { locales } from '@/i18n';
import { getAllGuides } from '@/lib/guides';
import { siteUrl, basePath } from '@/lib/site-config';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ['', '/services/insulation', '/services/painting', '/portfolio', '/knowledge-hub', '/contact'];
  const guides = getAllGuides();

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${siteUrl}${basePath}/${locale}${path}/`,
        lastModified: new Date(),
      });
    }
    for (const guide of guides) {
      entries.push({
        url: `${siteUrl}${basePath}/${locale}/knowledge-hub/${guide.slug}/`,
        lastModified: guide.date,
      });
      for (const chapter of guide.chapters) {
        entries.push({
          url: `${siteUrl}${basePath}/${locale}/knowledge-hub/${guide.slug}/${chapter.slug}/`,
          lastModified: guide.date,
        });
      }
    }
  }

  return entries;
}
