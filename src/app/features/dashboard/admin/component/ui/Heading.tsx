import React from "react";
import { cn } from "@/app/utils/cn";

interface HeadingProps {
  title: string;
  align?: "left" | "center" | "right";
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({
  title,
  align = "left",
  className,
}) => {
  return (
    <h2 className={cn("h4-bold-24", `text-${align}`, className)}>{title}</h2>
  );
};

export default Heading;
