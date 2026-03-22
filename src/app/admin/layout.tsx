import { headers } from 'next/headers'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = headers().get('x-pathname') || ''

  // Login page: no sidebar, no session check — middleware already handles auth
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  // All other admin pages: show sidebar shell
  // Auth is fully handled by middleware — no redirect needed here
  return (
    <div className="flex min-h-screen bg-dark-950">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
