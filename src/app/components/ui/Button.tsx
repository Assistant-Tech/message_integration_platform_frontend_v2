import type React from "react";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/app/utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "information"
    | "warning"
    | "danger"
    | "neutral"
    | "outlined";
  redirectTo?: string;
  IconLeft?: React.ReactElement;
  IconRight?: React.ReactElement;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
}

const variantStyles: Record<string, string> = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  secondary: "bg-secondary text-white hover:bg-secondary-dark",
  success: "bg-success text-white hover:bg-success-dark",
  information: "bg-information text-white hover:bg-information-dark",
  warning: "bg-warning text-black hover:bg-warning-dark",
  danger: "bg-danger text-white hover:bg-danger-light",
  neutral: "bg-primary-light text-black hover:bg-primary-inactive",
  outlined:
    "bg-white border border-primary text-primary hover:text-white hover:bg-primary",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      label,
      variant = "primary",
      redirectTo,
      onClick,
      className,
      IconLeft,
      IconRight,
      type = "button",
      loading = false,
      disabled,
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
        type={type}
        onClick={handleClick}
        disabled={disabled || loading}
        className={cn(
          "flex items-center justify-center gap-2 px-2 py-1 md:px-4 md:py-3 rounded-xl button-semi-bold-16 transition-colors duration-200 cursor-pointer",
          variantStyles[variant],
          (disabled || loading) && "opacity-50 cursor-not-allowed",
          className,
        )}
        {...props}
      >
        {loading ? (
          <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
        ) : (
          <>
            {IconLeft && <span>{IconLeft}</span>}
            <span>{label}</span>
            {IconRight && <span>{IconRight}</span>}
          </>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
