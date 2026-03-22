import { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXTAUTH_URL || 'https://topgearmotors.in'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow:     '/',
        disallow:  ['/admin/', '/api/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
