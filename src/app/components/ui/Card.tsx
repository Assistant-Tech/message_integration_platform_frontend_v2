import { Slot } from "@radix-ui/react-slot";
import { useState, ReactNode } from "react";
import { MessageSquare } from "lucide-react";

type BorderRadiusType = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
type ElevationType = "none" | "sm" | "md" | "lg" | "xl";

interface CardProps {
  title?: string;
  description?: string;
  textColor?: string;
  icon?: ReactNode;
  iconBackgroundColor?: string;
  iconColor?: string;
  borderRadius?: BorderRadiusType;
  animated?: boolean;
  elevation?: ElevationType;
  asChild?: boolean;
}

const borderRadiusClasses: Record<BorderRadiusType, string> = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  full: "rounded-full",
};

const shadowClasses: Record<ElevationType, string> = {
  none: "",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
};

const Card = ({
  title,
  description = "No more switching between apps! Brings all your messages together in one place, so you can reply faster and stay organized.",
  textColor = "#ffffff",
  icon,
  iconBackgroundColor = "#ffffff",
  borderRadius = "lg",
  animated = false,
  elevation = "md",
  asChild = false,
}: CardProps) => {
  const Comp = asChild ? Slot : "div";

  const animationClasses = animated
    ? "transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
    : "transition-all duration-200";

  return (
    <Comp
      className={`w-full max-w-sm lg:max-w-md h-80 sm:h-72 px-12 py-12 sm:py-8 flex flex-col justify-between ${borderRadiusClasses[borderRadius]} ${shadowClasses[elevation]} ${animationClasses} cursor-pointer bg-primary`}
      style={{ color: textColor }}
    >
      <div className="flex flex-col h-auto">
        <div
          className={`w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center ${borderRadiusClasses.full} flex-shrink-0`}
          style={{ backgroundColor: iconBackgroundColor }}
        >
          <div>{icon}</div>
        </div>

        <div className="flex flex-col justify-start items-start">
          <h3 className="h5-bold-16 py-4">{title}</h3>
          <p className="h5-regular-16">{description}</p>
        </div>
      </div>
    </Comp>
  );
};

export default Card;
