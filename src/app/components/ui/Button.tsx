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
    | "neutral";
  redirectTo?: string;
  IconLeft?: React.ElementType;
  IconRight?: React.ElementType;
}

const variantStyles: Record<string, string> = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  secondary: "bg-secondary text-white hover:bg-secondary-dark",
  success: "bg-success text-white hover:bg-success-dark",
  information: "bg-information text-white hover:bg-information-dark",
  warning: "bg-warning text-black hover:bg-warning-dark",
  danger: "bg-danger text-white hover:bg-danger-light",
  neutral: "bg-primary-light text-black hover:bg-primary-inactive",
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
        onClick={handleClick}
        className={cn(
          "flex items-center justify-center gap-2 px-4 py-3 rounded-md button-semi-bold-16 transition-colors duration-200",
          variantStyles[variant],
          className,
        )}
        {...props}
      >
        {IconLeft && <IconLeft size={18} className="mr-1" />}
        <span>{label}</span>
        {IconRight && <IconRight size={18} className="ml-1" />}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
