'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Loader2, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import ImageUploader from './ImageUploader'
import { useToast } from '@/components/ui/use-toast'
import type { Car } from '@/types'

const schema = z.object({
  title:        z.string().min(3, 'Title is required'),
  brand:        z.string().min(1, 'Brand is required'),
  model:        z.string().min(1, 'Model is required'),
  year:         z.coerce.number().min(2000).max(new Date().getFullYear() + 1),
  price:        z.coerce.number().min(1, 'Price is required'),
  fuelType:     z.enum(['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG']),
  transmission: z.enum(['Manual', 'Automatic']),
  kmDriven:     z.coerce.number().min(0),
  location:     z.string().min(2, 'Location is required'),
  description:  z.string().min(20, 'Description must be at least 20 chars'),
  condition:    z.enum(['Excellent', 'Good', 'Fair']),
  color:        z.string().optional(),
  owners:       z.coerce.number().min(1).max(5).optional(),
  featured:     z.boolean().default(false),
  seoTitle:     z.string().optional(),
  seoDescription: z.string().optional(),
  slug:         z.string().optional(),
})

type FormData = z.infer<typeof schema>

interface Props {
  car?: Car
  mode: 'create' | 'edit'
}

export default function CarForm({ car, mode }: Props) {
  const router = useRouter()
  const { toast } = useToast()
  const [images,  setImages]  = useState<string[]>(car?.images || [])
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title:          car?.title        || '',
      brand:          car?.brand        || '',
      model:          car?.model        || '',
      year:           car?.year         || new Date().getFullYear(),
      price:          car?.price        || 0,
      fuelType:       (car?.fuelType    as any) || 'Petrol',
      transmission:   (car?.transmission as any) || 'Manual',
      kmDriven:       car?.kmDriven     || 0,
      location:       car?.location     || '',
      description:    car?.description  || '',
      condition:      (car?.condition   as any) || 'Good',
      color:          car?.color        || '',
      owners:         car?.owners       || 1,
      featured:       car?.featured     || false,
      seoTitle:       car?.seoTitle     || '',
      seoDescription: car?.seoDescription || '',
      slug:           car?.slug         || '',
    },
  })

  const onSubmit = async (data: FormData) => {
    if (images.length === 0) {
      toast({ title: 'Upload at least one image', variant: 'destructive' })
      return
    }
    setLoading(true)

    const endpoint = mode === 'create' ? '/api/cars' : `/api/cars/${car?._id}`
    const method   = mode === 'create' ? 'POST' : 'PUT'

    const res = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, images }),
    })

    const json = await res.json()
    setLoading(false)

    if (!res.ok) {
      toast({ title: json.error || 'Something went wrong', variant: 'destructive' })
      return
    }

    toast({ title: mode === 'create' ? 'Car listed successfully!' : 'Car updated!', variant: 'default' })
    router.push('/admin/cars')
    router.refresh()
  }

  const Field = ({ name, label, type = 'text', placeholder = '' }: {
    name: keyof FormData; label: string; type?: string; placeholder?: string
  }) => (
    <div className="space-y-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} type={type} placeholder={placeholder} {...register(name as any)} />
      {errors[name] && <p className="text-red-400 text-xs">{(errors[name] as any)?.message}</p>}
    </div>
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Images */}
      <div className="bg-dark-900 border border-dark-800 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4">Photos</h3>
        <ImageUploader images={images} onChange={setImages} />
      </div>

      {/* Basic Info */}
      <div className="bg-dark-900 border border-dark-800 rounded-xl p-6 space-y-5">
        <h3 className="text-white font-semibold">Basic Information</h3>

        <Field name="title" label="Listing Title" placeholder="e.g. 2022 Hyundai i20 Sportz – Excellent Condition" />

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <Field name="brand"    label="Brand"  placeholder="Hyundai" />
          <Field name="model"    label="Model"  placeholder="i20" />
          <Field name="year"     label="Year"   type="number" placeholder="2022" />
          <Field name="price"    label="Price (₹)" type="number" placeholder="700000" />
          <Field name="kmDriven" label="KM Driven" type="number" placeholder="45000" />
          <Field name="location" label="Location" placeholder="Surat" />
          <Field name="color"    label="Colour" placeholder="White" />
          <Field name="owners"   label="No. of Owners" type="number" placeholder="1" />
        </div>

        {/* Selects */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <Label>Fuel Type</Label>
            <Select defaultValue={watch('fuelType')} onValueChange={v => setValue('fuelType', v as any)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {['Petrol','Diesel','Electric','Hybrid','CNG'].map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Transmission</Label>
            <Select defaultValue={watch('transmission')} onValueChange={v => setValue('transmission', v as any)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {['Manual','Automatic'].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Condition</Label>
            <Select defaultValue={watch('condition')} onValueChange={v => setValue('condition', v as any)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {['Excellent','Good','Fair'].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Featured toggle */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="featured"
            {...register('featured')}
            className="w-4 h-4 accent-yellow-500"
          />
          <Label htmlFor="featured">Mark as Featured (shown on homepage)</Label>
        </div>
      </div>

      {/* Description */}
      <div className="bg-dark-900 border border-dark-800 rounded-xl p-6 space-y-3">
        <h3 className="text-white font-semibold">Description</h3>
        <Textarea
          rows={6}
          placeholder="Detailed car description — condition, features, service history, reason for sale…"
          {...register('description')}
        />
        {errors.description && <p className="text-red-400 text-xs">{errors.description.message}</p>}
      </div>

      {/* SEO */}
      <div className="bg-dark-900 border border-dark-800 rounded-xl p-6 space-y-4">
        <h3 className="text-white font-semibold">SEO Settings</h3>
        <Field name="slug"           label="URL Slug (auto-generated if blank)" placeholder="used-hyundai-i20-2022-surat" />
        <Field name="seoTitle"       label="Meta Title"       placeholder="Buy Used Hyundai i20 2022 in Surat | Top Gear Motors" />
        <div className="space-y-1.5">
          <Label>Meta Description</Label>
          <Textarea
            rows={3}
            placeholder="Well-maintained 2022 Hyundai i20 with full service history. Verified inspection. Available in Surat."
            {...register('seoDescription')}
          />
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end gap-3">
        <Button type="button" variant="secondary" onClick={() => router.back()} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading} className="min-w-[140px]">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4 mr-2" />{mode === 'create' ? 'List Car' : 'Save Changes'}</>}
        </Button>
      </div>
    </form>
  )
}
