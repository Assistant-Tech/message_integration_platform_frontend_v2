import { cn } from "@/app/utils/cn";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  label?: string;
  variant?: "email" | "subscribe" | "password" | "phone" | "username";
  focus?: string;
  error?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      placeholder,
      label,
      variant = "username",
      focus = "focus:ring-2 focus:ring-primary",
      className,
      error,
      type,
      required,
      iconRight,
      iconLeft,
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

    const inputId =
      props.id || `input-${label?.replace(/\s+/g, "-").toLowerCase()}`;

    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label htmlFor={inputId} className="body-bold-16 text-grey">
            {label}
            {required && <span className="text-red-500"> *</span>}
          </label>
        )}
        <div className="relative w-full">
          {iconLeft && (
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {iconLeft}
            </span>
          )}
          <input
            id={inputId}
            type={inputType}
            placeholder={placeholder}
            className={cn(
              "w-full px-4 py-3 sm:py-2 min-h-[48px] border rounded-lg outline-none transition-all body-regular-16 text-grey-medium",
              iconLeft ? "pl-10" : "",
              iconRight ? "pr-10" : "",
              error ? "border-danger" : "border-grey-light",
              focus,
              className,
            )}
            ref={ref}
            required={required}
            {...props}
          />
          {iconRight && (
            <span className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {iconRight}
            </span>
          )}
        </div>
        {error && <p className="text-sm text-danger mt-1">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
