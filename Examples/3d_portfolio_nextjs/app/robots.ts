import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/private/', '/admin/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        crawlDelay: 2,
      },
    ],
    sitemap: 'https://www.olivervdb.com/sitemap.xml',
    host: 'https://www.olivervdb.com',
  }
}
