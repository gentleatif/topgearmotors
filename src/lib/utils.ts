import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Format price to Indian currency (₹ L / ₹ Cr) */
export function formatPrice(price: number): string {
  if (price >= 10_000_000) {
    return `₹${(price / 10_000_000).toFixed(2)} Cr`
  } else if (price >= 100_000) {
    return `₹${(price / 100_000).toFixed(2)} L`
  }
  return `₹${price.toLocaleString('en-IN')}`
}

/** Format km driven */
export function formatKm(km: number): string {
  return `${km.toLocaleString('en-IN')} km`
}

/** Strip HTML tags for meta descriptions */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').slice(0, 160)
}
