import * as React from 'react'
import { cn } from '@/lib/utils'

const DropdownMenu = ({ children }: { children: React.ReactNode }) => <>{children}</>

const DropdownMenuTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(({ className, children, ...props }, ref) => (
  <button ref={ref} className={cn('', className)} {...props}>
    {children}
  </button>
))
DropdownMenuTrigger.displayName = 'DropdownMenuTrigger'

const DropdownMenuContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md', className)} {...props} />
))
DropdownMenuContent.displayName = 'DropdownMenuContent'

const DropdownMenuItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50', className)} {...props} />
))
DropdownMenuItem.displayName = 'DropdownMenuItem'

const DropdownMenuSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('-mx-1 my-1 h-px bg-muted', className)} {...props} />
))
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator'

export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator }
