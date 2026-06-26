import { Bell, Moon, Sun, Menu, Search } from 'lucide-react'
import { useThemeStore } from '@/stores/theme-store'
import { useSidebarStore } from '@/stores/sidebar-store'
import { useAuthStore } from '@/stores/auth-store'
import { useNotificationStore } from '@/stores/notification-store'
import { useMediaQuery } from '@/hooks/use-media-query'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function Header() {
  const { theme, toggleTheme } = useThemeStore()
  const { toggle } = useSidebarStore()
  const { user, logout } = useAuthStore()
  const { unreadCount } = useNotificationStore()
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <header className="sticky top-0 z-20 h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        <div className="flex items-center gap-4">
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggle}>
              <Menu className="h-5 w-5" />
            </Button>
          )}
          {!isMobile && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar equipamentos, ordens..."
                className="w-64 lg:w-96 pl-9 h-9"
              />
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80">
              <div className="p-2 text-sm font-medium">Notificações</div>
              <DropdownMenuSeparator />
              <div className="p-4 text-sm text-muted-foreground text-center">
                Nenhuma notificação
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost" className="flex items-center gap-2 px-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    {user?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                {!isMobile && (
                  <div className="text-left">
                    <p className="text-sm font-medium leading-tight">{user?.name || 'Usuário'}</p>
                    <p className="text-[10px] text-muted-foreground">{user?.role}</p>
                  </div>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuItem>Perfil</DropdownMenuItem>
              <DropdownMenuItem>Configurações</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>Sair</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

function DropdownMenuSeparator() {
  return <div className="-mx-1 my-1 h-px bg-muted" />
}
