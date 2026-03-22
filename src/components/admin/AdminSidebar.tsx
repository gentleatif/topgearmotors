'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { LayoutDashboard, Car, PlusCircle, LogOut, ChevronRight, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

const links = [
  { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard'  },
  { href: '/admin/cars',      icon: Car,             label: 'All Cars'   },
  { href: '/admin/cars/new',  icon: PlusCircle,      label: 'Add Car'    },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-60 bg-dark-950 border-r border-dark-800 flex flex-col min-h-screen">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-dark-800">
        <Link href="/" className="flex items-center justify-center">
          <Image
            src="/logo.jpeg"
            alt="Top Gear Motors"
            width={150}
            height={60}
            className="object-contain h-14 w-auto"
          />
        </Link>
        <p className="text-dark-500 text-xs text-center mt-2">Admin Panel</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {links.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || (href !== '/admin/dashboard' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                active
                  ? 'bg-gold-500/10 text-gold-400 border border-gold-500/20'
                  : 'text-dark-400 hover:text-white hover:bg-dark-800'
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
              {active && <ChevronRight className="w-3 h-3 ml-auto text-gold-500/50" />}
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-dark-800 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-dark-400 hover:text-white hover:bg-dark-800 transition-all w-full"
        >
          <ExternalLink className="w-4 h-4" />
          View Website
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-dark-400 hover:text-red-400 hover:bg-red-400/10 transition-all w-full"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
