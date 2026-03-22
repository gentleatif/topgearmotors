'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Menu, X, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/',        label: 'Home'     },
  { href: '/cars',    label: 'Cars'     },
  { href: '/contact', label: 'Contact'  },
]

export default function Header() {
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-dark-950/95 backdrop-blur-md border-b border-dark-800 py-3'
            : 'bg-transparent py-5'
        )}
      >
        <div className="container-wide section-padding">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="group flex items-center">
              <Image
                src="/logo.jpeg"
                alt="Top Gear Motors"
                width={130}
                height={52}
                className="object-contain h-12 w-auto"
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'nav-link relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-gold-500 after:transition-all after:duration-300 hover:after:w-full',
                    pathname === href && 'text-gold-500 after:w-full'
                  )}
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="tel:+919825134228"
                className="flex items-center gap-2 text-sm text-dark-300 hover:text-gold-400 transition-colors"
              >
                <Phone className="w-4 h-4" />
                +91 98251 34228
              </a>
              <Button size="sm" asChild>
                <Link href="/cars">Browse Cars <ChevronRight className="ml-1 w-4 h-4" /></Link>
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-white p-2"
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{   opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-0 z-40 pt-20 pb-8 bg-dark-950/98 backdrop-blur-lg border-b border-dark-800 md:hidden"
          >
            <nav className="flex flex-col gap-2 px-6">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'py-3 text-lg font-medium border-b border-dark-800 flex items-center justify-between',
                    pathname === href ? 'text-gold-500' : 'text-white'
                  )}
                >
                  {label}
                  <ChevronRight className="w-4 h-4 text-dark-400" />
                </Link>
              ))}
              <a
                href="tel:+919825134228"
                className="mt-4 flex items-center gap-2 text-dark-300"
              >
                <Phone className="w-4 h-4" /> +91 98251 34228
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
