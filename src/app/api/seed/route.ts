import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'

/**
 * POST /api/seed
 * Creates or resets the admin user using ADMIN_EMAIL + ADMIN_PASSWORD from .env
 * Only runs in development.
 */
export async function POST() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not allowed in production' }, { status: 403 })
  }

  try {
    await connectDB()

    const email = process.env.ADMIN_EMAIL    || 'admin@topgearmotors.com'
    const pass  = process.env.ADMIN_PASSWORD || 'Admin@123456'

    // Delete any existing admin user(s) and recreate fresh
    await User.deleteMany({ role: 'admin' })
    const admin = await User.create({ email, password: pass, name: 'Top Gear Motors Admin', role: 'admin' })
    return NextResponse.json({ message: 'Admin created successfully', email: admin.email })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
