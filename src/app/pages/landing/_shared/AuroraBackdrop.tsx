import { motion } from "framer-motion";
import { cn } from "@/app/utils/cn";

interface AuroraBackdropProps {
  className?: string;
  variant?: "hero" | "soft" | "mono";
}

/**
 * Ambient aurora glow — absolutely positioned and purely decorative.
 * Breathes via infinite yoyo animation. Respects prefers-reduced-motion
 * because framer-motion honors it globally via our CSS.
 */
const AuroraBackdrop = ({ className, variant = "hero" }: AuroraBackdropProps) => {
  if (variant === "mono") {
    return (
      <div
        aria-hidden
        className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      >
        <div className="absolute inset-0 bg-[radial-gradient(1000px_600px_at_50%_-10%,var(--color-primary-light),transparent_60%)]" />
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {/* Fine dot grid */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, oklch(80% 0.02 250 / 0.35) 1px, transparent 0)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 90% 70% at 50% 30%, black 40%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 70% at 50% 30%, black 40%, transparent 85%)",
        }}
      />

      {/* Blue glow top-left */}
      <motion.div
        className="absolute -top-40 -left-24 h-[520px] w-[520px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(65% 0.18 245 / 0.30) 0%, transparent 65%)",
        }}
        animate={
          variant === "hero"
            ? { y: [0, 18, 0], x: [0, 8, 0], scale: [1, 1.04, 1] }
            : { opacity: [0.6, 1, 0.6] }
        }
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Orange/peach glow bottom-right */}
      <motion.div
        className="absolute bottom-[-10%] right-[-10%] h-[440px] w-[440px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(72% 0.17 55 / 0.22) 0%, transparent 65%)",
        }}
        animate={{ y: [0, -14, 0], x: [0, -10, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />

      {/* Teal/mint accent glow center */}
      {variant === "hero" && (
        <motion.div
          className="absolute top-1/3 left-1/2 h-[360px] w-[360px] -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, oklch(78% 0.14 175 / 0.18) 0%, transparent 60%)",
          }}
          animate={{ opacity: [0.45, 0.75, 0.45] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </div>
  );
};

export default AuroraBackdrop;
