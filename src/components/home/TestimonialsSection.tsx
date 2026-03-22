'use client'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name:    'Rahul Sharma',
    role:    'Purchased BMW 3 Series',
    city:    'Surat',
    rating:  5,
    text:    'Absolutely seamless experience. The car was exactly as described, inspection report was thorough and the team helped me through every step. Highly recommend Top Gear Motors!',
    avatar:  'RS',
  },
  {
    name:    'Priya Patel',
    role:    'Purchased Honda City',
    city:    'Ahmedabad',
    rating:  5,
    text:    'I was skeptical about buying a pre-owned car online, but Top Gear Motors changed my mind. Transparent pricing, verified documents — I felt completely at ease.',
    avatar:  'PP',
  },
  {
    name:    'Arjun Mehta',
    role:    'Purchased Hyundai Creta',
    city:    'Vadodara',
    rating:  5,
    text:    'The 200-point inspection report gave me full confidence. The car runs perfectly. Top Gear Motors delivers on every promise. Will be back for my next upgrade!',
    avatar:  'AM',
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-dark-900">
      <div className="container-wide section-padding">
        <div className="text-center mb-14">
          <p className="text-gold-500 text-sm font-medium uppercase tracking-widest mb-2">Testimonials</p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold">
            What Our <span className="gold-text">Customers Say</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ name, role, city, rating, text, avatar }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative p-6 rounded-xl border border-dark-800 bg-dark-950 flex flex-col gap-5"
            >
              <Quote className="w-8 h-8 text-gold-500/30 absolute top-4 right-4" />

              {/* Stars */}
              <div className="flex gap-1">
                {Array(rating).fill(0).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-gold-500 text-gold-500" />
                ))}
              </div>

              <p className="text-dark-300 text-sm leading-relaxed flex-1">&ldquo;{text}&rdquo;</p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold-500/20 border border-gold-500/30 flex items-center justify-center text-gold-400 font-bold text-sm">
                  {avatar}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{name}</div>
                  <div className="text-dark-500 text-xs">{role} · {city}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
