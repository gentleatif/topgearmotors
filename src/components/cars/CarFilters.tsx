'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'

const brands = ['Maruti', 'Hyundai', 'Honda', 'Toyota', 'BMW', 'Mercedes', 'Audi', 'Tata', 'Mahindra', 'Volkswagen', 'Kia', 'MG']
const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG']
const transmissions = ['Manual', 'Automatic']
const sortOptions = [
  { value: 'newest',    label: 'Newest First'    },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'km-asc',    label: 'Km: Low → High'  },
]

export default function CarFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateParam = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== 'all') {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    params.delete('page') // reset pagination
    router.push(`/cars?${params.toString()}`)
  }, [router, searchParams])

  const clearAll = () => router.push('/cars')

  const hasFilters = searchParams.toString().length > 0

  return (
    <div className="bg-dark-900 border border-dark-800 rounded-xl p-5">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2 text-white font-semibold">
          <SlidersHorizontal className="w-4 h-4 text-gold-500" />
          Filters
        </div>
        {hasFilters && (
          <button onClick={clearAll} className="flex items-center gap-1 text-xs text-dark-400 hover:text-gold-400 transition-colors">
            <X className="w-3 h-3" /> Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Brand */}
        <Select value={searchParams.get('brand') || ''} onValueChange={v => updateParam('brand', v)}>
          <SelectTrigger><SelectValue placeholder="Brand" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Brands</SelectItem>
            {brands.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
          </SelectContent>
        </Select>

        {/* Fuel */}
        <Select value={searchParams.get('fuel') || ''} onValueChange={v => updateParam('fuel', v)}>
          <SelectTrigger><SelectValue placeholder="Fuel Type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Fuels</SelectItem>
            {fuelTypes.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}
          </SelectContent>
        </Select>

        {/* Transmission */}
        <Select value={searchParams.get('transmission') || ''} onValueChange={v => updateParam('transmission', v)}>
          <SelectTrigger><SelectValue placeholder="Transmission" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any</SelectItem>
            {transmissions.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
          </SelectContent>
        </Select>

        {/* Min Price */}
        <Input
          type="number"
          placeholder="Min Price (₹)"
          defaultValue={searchParams.get('minPrice') || ''}
          onBlur={e => updateParam('minPrice', e.target.value)}
          className="placeholder:text-xs"
        />

        {/* Max Price */}
        <Input
          type="number"
          placeholder="Max Price (₹)"
          defaultValue={searchParams.get('maxPrice') || ''}
          onBlur={e => updateParam('maxPrice', e.target.value)}
          className="placeholder:text-xs"
        />

        {/* Sort */}
        <Select value={searchParams.get('sort') || 'newest'} onValueChange={v => updateParam('sort', v)}>
          <SelectTrigger><SelectValue placeholder="Sort By" /></SelectTrigger>
          <SelectContent>
            {sortOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
