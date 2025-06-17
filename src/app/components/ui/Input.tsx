import React from "react";
import { cn } from "@/app/utils/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  label?: string;
  variant?: "email" | "subscribe" | "password" | "phone" | "username";
  focus?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      placeholder,
      label,
      variant = "username",
      focus = "focus:ring-2 focus:ring-blue-500",
      className,
      error,
      type,
      ...props
    },
    ref,
  ) => {
    const inputType =
      type ||
      (variant === "password"
        ? "password"
        : variant === "email"
          ? "email"
          : variant === "phone"
            ? "tel"
            : "text");

    return (
      <div className="flex flex-col gap-1 w-full">
        {label && <label className="body-bold-16 text-grey">{label}</label>}
        <input
          type={inputType}
          placeholder={placeholder}
          className={cn(
            // updated for mobile padding and height
            "w-full px-4 py-3 sm:py-2 min-h-[48px] border rounded-lg outline-none transition-all body-regular-16 text-grey-medium",
            error ? "border-danger" : "border-gray-300",
            focus,
            className,
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-sm text-danger mt-1">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
