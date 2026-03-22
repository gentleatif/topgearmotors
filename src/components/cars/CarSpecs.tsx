import { Calendar, Gauge, Fuel, Settings2, MapPin, Palette, Users, BadgeCheck } from 'lucide-react'
import { formatKm } from '@/lib/utils'
import type { Car } from '@/types'

export default function CarSpecs({ car }: { car: Car }) {
  const specs = [
    { icon: Calendar,  label: 'Year',          value: car.year.toString()              },
    { icon: Gauge,     label: 'KM Driven',     value: formatKm(car.kmDriven)           },
    { icon: Fuel,      label: 'Fuel Type',     value: car.fuelType                     },
    { icon: Settings2, label: 'Transmission',  value: car.transmission                 },
    { icon: MapPin,    label: 'Location',      value: car.location                     },
    { icon: BadgeCheck,label: 'Condition',     value: car.condition || 'Good'          },
    ...(car.color   ? [{ icon: Palette, label: 'Colour',    value: car.color }] : []),
    ...(car.owners  ? [{ icon: Users,   label: 'Owners',    value: `${car.owners} ${car.owners === 1 ? 'Owner' : 'Owners'}` }] : []),
  ]

  return (
    <div className="rounded-xl border border-dark-800 bg-dark-900 overflow-hidden">
      <div className="px-5 py-4 border-b border-dark-800">
        <h3 className="text-white font-semibold">Vehicle Specifications</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y divide-dark-800">
        {specs.map(({ icon: Icon, label, value }) => (
          <div key={label} className="p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-dark-400 text-xs">
              <Icon className="w-3.5 h-3.5 text-gold-500" />
              {label}
            </div>
            <div className="text-white font-semibold text-sm">{value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
