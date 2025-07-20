import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-mono font-medium tracking-wide transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-primary focus-visible:ring-primary/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive relative overflow-hidden border backdrop-blur-sm",
  {
    variants: {
      variant: {
        default:
          "bg-purple-600/20 text-purple-200 border-purple-500/40 shadow-lg shadow-purple-500/30 hover:bg-purple-600/30 hover:shadow-purple-500/50 hover:border-purple-400/60 hover:glow-purple",
        destructive:
          "bg-red-600/20 text-red-200 border-red-500/40 shadow-lg shadow-red-500/30 hover:bg-red-600/30 hover:shadow-red-500/50 hover:glow-red",
        outline:
          "border-blue-400/40 bg-slate-950/30 text-blue-300 hover:bg-blue-500/15 hover:border-blue-400/60 shadow-sm hover:shadow-blue-400/30 hover:glow-blue",
        secondary:
          "bg-secondary/30 text-secondary-foreground border-secondary/40 shadow-sm hover:bg-secondary/40 hover:shadow-secondary/20",
        ghost:
          "border-transparent hover:bg-accent/15 hover:text-accent hover:border-accent/30 hover:shadow-accent/20",
        link: "border-transparent text-accent underline-offset-4 hover:underline hover:text-primary hover:glow-cyan",
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
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
