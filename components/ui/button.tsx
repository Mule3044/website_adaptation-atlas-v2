import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import cn from 'classnames'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-brand-green text-white hover:bg-primary/90',
        light:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        link:
          'text-brand-green uppercase',
        carousel:
          'bg-white text-brand-green transition-colors hover:bg-brand-green hover:text-white',
        tag:
          'text-brand-green bg-grey-100 rounded-[4px] transition-colors hover:bg-brand-green hover:text-white',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-10 px-4 text-sm font-medium',
        lg: 'h-10 px-8 text-lg font-medium',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
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
