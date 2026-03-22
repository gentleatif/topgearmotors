import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center text-center px-4">
      <div>
        <h1 className="font-serif text-8xl font-bold gold-text mb-4">404</h1>
        <p className="text-dark-400 text-lg mb-8">Page not found</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-dark-950 font-semibold px-6 py-3 rounded-full transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
