'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Fuel, Gauge, Calendar, MapPin, BadgeCheck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { formatPrice, formatKm } from '@/lib/utils'
import type { Car } from '@/types'

interface Props { car: Car; index?: number }

export default function CarCard({ car, index = 0 }: Props) {
  const mainImage = car.images?.[0] || '/placeholder-car.jpg'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
    >
      <Link
        href={`/cars/${car.slug}`}
        className="group block rounded-xl overflow-hidden border border-dark-800 bg-dark-900 hover:border-gold-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/5"
      >
        {/* Image */}
        <div className="relative h-52 overflow-hidden">
          <Image
            src={mainImage}
            alt={car.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {car.featured && (
              <Badge className="text-xs bg-gold-500 text-dark-950 border-0">Featured</Badge>
            )}
            <Badge variant="secondary" className="text-xs border-0 bg-dark-800/90 text-white">
              {car.condition}
            </Badge>
          </div>

          {/* Verified */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1 text-xs text-emerald-400 bg-dark-950/80 px-2 py-1 rounded-full">
            <BadgeCheck className="w-3.5 h-3.5" />
            Verified
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-gold-400 transition-colors line-clamp-1">
            {car.title}
          </h3>

          {/* Price */}
          <p className="text-2xl font-bold font-serif gold-text mb-4">
            {formatPrice(car.price)}
          </p>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 text-xs text-dark-400">
              <Calendar className="w-3.5 h-3.5 text-gold-500/70 shrink-0" />
              {car.year}
            </div>
            <div className="flex items-center gap-2 text-xs text-dark-400">
              <Gauge className="w-3.5 h-3.5 text-gold-500/70 shrink-0" />
              {formatKm(car.kmDriven)}
            </div>
            <div className="flex items-center gap-2 text-xs text-dark-400">
              <Fuel className="w-3.5 h-3.5 text-gold-500/70 shrink-0" />
              {car.fuelType}
            </div>
            <div className="flex items-center gap-2 text-xs text-dark-400">
              <MapPin className="w-3.5 h-3.5 text-gold-500/70 shrink-0" />
              {car.location}
            </div>
          </div>

          {/* Transmission badge */}
          <div className="mt-4 pt-4 border-t border-dark-800 flex items-center justify-between">
            <Badge variant="outline" className="text-xs">
              {car.transmission}
            </Badge>
            <span className="text-gold-500 text-xs font-medium group-hover:underline">
              View Details →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
