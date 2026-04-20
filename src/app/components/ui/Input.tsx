import { cn } from "@/app/utils/cn";
import React from "react";

type InputShape = "default" | "pill";
type InputTone = "default" | "onDark";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  label?: string;
  variant?: "email" | "subscribe" | "password" | "phone" | "username";
  focus?: string;
  error?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  /**
   * Visual shape of the input.
   * - "default" (default): rounded-lg corners — fits dashboard + forms.
   * - "pill": rounded-full — fits landing hero/newsletter capture rows.
   */
  shape?: InputShape;
  /**
   * Surface tone. Use "onDark" when placing the input on a dark / tinted
   * background (e.g. the footer CTA band) so the base/ring stays legible.
   */
  tone?: InputTone;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      placeholder,
      label,
      variant = "username",
      focus,
      className,
      error,
      type,
      required,
      iconRight,
      iconLeft,
      shape = "default",
      tone = "default",
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

    const isPill = shape === "pill";
    const isOnDark = tone === "onDark";

    const defaultFocus = isOnDark
      ? "focus:ring-2 focus:ring-white/60 focus:border-white/70"
      : "focus:ring-2 focus:ring-primary/40 focus:border-primary/60";

    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "body-bold-16",
              isOnDark ? "text-white" : "text-grey",
            )}
          >
            {label}
            {required && <span className="text-red-500"> *</span>}
          </label>
        )}
        <div className="relative w-full">
          {iconLeft && (
            <span
              className={cn(
                "absolute inset-y-0 left-0 flex items-center pointer-events-none",
                isPill ? "pl-5" : "pl-3",
                isOnDark ? "text-white/70" : "text-grey-medium",
              )}
            >
              {iconLeft}
            </span>
          )}
          <input
            id={inputId}
            type={inputType}
            placeholder={placeholder}
            aria-invalid={Boolean(error) || undefined}
            aria-describedby={error ? `${inputId}-error` : undefined}
            className={cn(
              "w-full min-h-[48px] border outline-none transition-all body-regular-16",
              isPill
                ? "px-6 py-3 sm:py-2 rounded-full"
                : "px-4 py-3 sm:py-2 rounded-lg",
              iconLeft && (isPill ? "pl-12" : "pl-10"),
              iconRight && (isPill ? "pr-12" : "pr-10"),
              isOnDark
                ? "bg-white/10 text-white placeholder:text-white/60 backdrop-blur-md"
                : "bg-white text-grey-medium placeholder:text-grey-medium/60",
              error
                ? "border-danger"
                : isOnDark
                  ? "border-white/30"
                  : "border-grey-light",
              focus ?? defaultFocus,
              className,
            )}
            ref={ref}
            required={required}
            {...props}
          />
          {iconRight && (
            <span
              className={cn(
                "absolute inset-y-0 right-0 flex items-center",
                isPill ? "pr-5" : "pr-3",
                isOnDark ? "text-white/70" : "text-grey-medium",
              )}
            >
              {iconRight}
            </span>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="text-sm text-danger mt-1">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
