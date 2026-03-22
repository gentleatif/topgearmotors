import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  title: {
    default: 'Top Gear Motors — Premium Pre-Owned Cars',
    template: '%s | Top Gear Motors',
  },
  description:
    'Discover hand-picked, fully inspected premium pre-owned vehicles. Drive Like New. Pay Less. India\'s trusted car marketplace.',
  keywords: ['used cars', 'pre-owned cars', 'certified cars', 'Top Gear Motors', 'car resale India'],
  openGraph: {
    type:      'website',
    locale:    'en_IN',
    siteName:  'Top Gear Motors',
    title:     'Top Gear Motors — Premium Pre-Owned Cars',
    description: 'Drive Like New. Pay Less. Hand-picked, fully inspected cars.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Top Gear Motors — Premium Pre-Owned Cars',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
