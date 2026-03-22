'use client'
import { motion } from 'framer-motion'
import { Shield, FileCheck, Headphones, BadgeCheck, Banknote, RefreshCw } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: '200-Point Inspection',
    description:
      'Every vehicle undergoes a rigorous 200-point mechanical and cosmetic inspection before listing.',
  },
  {
    icon: FileCheck,
    title: 'Full Condition Report',
    description:
      'Receive a detailed inspection report covering engine, bodywork, electronics, and more.',
  },
  {
    icon: BadgeCheck,
    title: 'Verified Ownership',
    description:
      'We verify all RC documents, service history, and ownership records — no surprises.',
  },
  {
    icon: Banknote,
    title: 'Transparent Pricing',
    description:
      'Our prices are market-benchmarked and fair. No hidden charges, no dealer markups.',
  },
  {
    icon: Headphones,
    title: '7-Day After-Sales Support',
    description:
      'Our team is available to assist you for a full week after your purchase.',
  },
  {
    icon: RefreshCw,
    title: 'Easy Exchange',
    description:
      'Have a car to sell? We offer hassle-free exchange with instant valuation.',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-dark-900 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute right-0 top-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl" />

      <div className="container-wide section-padding relative">
        <div className="text-center mb-16">
          <p className="text-gold-500 text-sm font-medium uppercase tracking-widest mb-2">Why Top Gear Motors</p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
            The <span className="gold-text">Difference</span> Is In The Details
          </h2>
          <p className="text-dark-400 max-w-xl mx-auto">
            We obsess over every detail so you can buy with complete confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group p-6 rounded-xl border border-dark-800 bg-dark-950 hover:border-gold-500/40 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-gold-500/10 flex items-center justify-center mb-5 group-hover:bg-gold-500/20 transition-colors">
                <Icon className="w-6 h-6 text-gold-500" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
              <p className="text-dark-400 text-sm leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
