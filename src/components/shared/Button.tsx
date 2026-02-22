import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  rounded?: "full" | "lg" | "md";
  animateIn?: boolean;
  animateDelay?: number;
  hoverScale?: number;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      rounded = "full",
      animateIn = true,
      animateDelay = 0,
      hoverScale = 1.05,
      loading = false,
      className,
      disabled,
      ...props
    },
    ref,
  ) => {
    const sizeClasses = {
      sm: "px-6 py-3 text-base",
      md: "px-10 py-4 text-lg",
      lg: "px-12 py-5 text-xl",
    };

    const variantClasses = {
      primary: "bg-linear-to-r from-[#4DA3FF] to-[#8B5CF6] text-white",
      secondary: "bg-[#121826] border border-white/10 text-[#F9FAFB]",
      ghost: "bg-transparent text-[#F9FAFB] hover:bg-white/5",
    };

    const roundedClasses = {
      full: "rounded-full",
      lg: "rounded-lg",
      md: "rounded-md",
    };

    const isDisabled = disabled || loading;

    return (
      <motion.button
        ref={ref}
        className={cn(
          "font-semibold transition-all",
          "disabled:cursor-not-allowed",
          sizeClasses[size],
          variantClasses[variant],
          roundedClasses[rounded],
          className,
        )}
        style={{
          fontFamily: "Space Grotesk, sans-serif",
          fontWeight: 600,
        }}
        initial={animateIn ? { opacity: 0, y: 10 } : undefined}
        animate={
          animateIn
            ? { opacity: isDisabled ? 0.5 : 1, y: 0 }
            : { opacity: isDisabled ? 0.5 : 1 }
        }
        transition={
          animateIn ? { delay: animateDelay, duration: 0.4 } : undefined
        }
        whileHover={!isDisabled ? { scale: hoverScale } : undefined}
        whileTap={!isDisabled ? { scale: 0.95 } : undefined}
        disabled={isDisabled}
        {...props}
      >
        {children}
      </motion.button>
    );
  },
);

Button.displayName = "Button";
