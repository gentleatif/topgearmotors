'use client'
import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props { images: string[]; title: string }

export default function CarGallery({ images, title }: Props) {
  const [active,    setActive]    = useState(0)
  const [lightbox,  setLightbox]  = useState(false)

  if (!images.length) return null

  const prev = () => setActive(i => (i - 1 + images.length) % images.length)
  const next = () => setActive(i => (i + 1) % images.length)

  return (
    <>
      {/* Main Image */}
      <div className="relative rounded-xl overflow-hidden bg-dark-900 aspect-[16/9]">
        <Image
          src={images[active]}
          alt={`${title} - photo ${active + 1}`}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 60vw"
        />

        {/* Nav arrows */}
        {images.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-dark-950/80 border border-dark-700 flex items-center justify-center text-white hover:border-gold-500 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-dark-950/80 border border-dark-700 flex items-center justify-center text-white hover:border-gold-500 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Counter & Zoom */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          <span className="text-xs text-white bg-dark-950/80 px-3 py-1 rounded-full">
            {active + 1} / {images.length}
          </span>
          <button onClick={() => setLightbox(true)} className="w-8 h-8 rounded-full bg-dark-950/80 border border-dark-700 flex items-center justify-center text-white hover:border-gold-500 transition-colors">
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${i === active ? 'border-gold-500' : 'border-dark-700 opacity-60 hover:opacity-100'}`}
            >
              <Image src={img} alt={`thumb ${i + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(false)}
          >
            <button onClick={() => setLightbox(false)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-dark-800 border border-dark-600 flex items-center justify-center text-white hover:border-gold-500 transition-colors">
              <X className="w-5 h-5" />
            </button>
            <div className="relative w-full max-w-4xl aspect-video" onClick={e => e.stopPropagation()}>
              <Image src={images[active]} alt={title} fill className="object-contain" />
            </div>
            {images.length > 1 && (
              <>
                <button onClick={e => { e.stopPropagation(); prev() }} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-dark-800/80 flex items-center justify-center text-white">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={e => { e.stopPropagation(); next() }} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-dark-800/80 flex items-center justify-center text-white">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
