export interface Car {
  _id: string
  title: string
  slug: string
  brand: string
  model: string
  year: number
  price: number
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid' | 'CNG'
  transmission: 'Manual' | 'Automatic'
  kmDriven: number
  location: string
  images: string[]
  description: string
  featured: boolean
  condition: 'Excellent' | 'Good' | 'Fair'
  color?: string
  owners?: number
  seoTitle?: string
  seoDescription?: string
  createdAt: string
  updatedAt: string
}

export interface FilterState {
  brand: string
  minPrice: string
  maxPrice: string
  fuelType: string
  transmission: string
  location: string
  sortBy: string
}

export interface ContactFormData {
  name: string
  email: string
  phone: string
  message: string
  carTitle?: string
}

export interface AdminStats {
  totalCars: number
  featuredCars: number
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  message?: string
  error?: string
}
