import React from "react";
import { cn } from "@/app/utils/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  label?: string;
  variant?: "email" | "subscribe" | "password" | "phone" | "username";
  focus?: string;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  label,
  variant = "username",
  focus = "focus:ring-2 focus:ring-blue-500",
  className,
  type,
  ...props
}) => {
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
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <input
        type={inputType}
        placeholder={placeholder}
        className={cn(
          "w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all",
          focus,
          className,
        )}
        {...props}
      />
    </div>
  );
};

export default Input;
