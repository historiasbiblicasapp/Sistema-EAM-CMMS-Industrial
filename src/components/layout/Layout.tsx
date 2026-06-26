import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { useSidebarStore } from '@/stores/sidebar-store'
import { cn } from '@/lib/utils'
import { useMediaQuery } from '@/hooks/use-media-query'

export function Layout() {
  const { isCollapsed } = useSidebarStore()
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div
        className={cn(
          'transition-all duration-300',
          isMobile ? 'ml-0' : isCollapsed ? 'ml-16' : 'ml-64'
        )}
      >
        <Header />
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
