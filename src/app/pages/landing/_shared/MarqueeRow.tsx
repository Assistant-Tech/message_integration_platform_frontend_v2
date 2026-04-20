import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/app/utils/cn";

interface MarqueeRowProps {
  children: ReactNode[];
  duration?: number;
  className?: string;
  reverse?: boolean;
  gap?: "sm" | "md" | "lg";
}

const GAP_CLASS: Record<NonNullable<MarqueeRowProps["gap"]>, string> = {
  sm: "gap-6",
  md: "gap-10",
  lg: "gap-14",
};

/**
 * Smooth infinite marquee. Duplicates its children twice and translates the
 * track for a seamless loop. Pause-on-hover for accessibility and legibility.
 */
const MarqueeRow = ({
  children,
  duration = 32,
  className,
  reverse = false,
  gap = "md",
}: MarqueeRowProps) => {
  const items = [...children, ...children];

  return (
    <div
      className={cn(
        "group relative overflow-hidden",
        "before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-10 before:w-16 before:bg-gradient-to-r before:from-white before:to-transparent",
        "after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:z-10 after:w-16 after:bg-gradient-to-l after:from-white after:to-transparent",
        className,
      )}
    >
      <motion.div
        className={cn("flex min-w-max items-center", GAP_CLASS[gap])}
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
        style={{ willChange: "transform" }}
      >
        {items.map((item, i) => (
          <div key={i} className="flex-shrink-0">
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default MarqueeRow;
