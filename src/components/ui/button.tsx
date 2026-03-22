import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-950 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:     'bg-gold-500 text-dark-950 hover:bg-gold-400 font-semibold shadow-lg shadow-gold-500/20',
        destructive: 'bg-red-600 text-white hover:bg-red-500',
        outline:     'border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-dark-950',
        secondary:   'bg-dark-800 text-white hover:bg-dark-700 border border-dark-700',
        ghost:       'hover:bg-dark-800 text-dark-300 hover:text-white',
        link:        'text-gold-500 underline-offset-4 hover:underline p-0',
      },
      size: {
        default: 'h-10 px-5 py-2',
        sm:      'h-9 px-3 text-xs',
        lg:      'h-12 px-8 text-base',
        icon:    'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
