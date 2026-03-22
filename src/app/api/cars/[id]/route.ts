import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import Car from '@/models/Car'

type Params = { params: { id: string } }

/** GET /api/cars/:id  — fetch single car by _id or slug */
export async function GET(_req: NextRequest, { params }: Params) {
  try {
    await connectDB()
    const car = await Car.findById(params.id).lean()
    if (!car) return NextResponse.json({ error: 'Car not found' }, { status: 404 })
    return NextResponse.json({ success: true, data: car })
  } catch {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
  }
}

/** PUT /api/cars/:id */
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await connectDB()
    const body = await req.json()
    const car  = await Car.findByIdAndUpdate(params.id, body, { new: true, runValidators: true })
    if (!car) return NextResponse.json({ error: 'Car not found' }, { status: 404 })

    return NextResponse.json({ success: true, data: car })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

/** DELETE /api/cars/:id */
export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await connectDB()
    await Car.findByIdAndDelete(params.id)
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
