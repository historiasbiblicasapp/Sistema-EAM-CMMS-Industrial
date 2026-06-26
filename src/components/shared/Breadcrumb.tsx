import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
      <Link to="/" className="hover:text-foreground transition-colors">
        <Home className="h-4 w-4" />
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-1">
          <ChevronRight className="h-4 w-4" />
          {item.href ? (
            <Link
              to={item.href}
              className={cn(
                'hover:text-foreground transition-colors',
                index === items.length - 1 ? 'text-foreground font-medium' : ''
              )}
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}
