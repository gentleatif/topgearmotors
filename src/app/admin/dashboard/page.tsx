import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { Car, PlusCircle, Star, TrendingUp } from 'lucide-react'
import { authOptions } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import CarModel from '@/models/Car'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/utils'
import type { Car as CarType } from '@/types'

async function getStats() {
  try {
    await connectDB()
    const [total, featured, recent] = await Promise.all([
      CarModel.countDocuments(),
      CarModel.countDocuments({ featured: true }),
      CarModel.find().sort({ createdAt: -1 }).limit(5).lean(),
    ])
    return { total, featured, recent: JSON.parse(JSON.stringify(recent)) as CarType[] }
  } catch {
    return { total: 0, featured: 0, recent: [] }
  }
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  const { total, featured, recent } = await getStats()

  const stats = [
    { icon: Car,       label: 'Total Cars',     value: total,    color: 'text-gold-500', bg: 'bg-gold-500/10'    },
    { icon: Star,      label: 'Featured',       value: featured, color: 'text-blue-400', bg: 'bg-blue-400/10'    },
    { icon: TrendingUp, label: 'Available',      value: total,    color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  ]

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-dark-400 text-sm mt-1">Welcome back, {session?.user?.name}</p>
        </div>
        <Button asChild>
          <Link href="/admin/cars/new">
            <PlusCircle className="w-4 h-4 mr-2" /> Add Car
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        {stats.map(({ icon: Icon, label, value, color, bg }) => (
          <div key={label} className="bg-dark-900 border border-white/10 rounded-2xl p-6 flex items-center gap-5 shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
            <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center`}>
              <Icon className={`w-6 h-6 ${color}`} />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">{value}</div>
              <div className="text-dark-400 text-sm">{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent */}
      <div className="bg-dark-900 border border-white/10 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
        <div className="px-6 py-4 border-b border-dark-700 flex items-center justify-between">
          <h2 className="text-white font-semibold">Recent Listings</h2>
          <Link href="/admin/cars" className="text-gold-500 hover:underline text-sm">View All</Link>
        </div>

        {recent.length === 0 ? (
          <div className="py-16 text-center text-dark-500">
            No cars listed yet.{' '}
            <Link href="/admin/cars/new" className="text-gold-500 hover:underline">Add your first car</Link>
          </div>
        ) : (
          <div className="divide-y divide-dark-800">
            {recent.map(car => (
              <div key={car._id} className="px-6 py-4 flex items-center justify-between hover:bg-dark-800/50 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium text-sm truncate">{car.title}</div>
                  <div className="text-dark-500 text-xs mt-0.5">
                    {car.brand} · {car.year} · {car.location}
                  </div>
                </div>
                <div className="flex items-center gap-4 ml-4">
                  <div className="text-gold-400 font-semibold text-sm">{formatPrice(car.price)}</div>
                  <Link href={`/admin/cars/${car._id}/edit`} className="text-xs text-dark-400 hover:text-gold-400 transition-colors border border-white/10 hover:border-gold-500/50 px-3 py-1.5 rounded-xl">
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
