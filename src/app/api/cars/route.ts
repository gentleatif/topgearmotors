import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import Car from '@/models/Car'
import slugify from 'slugify'

export async function GET(req: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(req.url)

    const page     = parseInt(searchParams.get('page')     || '1')
    const limit    = parseInt(searchParams.get('limit')    || '12')
    const featured = searchParams.get('featured')
    const brand    = searchParams.get('brand')
    const fuel     = searchParams.get('fuel')
    const trans    = searchParams.get('transmission')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const sort     = searchParams.get('sort') || 'newest'

    // Build filter
    const filter: Record<string, unknown> = {}
    if (featured)  filter.featured     = true
    if (brand)     filter.brand        = { $regex: brand, $options: 'i' }
    if (fuel)      filter.fuelType     = fuel
    if (trans)     filter.transmission = trans
    if (minPrice || maxPrice) {
      filter.price = {}
      if (minPrice) (filter.price as any).$gte = Number(minPrice)
      if (maxPrice) (filter.price as any).$lte = Number(maxPrice)
    }

    // Sort
    const sortMap: Record<string, Record<string, 1 | -1>> = {
      newest:     { createdAt: -1 },
      'price-asc':  { price: 1 },
      'price-desc': { price: -1 },
      'km-asc':     { kmDriven: 1 },
    }
    const sortQuery = sortMap[sort] || { createdAt: -1 }

    const [cars, total] = await Promise.all([
      Car.find(filter).sort(sortQuery).skip((page - 1) * limit).limit(limit).lean(),
      Car.countDocuments(filter),
    ])

    return NextResponse.json({ success: true, data: cars, total, page, pages: Math.ceil(total / limit) })
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Failed to fetch cars' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await connectDB()
    const body = await req.json()

    // Generate slug if not provided
    if (!body.slug) {
      const base = `${body.brand}-${body.model}-${body.year}-${body.location}`
      body.slug  = slugify(base, { lower: true, strict: true })
    }

    // Ensure slug is unique
    let slug     = body.slug
    let attempt  = 0
    while (await Car.findOne({ slug })) {
      attempt++
      slug = `${body.slug}-${attempt}`
    }
    body.slug = slug

    const car = await Car.create(body)
    return NextResponse.json({ success: true, data: car }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
