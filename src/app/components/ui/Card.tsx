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
  title = "All Messages in One Inbox",
  description = "No more switching between apps! Brings all your messages together in one place, so you can reply faster and stay organized.",
  textColor = "#ffffff",
  icon = <MessageSquare size={32} />,
  iconBackgroundColor = "#ffffff",
  iconColor = "#26AA91",
  borderRadius = "lg",
  animated = false,
  elevation = "md",
  asChild = false,
}: CardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const Comp = asChild ? Slot : "div";

  const animationClasses = animated
    ? "transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
    : "transition-all duration-200";

  return (
    <Comp
      className={`w-full h-full p-8 ${borderRadiusClasses[borderRadius]} ${shadowClasses[elevation]} ${animationClasses} cursor-pointer bg-primary`}
      style={{ color: textColor }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col h-full">
        <div
          className={`w-16 h-16 flex items-center justify-center text-base-white ${borderRadiusClasses.full} mb-6 flex-shrink-0`}
          style={{ backgroundColor: iconBackgroundColor }}
        >
          <div style={{ color: iconColor }}>{icon}</div>
        </div>

        <h3 className="mb-4 h5-bold-16">{title}</h3>
        <p className="mb-4 h5-bold-16 opacity-90 flex-grow">{description}</p>
      </div>
    </Comp>
  );
};

export default Card;
