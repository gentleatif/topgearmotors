import { MetadataRoute } from 'next'
import connectDB from '@/lib/mongodb'
import Car from '@/models/Car'

const BASE_URL = process.env.NEXTAUTH_URL || 'https://topgearmotors.in'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,            lastModified: new Date(), changeFrequency: 'daily',   priority: 1.0 },
    { url: `${BASE_URL}/cars`,  lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]

  let carPages: MetadataRoute.Sitemap = []
  try {
    await connectDB()
    const cars = await Car.find({}, 'slug updatedAt').lean()
    carPages = cars.map(car => ({
      url:             `${BASE_URL}/cars/${car.slug}`,
      lastModified:    car.updatedAt,
      changeFrequency: 'weekly' as const,
      priority:        0.8,
    }))
  } catch { /* ignore */ }

  return [...staticPages, ...carPages]
}
