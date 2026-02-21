import * as React from "react";

import { Label } from "./label";
import { cn } from "@/lib/utils/cn";

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
  return (
    <div className={containerClassName}>
      {label && <Label htmlFor={props.id}>{label}</Label>}
      <div className="relative">
        <input
          type={type}
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
        {icon && (
          <button
            type="button"
            onClick={onIconClick}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {icon}
          </button>
        )}
      </div>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export { Input };
