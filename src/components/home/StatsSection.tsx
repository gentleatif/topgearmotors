'use client'
import { motion } from 'framer-motion'

const stats = [
  { value: '40+',   label: 'Happy Customers',      desc: 'Across Gujarat & beyond'     },
  { value: '4.9/5',  label: 'Customer Rating',       desc: 'Based on 200+ reviews'       },
  { value: '200pt',  label: 'Inspection Checks',     desc: 'On every single vehicle'     },
  { value: '48hrs',  label: 'Avg Delivery Time',     desc: 'From purchase to doorstep'   },
]

export default function StatsSection() {
  return (
    <section className="py-20 bg-dark-950 border-y border-dark-800">
      <div className="container-wide section-padding">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(({ value, label, desc }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl font-bold font-serif gold-text mb-2">{value}</div>
              <div className="text-white font-semibold text-sm mb-1">{label}</div>
              <div className="text-dark-500 text-xs">{desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
