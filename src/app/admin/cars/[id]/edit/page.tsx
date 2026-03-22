import { notFound } from 'next/navigation'
import connectDB from '@/lib/mongodb'
import Car from '@/models/Car'
import CarForm from '@/components/admin/CarForm'
import type { Car as CarType } from '@/types'

interface Props { params: { id: string } }

export const metadata = { title: 'Edit Car | Admin' }

async function getCar(id: string): Promise<CarType | null> {
  try {
    await connectDB()
    const car = await Car.findById(id).lean()
    if (!car) return null
    return JSON.parse(JSON.stringify(car))
  } catch {
    return null
  }
}

export default async function EditCarPage({ params }: Props) {
  const car = await getCar(params.id)
  if (!car) notFound()

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Edit Car</h1>
        <p className="text-dark-400 text-sm mt-1 truncate">{car.title}</p>
      </div>
      <CarForm mode="edit" car={car} />
    </div>
  )
}
