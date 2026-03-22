'use client'
import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { PlusCircle, Pencil, Trash2, Loader2, Search, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/components/ui/use-toast'
import { formatPrice } from '@/lib/utils'
import type { Car } from '@/types'

export default function AdminCarsPage() {
  const { toast } = useToast()
  const [cars,    setCars]    = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const [search,  setSearch]  = useState('')
  const [deleting, setDeleting] = useState<string | null>(null)

  const fetchCars = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/cars?limit=100')
    const data = await res.json()
    setCars(data.data || [])
    setLoading(false)
  }, [])

  useEffect(() => { fetchCars() }, [fetchCars])

  const deleteCar = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return
    setDeleting(id)
    await fetch(`/api/cars/${id}`, { method: 'DELETE' })
    toast({ title: 'Car deleted', variant: 'default' })
    setCars(prev => prev.filter(c => c._id !== id))
    setDeleting(null)
  }

  const filtered = cars.filter(c =>
    `${c.title} ${c.brand} ${c.model} ${c.location}`.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">All Cars</h1>
        <Button asChild>
          <Link href="/admin/cars/new"><PlusCircle className="w-4 h-4 mr-2" /> Add Car</Link>
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
        <Input
          placeholder="Search by name, brand, location…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-gold-500" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 bg-dark-900 border border-dark-800 rounded-xl">
          <p className="text-dark-400">
            {search ? 'No results found.' : 'No cars yet. '}
            {!search && <Link href="/admin/cars/new" className="text-gold-500 hover:underline">Add your first car</Link>}
          </p>
        </div>
      ) : (
        <div className="bg-dark-900 border border-dark-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-800">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-dark-400 uppercase tracking-wider w-16">Photo</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-dark-400 uppercase tracking-wider">Car</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-dark-400 uppercase tracking-wider">Price</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-dark-400 uppercase tracking-wider hidden sm:table-cell">Location</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-dark-400 uppercase tracking-wider hidden md:table-cell">Status</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-dark-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-800">
                {filtered.map(car => (
                  <tr key={car._id} className="hover:bg-dark-800/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="relative w-14 h-10 rounded-lg overflow-hidden bg-dark-800">
                        {car.images?.[0] && (
                          <Image src={car.images[0]} alt={car.title} fill className="object-cover" />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-white text-sm font-medium line-clamp-1">{car.title}</div>
                      <div className="text-dark-500 text-xs">{car.year} · {car.fuelType} · {car.transmission}</div>
                    </td>
                    <td className="px-4 py-3 text-gold-400 font-semibold text-sm">{formatPrice(car.price)}</td>
                    <td className="px-4 py-3 text-dark-400 text-sm hidden sm:table-cell">{car.location}</td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      {car.featured ? (
                        <Badge className="bg-gold-500/10 text-gold-400 border border-gold-500/30 text-xs">
                          <Star className="w-3 h-3 mr-1" /> Featured
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs">Listed</Badge>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/cars/${car._id}/edit`}>
                          <Button variant="ghost" size="icon" className="w-8 h-8">
                            <Pencil className="w-4 h-4 text-dark-400 hover:text-gold-400" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-8 h-8"
                          onClick={() => deleteCar(car._id, car.title)}
                          disabled={deleting === car._id}
                        >
                          {deleting === car._id
                            ? <Loader2 className="w-4 h-4 animate-spin" />
                            : <Trash2 className="w-4 h-4 text-dark-400 hover:text-red-400" />
                          }
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
