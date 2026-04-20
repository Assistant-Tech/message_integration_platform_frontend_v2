import { motion } from "framer-motion";
import { cn } from "@/app/utils/cn";

export interface FloatingStatCardProps {
  value: string;
  label: string;
  delay?: number;
  className?: string;
  tone?: "primary" | "secondary" | "mint" | "neutral";
  drift?: "sm" | "md";
}

const TONE: Record<
  NonNullable<FloatingStatCardProps["tone"]>,
  { border: string; dot: string; glow: string }
> = {
  primary: {
    border: "border-primary/20",
    dot: "bg-primary",
    glow: "shadow-[0_20px_40px_-20px_rgba(46,94,153,0.35)]",
  },
  secondary: {
    border: "border-secondary/25",
    dot: "bg-secondary",
    glow: "shadow-[0_20px_40px_-20px_rgba(232,148,75,0.35)]",
  },
  mint: {
    border: "border-surface-mint-ink/25",
    dot: "bg-surface-mint-ink",
    glow: "shadow-[0_20px_40px_-20px_rgba(28,180,150,0.3)]",
  },
  neutral: {
    border: "border-grey-light",
    dot: "bg-grey-medium",
    glow: "shadow-[0_20px_40px_-20px_rgba(0,0,0,0.15)]",
  },
};

/**
 * Amplitude pair for [y (px), rotate (deg)]. Small values feel "alive"; big
 * values feel unstable. We keep them gentle so the cards read as buoyant
 * rather than twitchy.
 */
const DRIFT: Record<
  NonNullable<FloatingStatCardProps["drift"]>,
  { y: number; r: number; duration: number }
> = {
  sm: { y: 4, r: 0.4, duration: 6.5 },
  md: { y: 7, r: 0.6, duration: 7.5 },
};

const FloatingStatCard = ({
  value,
  label,
  delay = 0,
  className,
  tone = "primary",
  drift = "sm",
}: FloatingStatCardProps) => {
  const { border, dot, glow } = TONE[tone];
  const { y, r, duration } = DRIFT[drift];

  // Phase-offset the idle loop with the intro delay so no two cards move
  // in lockstep. `repeatType: "mirror"` removes the hard keyframe snap.
  const introDuration = 0.55;
  const idleStart = delay + introDuration;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        // Spring = smoother landing than ease curves
        type: "spring",
        stiffness: 180,
        damping: 22,
        mass: 0.7,
        delay,
        opacity: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay },
      }}
      className={cn(
        "pointer-events-none select-none rounded-2xl border bg-white/92 px-4 py-3 backdrop-blur-md",
        border,
        glow,
        className,
      )}
      style={{ willChange: "transform, opacity" }}
    >
      {/* Idle float layer — starts AFTER intro completes, oscillates gently */}
      <motion.div
        animate={{ y: [0, -y, 0], rotate: [0, r, 0] }}
        transition={{
          duration,
          repeat: Infinity,
          repeatType: "mirror",
          // Sine-like easing (CSS cubic bezier approximation of sin)
          ease: [0.45, 0.05, 0.55, 0.95],
          delay: idleStart,
        }}
        className="flex items-center gap-3"
        style={{ willChange: "transform" }}
      >
        <span
          className={cn(
            "h-2 w-2 flex-shrink-0 rounded-full ring-4 ring-white",
            dot,
          )}
        />
        <div className="min-w-0">
          <div className="text-[20px] font-bold leading-tight text-grey">
            {value}
          </div>
          <div className="caption-medium-12 text-grey-medium whitespace-nowrap">
            {label}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FloatingStatCard;
