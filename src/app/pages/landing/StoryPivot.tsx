import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import landing from "@/app/content/json/landing.json";
import { LandingContainer } from "./_shared";

const { storyPivot } = landing;

/**
 * A quiet, high-contrast "chapter break" that sets up the pain Chatblix
 * solves. Linear-style: minimal decoration, maximal typographic confidence,
 * progress-linked color reveal on the pivot line.
 */
const StoryPivot = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });

  // Reveal highlight as user scrolls through
  const highlightOpacity = useTransform(
    scrollYProgress,
    [0, 0.45, 0.75, 1],
    [0.15, 1, 1, 1],
  );
  const highlightX = useTransform(scrollYProgress, [0, 1], ["-4%", "0%"]);

  return (
    <section
      ref={ref}
      aria-label="The problem Chatblix solves"
      className="relative isolate overflow-hidden bg-grey-light/25 py-24 sm:py-32"
    >
      {/* Subtle grid underlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, oklch(88% 0.01 250 / 0.4) 1px, transparent 1px), linear-gradient(to bottom, oklch(88% 0.01 250 / 0.4) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 90%)",
        }}
      />

      {/* Large muted quote mark */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-6 top-10 select-none font-meri text-[200px] leading-none text-primary/8 sm:text-[260px] lg:left-16"
      >
        ”
      </span>

      <LandingContainer className="relative">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="caption-medium-12 font-semibold uppercase tracking-[0.2em] text-primary"
        >
          The honest truth
        </motion.p>

        <h2 className="mt-6 font-meri text-[30px] font-bold leading-[1.15] tracking-[-0.02em] text-grey sm:text-[44px] lg:text-[56px]">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="block"
          >
            {storyPivot.problem}
          </motion.span>

          <motion.span
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.6,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-3 block text-grey-medium"
          >
            {storyPivot.tension}
          </motion.span>

          <motion.span
            style={{ opacity: highlightOpacity, x: highlightX }}
            className="mt-8 block bg-clip-text text-transparent"
          >
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(120deg, var(--color-primary) 0%, var(--color-information) 55%, var(--color-secondary) 100%)",
              }}
            >
              {storyPivot.bridge}
            </span>
          </motion.span>
        </h2>

        {/* Pivot rule */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 h-px origin-left bg-gradient-to-r from-primary/60 via-information/40 to-transparent"
        />
      </LandingContainer>
    </section>
  );
};

export default StoryPivot;
