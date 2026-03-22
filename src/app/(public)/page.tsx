import type { Metadata } from 'next'
import connectDB from '@/lib/mongodb'
import Car from '@/models/Car'
import HeroSection from '@/components/home/HeroSection'
import FeaturedCars from '@/components/home/FeaturedCars'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import StatsSection from '@/components/home/StatsSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import type { Car as CarType } from '@/types'

export const metadata: Metadata = {
  title: 'Top Gear Motors — Premium Pre-Owned Cars',
  description:
    'Discover hand-picked, fully inspected premium pre-owned vehicles. Drive Like New. Pay Less.',
}

async function getFeaturedCars(): Promise<CarType[]> {
  try {
    await connectDB()
    const cars = await Car.find({ featured: true }).sort({ createdAt: -1 }).limit(6).lean()
    return JSON.parse(JSON.stringify(cars))
  } catch {
    return []
  }
}

export default async function HomePage() {
  const featuredCars = await getFeaturedCars()

  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturedCars cars={featuredCars} />
      <WhyChooseUs />
      <TestimonialsSection />
    </>
  )
}
