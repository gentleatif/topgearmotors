import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  name:     z.string().min(2),
  email:    z.string().email(),
  phone:    z.string().min(10),
  message:  z.string().min(10),
  carTitle: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    // In production: send email via Resend or save to DB
    // For now, we log and return success
    console.log('📧 Contact form submission:', data)

    // Optional: Save to MongoDB
    // await connectDB()
    // await Contact.create(data)

    return NextResponse.json({ success: true, message: 'Message received. We will contact you shortly!' })
  } catch (err: any) {
    return NextResponse.json({ error: 'Invalid data', details: err.errors }, { status: 400 })
  }
}
