import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-10 w-full min-w-0 border backdrop-blur-md px-4 py-2 text-sm font-mono tracking-wide transition-all duration-300 outline-none rounded-sm",
        "bg-slate-950/80 border-purple-500/30 text-purple-100 placeholder:text-purple-300/50",
        "focus:border-blue-400/60 focus:shadow-lg focus:shadow-blue-400/40 focus:bg-slate-950/90 focus:glow-blue focus:text-blue-100",
        "hover:border-purple-400/35",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-red-400/60 aria-invalid:shadow-lg aria-invalid:shadow-red-400/40 aria-invalid:glow-red",
        "selection:bg-purple-500/30 selection:text-purple-100",
        "file:border-0 file:bg-transparent file:text-sm file:font-mono file:font-medium file:text-purple-100",
        className
      )}
      {...props}
    />
  );
}

export { Input };
