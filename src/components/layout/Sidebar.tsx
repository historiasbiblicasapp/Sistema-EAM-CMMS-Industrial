import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Settings, ClipboardList, CalendarCheck, Package,
  ShoppingCart, FileText, Truck, Users, BarChart3, Printer, Shield,
  ScrollText, Cog, ChevronLeft, ChevronRight, Factory
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSidebarStore } from '@/stores/sidebar-store'
import { useMediaQuery } from '@/hooks/use-media-query'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Equipamentos', href: '/equipamentos', icon: Settings },
  { label: 'Ordens de Serviço', href: '/ordens', icon: ClipboardList },
  { label: 'Planos Preventivos', href: '/preventivas', icon: CalendarCheck },
  { label: 'Almoxarifado', href: '/almoxarifado', icon: Package },
  { label: 'Compras', href: '/compras', icon: ShoppingCart },
  { label: 'Contratos', href: '/contratos', icon: FileText },
  { label: 'Fornecedores', href: '/fornecedores', icon: Truck },
  { label: 'Equipes', href: '/equipes', icon: Users },
  { label: 'Indicadores', href: '/indicadores', icon: BarChart3 },
  { label: 'Relatórios', href: '/relatorios', icon: Printer },
  { label: 'Administração', href: '/admin', icon: Shield },
  { label: 'Auditoria', href: '/auditoria', icon: ScrollText },
  { label: 'Configurações', href: '/configuracoes', icon: Cog },
]

export function Sidebar() {
  const { isOpen, isCollapsed, setOpen, toggleCollapse } = useSidebarStore()
  const isMobile = useMediaQuery('(max-width: 768px)')

  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setOpen(false)} />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 z-50 h-full w-[280px] bg-sidebar text-white flex flex-col"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    )
  }

  return (
    <aside
      className={cn(
        'h-screen bg-sidebar text-white flex flex-col transition-all duration-300 fixed left-0 top-0 z-30',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <Factory className="h-8 w-8 text-blue-400" />
            <div>
              <h1 className="text-sm font-bold leading-tight">SGMI</h1>
              <p className="text-[10px] text-gray-400">EAM / CMMS</p>
            </div>
          </div>
        )}
        {isCollapsed && <Factory className="h-8 w-8 text-blue-400 mx-auto" />}
        <button
          onClick={toggleCollapse}
          className="p-1 rounded-lg hover:bg-sidebar-hover transition-colors hidden lg:block"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            onClick={() => isMobile && setOpen(false)}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group',
                isActive
                  ? 'bg-blue-600/20 text-blue-400 border-l-2 border-blue-400'
                  : 'text-gray-400 hover:text-white hover:bg-sidebar-hover'
              )
            }
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-white/10">
        {!isCollapsed && (
          <p className="text-[10px] text-gray-500 text-center">SGMI v1.0.0</p>
        )}
      </div>
    </aside>
  )
}

function SidebarContent() {
  const { isCollapsed } = useSidebarStore()
  return (
    <>
      <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Factory className="h-8 w-8 text-blue-400" />
          <div>
            <h1 className="text-sm font-bold leading-tight">SGMI</h1>
            <p className="text-[10px] text-gray-400">EAM / CMMS</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                isActive
                  ? 'bg-blue-600/20 text-blue-400 border-l-2 border-blue-400'
                  : 'text-gray-400 hover:text-white hover:bg-sidebar-hover'
              )
            }
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </>
  )
}
