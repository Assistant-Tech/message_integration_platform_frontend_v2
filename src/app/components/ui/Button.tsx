import type React from "react";
import { useNavigate } from "react-router-dom";

import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/app/utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: "primary" | "secondary" | "outlined";
  redirectTo?: string;
  Icon?: React.ElementType;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      label,
      variant = "primary",
      redirectTo,
      className,
      onClick,
      Icon,
      // right - icon
      // left - icon 
      ...props
    },
    ref,
  ) => {
    const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (redirectTo) {
        event.preventDefault();
        navigate(redirectTo);
      }
      onClick?.(event);
    };

    return (
      <button
        ref={ref}
        className={cn(
          "max-w-48 max-h-12 flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-3 py-3 sm:py-3 rounded-xl transition-all duration-300 ease-in-out cursor-pointer relative overflow-hidden group",
          variant === "primary"
            ? "bg-primary text-white button-semi-bold-16 hover:bg-white hover:text-primary border hover:border-primary"
            : variant === "secondary"
              ? "bg-gray-200 button-semi-bold-16 text-primary hover:bg-gray-300"
              : "bg-transparent button-semi-bold-16 text-primary hover:text-white ring-1 ring-primary/80",
          className,
        )}
        onClick={handleClick}
        {...props}
      >
        <div
          className={cn(
            "w-48 h-48 absolute rounded-full",

            variant === "primary"
              ? "bg-white"
              : variant === "secondary"
                ? "bg-gray-200"
                : "bg-primary",
            " scale-0 group-hover:scale-200 -z-0 transition-all duration-300 ease-in",
          )}
        />
        {Icon && <Icon size={24} className=" z-10" />}
        <span className="z-10">{label}</span>
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
