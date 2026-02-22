import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils/cn";

export interface ButtonProps extends Omit<
  HTMLMotionProps<"button">,
  "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag"
> {
  variant?: "default" | "gradient" | "ghost" | "outline" | "tab" | "tab-active";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-xl font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const variants = {
      default:
        "bg-[#121826] text-white hover:bg-[#1a2332] border border-white/10",
      gradient:
        "bg-gradient-to-r from-[#4DA3FF] to-[#8B5CF6] text-white hover:opacity-90",
      ghost: "text-[#9CA3AF] hover:bg-white/5",
      outline: "border border-white/10 text-white hover:bg-white/5",
      tab: "text-[#9CA3AF] hover:bg-white/5",
      "tab-active": "bg-[#4DA3FF]/20 text-[#4DA3FF]",
    };

    const sizes = {
      default: "h-11 px-4 py-2",
      sm: "h-9 px-3 text-sm",
      lg: "h-14 px-6 text-lg",
      icon: "h-11 w-11 p-0",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: variant === "gradient" ? 1.02 : 1 }}
        whileTap={{ scale: 0.98 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        style={{ fontFamily: "Space Grotesk, sans-serif" }}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button };
