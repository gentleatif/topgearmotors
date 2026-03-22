'use client'
import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Send, CheckCircle2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

const schema = z.object({
  name:    z.string().min(2, 'Name must be at least 2 characters'),
  email:   z.string().email('Enter a valid email'),
  phone:   z.string().min(10, 'Enter a valid phone number'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})
type FormData = z.infer<typeof schema>

function ContactForm() {
  const searchParams = useSearchParams()
  const carTitle = searchParams.get('car') || ''
  const [sent, setSent] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { message: carTitle ? `I'm interested in the ${carTitle}.` : '' },
  })

  const onSubmit = async (data: FormData) => {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, carTitle }),
    })
    if (res.ok) setSent(true)
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <CheckCircle2 className="w-16 h-16 text-emerald-500" />
        <h3 className="text-white text-xl font-bold">Message Sent!</h3>
        <p className="text-dark-400 text-sm">We&apos;ll get back to you within 24 hours.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Your Name</Label>
          <Input placeholder="Rahul Sharma" {...register('name')} />
          {errors.name && <p className="text-red-400 text-xs">{errors.name.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>Phone Number</Label>
          <Input placeholder="+91 98251 34228" {...register('phone')} />
          {errors.phone && <p className="text-red-400 text-xs">{errors.phone.message}</p>}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Email Address</Label>
        <Input type="email" placeholder="rahul@example.com" {...register('email')} />
        {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label>Message</Label>
        <Textarea rows={5} placeholder="Tell us about the car you're interested in…" {...register('message')} />
        {errors.message && <p className="text-red-400 text-xs">{errors.message.message}</p>}
      </div>

      <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
        {isSubmitting ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <><Send className="w-4 h-4 mr-2" /> Send Message</>
        )}
      </Button>
    </form>
  )
}

export default function ContactPage() {
  return (
    <section className="pt-32 pb-24 bg-dark-950 min-h-screen">
      <div className="container-wide section-padding">
        <div className="mb-12">
          <p className="text-gold-500 text-sm font-medium uppercase tracking-widest mb-2">Get In Touch</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold">
            Contact <span className="gold-text">Us</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            {[
              { icon: Phone,  title: 'Phone',   value: '+91 98251 34228',            href: 'tel:+919825134228'                  },
              { icon: Mail,   title: 'Email',   value: 'nalbandhbilal@gmail.com', href: 'mailto:nalbandhbilal@gmail.com'     },
              { icon: MapPin, title: 'Address', value: 'Nar Khalifa Masjid, Nanura, Nanpura, Surat, Gujarat 395001', href: null },
            ].map(({ icon: Icon, title, value, href }) => (
              <div key={title} className="flex gap-4 p-5 bg-dark-900 border border-dark-800 rounded-xl hover:border-gold-500/30 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-gold-500/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-gold-500" />
                </div>
                <div>
                  <div className="text-dark-400 text-xs mb-1">{title}</div>
                  {href ? (
                    <a href={href} className="text-white font-medium hover:text-gold-400 transition-colors text-sm">
                      {value}
                    </a>
                  ) : (
                    <p className="text-white font-medium text-sm">{value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="p-5 bg-dark-900 border border-dark-800 rounded-xl">
              <h3 className="text-white font-semibold mb-2 text-sm">Business Hours</h3>
              <div className="space-y-1 text-xs text-dark-400">
                <div className="flex justify-between"><span>Monday – Saturday</span><span className="text-white">9:00 AM – 7:00 PM</span></div>
                <div className="flex justify-between"><span>Sunday</span><span className="text-white">10:00 AM – 4:00 PM</span></div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3 bg-dark-900 border border-dark-800 rounded-xl p-8"
          >
            <Suspense fallback={<div className="text-dark-400 text-sm">Loading form…</div>}>
              <ContactForm />
            </Suspense>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
