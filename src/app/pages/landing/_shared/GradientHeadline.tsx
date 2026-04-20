import { motion } from "framer-motion";
import { cn } from "@/app/utils/cn";

interface GradientHeadlineProps {
  lead: string;
  accent?: string;
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  className?: string;
}

const SIZE_CLASSES: Record<NonNullable<GradientHeadlineProps["as"]>, string> = {
  h1: "text-[40px] leading-[44px] sm:text-[56px] sm:leading-[60px] lg:text-[72px] lg:leading-[76px] tracking-[-0.025em]",
  h2: "text-[32px] leading-[38px] sm:text-[44px] sm:leading-[48px] lg:text-[56px] lg:leading-[60px] tracking-[-0.02em]",
  h3: "text-[26px] leading-[32px] sm:text-[32px] sm:leading-[38px] lg:text-[40px] lg:leading-[44px] tracking-[-0.015em]",
};

const GradientHeadline = ({
  lead,
  accent,
  as = "h2",
  align = "center",
  className,
}: GradientHeadlineProps) => {
  const Tag = as as "h1" | "h2" | "h3";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={cn(align === "center" && "text-center", className)}
    >
      <Tag
        className={cn(
          "font-meri font-bold text-grey",
          SIZE_CLASSES[as],
        )}
      >
        <span>{lead}</span>
        {accent && (
          <>
            {" "}
            <span className="relative inline-block">
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, var(--color-primary) 0%, var(--color-information) 45%, var(--color-secondary) 100%)",
                }}
              >
                {accent}
              </span>
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-0 left-0 h-[3px] w-full origin-left rounded-full bg-gradient-to-r from-primary via-information to-secondary opacity-30"
              />
            </span>
          </>
        )}
      </Tag>
    </motion.div>
  );
};

export default GradientHeadline;
