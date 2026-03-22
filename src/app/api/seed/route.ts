import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'

/**
 * POST /api/seed
 * Run ONCE to create the admin user.
 * Then delete or protect this route.
 */
export async function POST() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not allowed in production' }, { status: 403 })
  }

  try {
    await connectDB()

    const email = process.env.ADMIN_EMAIL    || 'nalbandhbilal@gmail.com'
    const pass  = process.env.ADMIN_PASSWORD || 'Admin@12345'

    const existing = await User.findOne({ email })
    if (existing) {
      return NextResponse.json({ message: 'Admin already exists', email })
    }

    const admin = await User.create({ email, password: pass, name: 'Top Gear Motors Admin', role: 'admin' })
    return NextResponse.json({ message: 'Admin created successfully', email: admin.email })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
