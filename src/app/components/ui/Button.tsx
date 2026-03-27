"use client";
import clsx from "clsx";
import {
  forwardRef,
  type ButtonHTMLAttributes,
  type ForwardedRef,
} from "react";

const variantStyles = {
  primary: "bg-primary text-white",
  secondary: "bg-secondary text-white",
  success: "bg-success text-white",
  information: "bg-information text-white",
  warning: "bg-warning text-black",
  danger: "bg-danger text-white",
  neutral: "bg-base-white text-primary",
  outlined: "bg-transparent border border-primary text-black",
  black: "bg-base-black/40 text-white",
  none: "bg-transparent",
} as const;

type ButtonVariant = keyof typeof variantStyles;
type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

const buttonSizes: Record<ButtonSize, string> = {
  xs: "px-2 py-1 min-h-[32px] text-xs rounded-md",
  sm: "px-3 py-2 min-h-[40px] text-sm rounded-lg",
  md: "px-4 py-3 sm:py-2 min-h-[48px] text-base rounded-xl",
  lg: "px-6 py-3 min-h-[56px] text-lg rounded-xl",
  xl: "px-8 py-4 min-h-[64px] text-xl rounded-2xl",
};

const iconButtonSizes: Record<ButtonSize, string> = {
  xs: "h-8 w-8",
  sm: "h-10 w-10",
  md: "h-12 w-12",
  lg: "h-14 w-14",
  xl: "h-16 w-16",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  IconLeft?: React.ReactElement;
  IconRight?: React.ReactElement;
  loading?: boolean;
  badge?: string;
  iconOnly?: boolean;
}

function ButtonComponent(
  props: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const {
    label,
    variant = "primary",
    size = "md",
    IconLeft,
    IconRight,
    loading = false,
    disabled = false,
    badge,
    iconOnly = false,
    className,
    type = "button",
    onClick,
    ...rest
  } = props;

  const isNone = variant === "none";
  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-label={iconOnly ? rest["aria-label"] || label : undefined}
      className={clsx(
        "group relative flex items-center justify-center overflow-hidden transition-all duration-300",
        "button-semi-bold-16 cursor-pointer",

        iconOnly ? iconButtonSizes[size] : clsx("gap-2", buttonSizes[size]),

        variantStyles[variant],

        !isNone &&
          !iconOnly &&
          !isDisabled &&
          "hover:scale-105 hover:shadow-xl active:scale-95",

        isDisabled && "cursor-not-allowed opacity-50 hover:scale-100",

        className,
      )}
      {...rest}
    >
      {!isNone && !iconOnly && !isDisabled && (
        <span
          className={clsx(
            "absolute inset-0 -translate-x-[110%] skew-x-[-13deg] transition-discrete duration-1000 group-hover:translate-x-[45%]",
            ["outlined", "neutral"].includes(variant)
              ? "bg-primary/20"
              : "bg-white/25",
          )}
        />
      )}

      {loading ? (
        <span className="relative z-10 h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : iconOnly ? (
        IconLeft && (
          <span className="relative z-10 flex items-center justify-center">
            {IconLeft}
          </span>
        )
      ) : (
        <>
          {IconLeft && (
            <span className="relative z-10 flex items-center justify-center">
              {IconLeft}
            </span>
          )}

          {label && <span className="relative z-10 leading-none">{label}</span>}

          {IconRight && (
            <span className="relative z-10 flex items-center justify-center">
              {IconRight}
            </span>
          )}
        </>
      )}

      {!iconOnly && badge && (
        <span className="text-success ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs">
          {badge}
        </span>
      )}
    </button>
  );
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(ButtonComponent);
Button.displayName = "Button";

export default Button;
