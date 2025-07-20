import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-mono font-medium tracking-wide transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-primary focus-visible:ring-primary/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive relative overflow-hidden border",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border-primary/30 shadow-lg shadow-primary/20 hover:bg-primary/90 hover:shadow-primary/40 hover:border-primary/50",
        destructive:
          "bg-destructive text-destructive-foreground border-destructive/30 shadow-lg shadow-destructive/20 hover:bg-destructive/90 hover:shadow-destructive/40",
        outline:
          "border-primary/30 bg-background/50 backdrop-blur-sm text-primary hover:bg-primary/10 hover:border-primary/50 shadow-sm hover:shadow-primary/20",
        secondary:
          "bg-secondary text-secondary-foreground border-secondary/30 shadow-sm hover:bg-secondary/80",
        ghost:
          "border-transparent hover:bg-accent/20 hover:text-accent hover:border-accent/30",
        link: "border-transparent text-accent underline-offset-4 hover:underline hover:text-primary",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3 rounded-sm",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5 rounded-sm",
        lg: "h-10 px-6 has-[>svg]:px-4 rounded-sm",
        icon: "size-9 rounded-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
