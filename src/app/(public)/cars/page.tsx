import type { Metadata } from 'next'
import { Suspense } from 'react'
import connectDB from '@/lib/mongodb'
import Car from '@/models/Car'
import CarCard from '@/components/cars/CarCard'
import CarFilters from '@/components/cars/CarFilters'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import type { Car as CarType } from '@/types'

export const metadata: Metadata = {
  title: 'Browse Pre-Owned Cars',
  description:
    'Explore our entire inventory of certified pre-owned cars. Filter by brand, fuel type, price and more.',
}

interface Props {
  searchParams: {
    page?:         string
    brand?:        string
    fuel?:         string
    transmission?: string
    minPrice?:     string
    maxPrice?:     string
    sort?:         string
  }
}

async function getCars(params: Props['searchParams']) {
  try {
    await connectDB()

    const page  = Math.max(1, parseInt(params.page || '1'))
    const limit = 12
    const filter: Record<string, unknown> = {}

    if (params.brand)        filter.brand        = { $regex: params.brand, $options: 'i' }
    if (params.fuel)         filter.fuelType     = params.fuel
    if (params.transmission) filter.transmission = params.transmission
    if (params.minPrice || params.maxPrice) {
      filter.price = {}
      if (params.minPrice) (filter.price as any).$gte = Number(params.minPrice)
      if (params.maxPrice) (filter.price as any).$lte = Number(params.maxPrice)
    }

    const sortMap: Record<string, Record<string, 1 | -1>> = {
      newest:      { createdAt: -1 },
      'price-asc':  { price: 1 },
      'price-desc': { price: -1 },
      'km-asc':     { kmDriven: 1 },
    }
    const sortQuery = sortMap[params.sort || 'newest'] || { createdAt: -1 }

    const [cars, total] = await Promise.all([
      Car.find(filter).sort(sortQuery).skip((page - 1) * limit).limit(limit).lean(),
      Car.countDocuments(filter),
    ])

    return {
      cars:  JSON.parse(JSON.stringify(cars)) as CarType[],
      total,
      page,
      pages: Math.ceil(total / limit),
    }
  } catch {
    return { cars: [], total: 0, page: 1, pages: 0 }
  }
}

function buildPageUrl(params: Props['searchParams'], page: number) {
  const p = new URLSearchParams()
  Object.entries(params).forEach(([k, v]) => { if (v && k !== 'page') p.set(k, v) })
  p.set('page', String(page))
  return `/cars?${p.toString()}`
}

export default async function CarsPage({ searchParams }: Props) {
  const { cars, total, page, pages } = await getCars(searchParams)

  return (
    <section className="pt-32 pb-24 min-h-screen bg-dark-950">
      <div className="container-wide section-padding">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-2">
            Browse <span className="gold-text">Cars</span>
          </h1>
          <p className="text-dark-400">{total} verified vehicles available</p>
        </div>

        {/* Filters */}
        <Suspense>
          <CarFilters />
        </Suspense>

        {/* Grid */}
        {cars.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {cars.map((car, i) => (
                <CarCard key={car._id} car={car} index={i} />
              ))}
            </div>

            {/* Pagination */}
            {pages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                {page > 1 && (
                  <Link href={buildPageUrl(searchParams, page - 1)} className="flex items-center gap-1 px-4 py-2 rounded-lg border border-dark-700 text-dark-300 hover:border-gold-500 hover:text-gold-400 transition-colors text-sm">
                    <ChevronLeft className="w-4 h-4" /> Prev
                  </Link>
                )}

                {Array.from({ length: pages }, (_, i) => i + 1)
                  .filter(p => Math.abs(p - page) <= 2)
                  .map(p => (
                    <Link
                      key={p}
                      href={buildPageUrl(searchParams, p)}
                      className={`w-10 h-10 rounded-lg text-sm flex items-center justify-center transition-colors ${p === page ? 'bg-gold-500 text-dark-950 font-bold' : 'border border-dark-700 text-dark-300 hover:border-gold-500 hover:text-gold-400'}`}
                    >
                      {p}
                    </Link>
                  ))}

                {page < pages && (
                  <Link href={buildPageUrl(searchParams, page + 1)} className="flex items-center gap-1 px-4 py-2 rounded-lg border border-dark-700 text-dark-300 hover:border-gold-500 hover:text-gold-400 transition-colors text-sm">
                    Next <ChevronRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="mt-16 text-center py-20 border border-dark-800 rounded-xl">
            <p className="text-dark-400 text-lg">No cars found matching your filters.</p>
            <Link href="/cars" className="text-gold-500 hover:underline text-sm mt-2 inline-block">Clear all filters</Link>
          </div>
        )}
      </div>
    </section>
  )
}
