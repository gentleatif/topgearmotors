'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronRight, Shield, Star, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

const badges = [
  { icon: Shield, label: 'Verified Cars'      },
  { icon: Star,   label: '5-Star Rated'       },
  { icon: Zap,    label: 'Instant Paperwork'  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show:   (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' } }),
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dark-950">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(#c9a84c 1px, transparent 1px), linear-gradient(90deg, #c9a84c 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Radial glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gold-500/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-gold-600/5 blur-2xl" />
      </div>

      <div className="relative container-wide section-padding w-full pt-32 pb-20">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="show" custom={0}
            className="inline-flex items-center gap-2 border border-gold-500/30 bg-gold-500/10 text-gold-400 text-xs font-medium px-4 py-2 rounded-full mb-8 uppercase tracking-widest"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
            India&apos;s Premium Car Marketplace
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp} initial="hidden" animate="show" custom={1}
            className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          >
            Drive Like{' '}
            <span className="gold-text">New.</span>
            <br />
            <span className="text-dark-300">Pay Less.</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={fadeUp} initial="hidden" animate="show" custom={2}
            className="text-dark-400 text-lg sm:text-xl max-w-xl leading-relaxed mb-10"
          >
            Discover hand-picked, fully inspected premium pre-owned vehicles.
            Every car tells a story — find yours.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="show" custom={3}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-14 w-full sm:w-auto"
          >
            <Button size="lg" asChild className="rounded-full px-8 w-full sm:w-auto justify-center">
              <Link href="/cars">
                Browse Cars <ChevronRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="rounded-full px-8 w-full sm:w-auto justify-center">
              <Link href="/contact">Book a Test Drive</Link>
            </Button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="show" custom={4}
            className="flex flex-wrap gap-4"
          >
            {badges.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 text-sm text-dark-300 border border-dark-700 rounded-full px-4 py-2 bg-dark-900/60"
              >
                <Icon className="w-4 h-4 text-gold-500" />
                {label}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Stats strip */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="show" custom={5}
          className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-dark-800 pt-10"
        >
          {[
            { value: '50+', label: 'Cars Sold'       },
            { value: '4.9★', label: 'Average Rating'  },
            { value: '100%', label: 'Verified Listing' },
            { value: '48hr', label: 'Avg Delivery'    },
          ].map(({ value, label }) => (
            <div key={label} className="text-center sm:text-left">
              <div className="text-2xl sm:text-3xl font-bold gold-text mb-1">{value}</div>
              <div className="text-dark-500 text-sm">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
