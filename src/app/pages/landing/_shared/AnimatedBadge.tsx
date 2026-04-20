import { motion } from "framer-motion";
import { cn } from "@/app/utils/cn";
import type { ReactNode } from "react";

interface AnimatedBadgeProps {
  children: ReactNode;
  icon?: ReactNode;
  tone?: "primary" | "secondary" | "mint" | "neutral";
  className?: string;
}

const TONE_STYLES: Record<NonNullable<AnimatedBadgeProps["tone"]>, string> = {
  primary:
    "border-primary/15 bg-primary/8 text-primary",
  secondary:
    "border-secondary/20 bg-secondary/10 text-secondary-dark",
  mint: "border-surface-mint-ink/15 bg-surface-mint text-surface-mint-ink",
  neutral:
    "border-grey-light/80 bg-white text-grey-medium",
};

const AnimatedBadge = ({
  children,
  icon,
  tone = "primary",
  className,
}: AnimatedBadgeProps) => (
  <motion.span
    initial={{ opacity: 0, y: -8 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    className={cn(
      "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 label-semi-bold-14 backdrop-blur-sm",
      TONE_STYLES[tone],
      className,
    )}
  >
    {icon && <span className="flex h-3.5 w-3.5 items-center justify-center">{icon}</span>}
    <span className="whitespace-nowrap">{children}</span>
  </motion.span>
);

export default AnimatedBadge;
