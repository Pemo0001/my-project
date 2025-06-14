/* eslint-disable */

import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const InteractiveHoverButton = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(({ children, className, ...props }, ref) => {
  return (
    <button ref={ref} className={cn("group relative w-auto cursor-pointer overflow-hidden rounded-full border bg-transperant px-6 text-center font-semibold", className)} {...props}>
      <div className="flex items-center justify-center gap-2">
        <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">{children}</span>
      </div>
      <div className="absolute inset-0 z-10 flex items-center justify-center gap-2 text-primary-foreground opacity-0 transition-all duration-300 group-hover:opacity-100">
        <span>{children}</span>
        <ArrowRight size={16} />
      </div>
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";
