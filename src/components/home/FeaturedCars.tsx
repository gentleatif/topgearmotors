import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CarCard from '@/components/cars/CarCard'
import type { Car } from '@/types'

interface Props { cars: Car[] }

export default function FeaturedCars({ cars }: Props) {
  if (!cars.length) return null

  return (
    <section className="py-24 bg-dark-950">
      <div className="container-wide section-padding">
        {/* Heading */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-gold-500 text-sm font-medium uppercase tracking-widest mb-2">
              Top Picks
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold">
              Featured <span className="gold-text">Vehicles</span>
            </h2>
          </div>
          <Button variant="ghost" asChild className="hidden sm:flex">
            <Link href="/cars">
              View All <ChevronRight className="ml-1 w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car, i) => (
            <CarCard key={car._id} car={car} index={i} />
          ))}
        </div>

        <div className="mt-10 text-center sm:hidden">
          <Button variant="outline" asChild>
            <Link href="/cars">View All Cars <ChevronRight className="ml-1 w-4 h-4" /></Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
