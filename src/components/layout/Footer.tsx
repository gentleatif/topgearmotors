import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-dark-950 border-t border-dark-800">
      {/* Gold line top */}
      <div className="h-px bg-gold-gradient" />

      <div className="container-wide section-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center mb-4">
              <div className="overflow-hidden rounded-xl h-12">
                <Image
                  src="/logo.jpeg"
                  alt="Top Gear Motors"
                  width={140}
                  height={56}
                  className="object-contain h-full w-auto"
                />
              </div>
            </Link>
            <p className="text-dark-400 text-sm leading-relaxed max-w-xs">
              Your trusted destination for premium pre-owned vehicles. Every car is
              hand-picked, fully inspected, and ready to Drive Like New.
            </p>
            <div className="flex gap-4 mt-6">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full border border-dark-700 flex items-center justify-center text-dark-400 hover:text-gold-500 hover:border-gold-500 transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { href: '/',        label: 'Home'          },
                { href: '/cars',    label: 'Browse Cars'   },
                { href: '/contact', label: 'Book Test Drive'},
                { href: '/contact', label: 'Sell Your Car'  },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-dark-400 hover:text-gold-400 text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:+919825134228" className="flex items-start gap-3 text-sm text-dark-400 hover:text-gold-400 transition-colors">
                  <Phone className="w-4 h-4 mt-0.5 shrink-0" />
                  +91 98251 34228
                </a>
              </li>
              <li>
                <a href="mailto:nalbandhbilal@gmail.com" className="flex items-start gap-3 text-sm text-dark-400 hover:text-gold-400 transition-colors">
                  <Mail className="w-4 h-4 mt-0.5 shrink-0" />
                  nalbandhbilal@gmail.com
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm text-dark-400">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>Near Khalifa Masjid, Nanura,<br />Nanpura, Surat, Gujarat 395001</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-dark-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-dark-500 text-xs">© {new Date().getFullYear()} Top Gear Motors. All rights reserved.</p>
          <p className="text-dark-500 text-xs">Crafted with precision for car enthusiasts</p>
        </div>
      </div>
    </footer>
  )
}
