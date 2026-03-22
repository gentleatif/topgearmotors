'use client'
import { usePathname } from 'next/navigation'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen bg-dark-950">
      <AdminSidebar />
      <main className="flex-1 overflow-auto bg-[#060606]">{children}</main>
    </div>
  )
}
