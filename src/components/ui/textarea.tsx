import * as React from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      className={cn(
        'flex min-h-[80px] w-full rounded-2xl border border-white/10 bg-dark-800 px-3 py-2 text-sm text-white placeholder:text-dark-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 resize-none transition-colors',
        className
      )}
      ref={ref}
      {...props}
    />
  )
)
Textarea.displayName = 'Textarea'

export { Textarea }
