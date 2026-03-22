import mongoose, { Schema, Document, Model } from 'mongoose'
import slugify from 'slugify'

export interface ICar extends Document {
  title: string
  slug: string
  brand: string
  model: string
  year: number
  price: number
  fuelType: string
  transmission: string
  kmDriven: number
  location: string
  images: string[]
  description: string
  featured: boolean
  condition: string
  color: string
  owners: number
  seoTitle: string
  seoDescription: string
  createdAt: Date
  updatedAt: Date
}

const CarSchema = new Schema<ICar>(
  {
    title:        { type: String, required: true, trim: true },
    slug:         { type: String, unique: true },
    brand:        { type: String, required: true, trim: true },
    model:        { type: String, required: true, trim: true },
    year:         { type: Number, required: true },
    price:        { type: Number, required: true },
    fuelType:     { type: String, enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG'], required: true },
    transmission: { type: String, enum: ['Manual', 'Automatic'], required: true },
    kmDriven:     { type: Number, required: true },
    location:     { type: String, required: true, trim: true },
    images:       [{ type: String }],
    description:  { type: String, required: true },
    featured:     { type: Boolean, default: false },
    condition:    { type: String, enum: ['Excellent', 'Good', 'Fair'], default: 'Good' },
    color:        { type: String, default: '' },
    owners:       { type: Number, default: 1, min: 1, max: 5 },
    seoTitle:     { type: String, default: '' },
    seoDescription: { type: String, default: '' },
  },
  { timestamps: true }
)

CarSchema.pre('save', function (next) {
  if (!this.slug) {
    const base = `${this.brand}-${this.model}-${this.year}-${this.location}`
    this.slug = slugify(base, { lower: true, strict: true })
  }
  next()
})

const Car: Model<ICar> =
  mongoose.models.Car || mongoose.model<ICar>('Car', CarSchema)

export default Car
