import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Phone, MessageCircle, BadgeCheck, ChevronLeft, Shield, FileCheck } from 'lucide-react'
import connectDB from '@/lib/mongodb'
import Car from '@/models/Car'
import CarGallery from '@/components/cars/CarGallery'
import CarSpecs from '@/components/cars/CarSpecs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/utils'
import type { Car as CarType } from '@/types'

interface Props { params: { slug: string } }

async function getCar(slug: string): Promise<CarType | null> {
  try {
    await connectDB()
    const car = await Car.findOne({ slug }).lean()
    if (!car) return null
    return JSON.parse(JSON.stringify(car))
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const car = await getCar(params.slug)
  if (!car) return { title: 'Car Not Found' }

  const title = car.seoTitle || `${car.title} | Top Gear Motors`
  const description = car.seoDescription ||
    `Buy ${car.year} ${car.brand} ${car.model} in ${car.location}. ${car.kmDriven.toLocaleString()} km driven. Verified inspection. ${formatPrice(car.price)}.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: car.images.length ? [{ url: car.images[0] }] : [],
    },
    alternates: {
      canonical: `/cars/${car.slug}`,
    },
  }
}

export default async function CarDetailPage({ params }: Props) {
  const car = await getCar(params.slug)
  if (!car) notFound()

  const whatsappMsg = encodeURIComponent(
    `Hi! I'm interested in the ${car.title} listed on Top Gear Motors. Can you share more details?`
  )

  // JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type':    'Car',
    name:       car.title,
    description: car.description,
    brand:      { '@type': 'Brand', name: car.brand },
    model:      car.model,
    vehicleModelDate: car.year.toString(),
    mileageFromOdometer: { '@type': 'QuantitativeValue', value: car.kmDriven, unitCode: 'KMT' },
    fuelType:   car.fuelType,
    vehicleTransmission: car.transmission,
    image:      car.images,
    offers: {
      '@type':       'Offer',
      price:         car.price,
      priceCurrency: 'INR',
      availability:  'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: 'Top Gear Motors' },
    },
  }

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="pt-28 pb-24 bg-dark-950 min-h-screen">
        <div className="container-wide section-padding">
          {/* Back */}
          <Link href="/cars" className="inline-flex items-center gap-2 text-dark-400 hover:text-gold-400 text-sm mb-6 transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back to all cars
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left: Gallery + Specs */}
            <div className="lg:col-span-2 space-y-6">
              <CarGallery images={car.images} title={car.title} />
              <CarSpecs car={car} />

              {/* Description */}
              <div className="bg-dark-900 border border-dark-800 rounded-xl p-6">
                <h2 className="text-white font-semibold text-lg mb-3">About This Car</h2>
                <p className="text-dark-300 text-sm leading-relaxed whitespace-pre-line">
                  {car.description}
                </p>
              </div>

              {/* Trust */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-dark-900 border border-dark-800 rounded-xl p-4 flex items-center gap-3">
                  <Shield className="w-8 h-8 text-gold-500 shrink-0" />
                  <div>
                    <div className="text-white text-sm font-semibold">200-Point Inspection</div>
                    <div className="text-dark-500 text-xs">Rigorous quality check</div>
                  </div>
                </div>
                <div className="bg-dark-900 border border-dark-800 rounded-xl p-4 flex items-center gap-3">
                  <FileCheck className="w-8 h-8 text-gold-500 shrink-0" />
                  <div>
                    <div className="text-white text-sm font-semibold">Verified Documents</div>
                    <div className="text-dark-500 text-xs">RC & history checked</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Price + CTA */}
            <div className="space-y-5 lg:sticky lg:top-24 self-start">
              {/* Title & Price */}
              <div className="bg-dark-900 border border-dark-800 rounded-xl p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {car.featured && <Badge className="bg-gold-500 text-dark-950 border-0">Featured</Badge>}
                  <Badge variant="secondary">{car.condition}</Badge>
                  <div className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-1 rounded-full">
                    <BadgeCheck className="w-3.5 h-3.5" /> Verified
                  </div>
                </div>

                <h1 className="text-white font-bold text-xl sm:text-2xl mb-2 leading-snug">{car.title}</h1>
                <div className="text-4xl font-bold font-serif gold-text">{formatPrice(car.price)}</div>
                <p className="text-dark-500 text-xs mt-1">{car.location}</p>
              </div>

              {/* CTAs */}
              <div className="bg-dark-900 border border-dark-800 rounded-xl p-6 space-y-3">
                <a href="tel:+919825134228" className="block">
                  <Button className="w-full" size="lg">
                    <Phone className="w-4 h-4 mr-2" /> Call Now
                  </Button>
                </a>
                <a
                  href={`https://wa.me/919825134228?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button variant="outline" className="w-full" size="lg">
                    <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp
                  </Button>
                </a>
                <Button variant="secondary" className="w-full" size="lg" asChild>
                  <Link href={`/contact?car=${encodeURIComponent(car.title)}`}>
                    Request Test Drive
                  </Link>
                </Button>
              </div>

              {/* Quick facts */}
              <div className="bg-dark-900 border border-dark-800 rounded-xl p-5 text-sm space-y-3">
                <div className="flex justify-between text-dark-400">
                  <span>Year</span>
                  <span className="text-white font-medium">{car.year}</span>
                </div>
                <div className="flex justify-between text-dark-400">
                  <span>Fuel</span>
                  <span className="text-white font-medium">{car.fuelType}</span>
                </div>
                <div className="flex justify-between text-dark-400">
                  <span>Transmission</span>
                  <span className="text-white font-medium">{car.transmission}</span>
                </div>
                <div className="flex justify-between text-dark-400">
                  <span>KM Driven</span>
                  <span className="text-white font-medium">{car.kmDriven.toLocaleString()} km</span>
                </div>
                {car.owners && (
                  <div className="flex justify-between text-dark-400">
                    <span>Owners</span>
                    <span className="text-white font-medium">{car.owners}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
