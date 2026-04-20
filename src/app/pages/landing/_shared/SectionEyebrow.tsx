import { motion } from "framer-motion";
import { cn } from "@/app/utils/cn";

interface SectionEyebrowProps {
  children: string;
  align?: "left" | "center";
  className?: string;
}

const SectionEyebrow = ({
  children,
  align = "center",
  className,
}: SectionEyebrowProps) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    className={cn(
      "flex items-center gap-3",
      align === "center" && "justify-center",
      className,
    )}
  >
    <span className="h-px w-10 bg-gradient-to-r from-transparent via-primary/50 to-primary/50" />
    <span className="caption-medium-12 font-semibold uppercase tracking-[0.18em] text-primary">
      {children}
    </span>
    <span className="h-px w-10 bg-gradient-to-l from-transparent via-primary/50 to-primary/50" />
  </motion.div>
);

export default SectionEyebrow;
