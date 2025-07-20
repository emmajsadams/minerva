import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-9 w-full min-w-0 border bg-input px-3 py-1 text-sm font-mono tracking-wide transition-all duration-200 outline-none rounded-sm",
        "border-primary/30 text-foreground placeholder:text-muted-foreground",
        "focus:border-accent focus:shadow-lg focus:shadow-accent/20",
        "hover:border-primary/50",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-destructive aria-invalid:shadow-lg aria-invalid:shadow-destructive/20",
        "selection:bg-primary selection:text-primary-foreground",
        "file:border-0 file:bg-transparent file:text-sm file:font-mono file:font-medium file:text-foreground",
        className
      )}
      {...props}
    />
  );
}

export { Input };
