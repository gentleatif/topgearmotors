import CarForm from '@/components/admin/CarForm'

export const metadata = { title: 'Add New Car | Admin' }

export default function NewCarPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Add New Car</h1>
        <p className="text-dark-400 text-sm mt-1">Fill in the details to list a new vehicle.</p>
      </div>
      <CarForm mode="create" />
    </div>
  )
}
