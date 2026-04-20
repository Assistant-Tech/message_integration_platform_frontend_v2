import type { ReactNode } from "react";
import { cn } from "@/app/utils/cn";

interface LandingContainerProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "section";
}

/**
 * Shared container width for every landing section. Matches the Navbar's
 * container exactly so the page feels symmetric across breakpoints:
 *   Navbar: mx-auto max-w-[1600px] px-4 sm:px-6 md:px-8 xl:px-12 2xl:px-0
 */
const LandingContainer = ({
  children,
  className,
  as: Tag = "div",
}: LandingContainerProps) => (
  <Tag
    className={cn(
      "mx-auto w-full max-w-[1600px] px-4 sm:px-6 md:px-8 xl:px-12 2xl:px-0",
      className,
    )}
  >
    {children}
  </Tag>
);

export default LandingContainer;
