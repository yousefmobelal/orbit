import * as React from "react";
import { motion } from "framer-motion";
import { Label } from "./label";
import { cn } from "@/lib/utils/cn";
import { Eye, EyeOff } from "lucide-react";

function Input({
  className,
  type,
  label,
  error,
  containerClassName,
  leadingIcon,
  icon,
  onIconClick,
  ...props
}: React.ComponentProps<"input"> & {
  label?: string;
  error?: string;
  containerClassName?: string;
  leadingIcon?: React.ReactNode;
  icon?: React.ReactNode;
  onIconClick?: () => void;
}) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      className={cn("w-full", containerClassName)}
    >
      {label && <Label htmlFor={props.id}>{label}</Label>}
      <div className="relative">
        <input
          type={showPassword ? "text" : type}
          data-slot="input"
          className={cn(
            "w-full px-4 py-3 rounded-xl bg-[#121826] border border-white/10 text-[#F9FAFB] placeholder-[#9CA3AF] focus:border-[#4DA3FF] focus:outline-none transition-colors disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
            "aria-invalid:border-red-500",
            leadingIcon && "pl-10",
            icon && "pr-10",
            className,
          )}
          style={{ fontFamily: "Inter, sans-serif" }}
          {...props}
        />
        {leadingIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            {leadingIcon}
          </div>
        )}
        {type === "password" ? (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="size-5" />
            ) : (
              <Eye className="size-5" />
            )}
          </button>
        ) : (
          icon && (
            <button
              type="button"
              onClick={onIconClick}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors"
            >
              {icon}
            </button>
          )
        )}
      </div>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </motion.div>
  );
}

export { Input };
