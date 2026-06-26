import * as React from 'react'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

const DialogContext = React.createContext<{ open: boolean; onOpenChange: (open: boolean) => void } | null>(null)

const Dialog = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { open?: boolean; onOpenChange?: (open: boolean) => void }>(
  ({ open: controlledOpen, onOpenChange: controlledOnOpenChange, children, ...props }, ref) => {
    const [internalOpen, setInternalOpen] = React.useState(false)
    const open = controlledOpen !== undefined ? controlledOpen : internalOpen
    const onOpenChange = controlledOnOpenChange || setInternalOpen
    return (
      <DialogContext.Provider value={{ open, onOpenChange }}>
        <div ref={ref} {...props}>{children}</div>
      </DialogContext.Provider>
    )
  }
)
Dialog.displayName = 'Dialog'

const DialogTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(({ className, children, ...props }, ref) => {
  const context = React.useContext(DialogContext)
  return (
    <button ref={ref} className={className} onClick={() => context?.onOpenChange(true)} {...props}>
      {children}
    </button>
  )
})
DialogTrigger.displayName = 'DialogTrigger'

const DialogContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, children, ...props }, ref) => {
  const context = React.useContext(DialogContext)
  if (!context?.open) return null
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center" onClick={() => context.onOpenChange(false)}>
      <div
        ref={ref}
        className={cn('relative bg-background rounded-lg shadow-lg max-w-lg w-full mx-4 max-h-[85vh] overflow-auto p-6', className)}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        <button className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100" onClick={() => context.onOpenChange(false)}>
          <X className="h-4 w-4" />
        </button>
        {children}
      </div>
    </div>
  )
})
DialogContent.displayName = 'DialogContent'

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left mb-4', className)} {...props} />
)
DialogHeader.displayName = 'DialogHeader'

const DialogTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
  <h2 ref={ref} className={cn('text-lg font-semibold leading-none tracking-tight', className)} {...props} />
))
DialogTitle.displayName = 'DialogTitle'

export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle }
