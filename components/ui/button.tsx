import { cloneElement, isValidElement } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

// Minimal Slot implementation to avoid external dependency
const Slot = forwardRef<any, any>(({ children, className, ...props }, ref) => {
  if (!isValidElement(children)) return null;
  return cloneElement(children as any, {
    ...props,
    ref,
    className: cn((children as any).props?.className, className)
  });
});
Slot.displayName = 'Slot';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 ring-offset-white',
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-r from-purple-600 via-blue-600 to-purple-500 text-white shadow-lg hover:brightness-105 hover:shadow-xl',
        secondary: 'bg-white/80 text-purple-700 shadow-sm hover:bg-white/95',
        outline: 'border border-white/60 bg-white/50 text-purple-700 shadow-sm hover:bg-white/80',
        ghost: 'text-purple-600 hover:bg-white/60 hover:text-purple-700',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        link: 'text-purple-600 underline-offset-4 hover:underline'
      },
      size: {
        default: 'h-10 px-5',
        sm: 'h-9 px-4 text-xs',
        lg: 'h-12 px-8 text-base',
        icon: 'h-10 w-10 rounded-full'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
