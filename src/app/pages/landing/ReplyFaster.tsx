import { motion } from "framer-motion";
import { Check, MessageSquare, Inbox } from "lucide-react";
import landing from "@/app/content/json/landing.json";
import {
  AnimatedBadge,
  GradientHeadline,
  FloatingStatCard,
  LandingContainer,
} from "./_shared";

const { replyFaster } = landing;

const STAT_POSITIONS: Array<{
  tone: "primary" | "secondary" | "mint" | "neutral";
  className: string;
  delay: number;
  drift?: "sm" | "md";
}> = [
  {
    tone: "primary",
    className: "absolute -top-3 left-2 sm:left-6",
    delay: 0.2,
  },
  {
    tone: "secondary",
    className: "absolute top-20 right-0 sm:right-2",
    delay: 0.35,
    drift: "md",
  },
  {
    tone: "mint",
    className: "absolute bottom-12 left-0 sm:left-4",
    delay: 0.5,
  },
  {
    tone: "primary",
    className: "absolute -bottom-4 right-4 sm:right-10",
    delay: 0.65,
    drift: "md",
  },
];

const ReplyFaster = () => {
  return (
    <section
      aria-label="Reply faster. From anywhere."
      className="relative overflow-hidden py-24 sm:py-32"
    >
      <LandingContainer className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
        {/* Left: illustration + floating stats */}
        <div className="relative order-2 lg:order-1 lg:col-span-6">
          <ReplyIllustration />

          {/* Floating stats positioned around the illustration */}
          {replyFaster.stats.map((stat, i) => {
            const pos = STAT_POSITIONS[i];
            if (!pos) return null;
            return (
              <FloatingStatCard
                key={stat.label}
                value={stat.value}
                label={stat.label}
                tone={pos.tone}
                className={pos.className}
                delay={pos.delay}
                drift={pos.drift}
              />
            );
          })}
        </div>

        {/* Right: copy + benefits */}
        <div className="order-1 lg:order-2 lg:col-span-6 lg:pl-6">
          <AnimatedBadge
            tone="primary"
            icon={<MessageSquare className="h-3 w-3" strokeWidth={2.2} />}
            className="mb-5"
          >
            {replyFaster.eyebrow}
          </AnimatedBadge>

          <GradientHeadline
            lead={replyFaster.title}
            accent={replyFaster.titleAccent}
            as="h2"
            align="left"
          />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-5 max-w-xl body-regular-16 text-grey-medium sm:text-[17px] sm:leading-[28px]"
          >
            {replyFaster.description}
          </motion.p>

          <ul className="mt-9 space-y-5">
            {replyFaster.benefits.map((b, i) => (
              <motion.li
                key={b.title}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.45,
                  delay: 0.2 + i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex gap-4"
              >
                <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                </span>
                <div>
                  <h3 className="body-semi-bold-16 text-grey">{b.title}</h3>
                  <p className="mt-1 label-regular-14 text-grey-medium">
                    {b.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </LandingContainer>
    </section>
  );
};

/**
 * Abstract inline SVG — a stylized phone + chat bubble cluster on a gradient
 * card. Pure tokens, no external image, no generic stock vibe.
 */
const ReplyIllustration = () => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.98 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[28px] border border-grey-light/70 bg-gradient-to-br from-surface-sky via-white to-surface-lavender/60 shadow-[0_40px_80px_-40px_rgba(46,94,153,0.35)]"
  >
    {/* Grid underlay */}
    <div
      aria-hidden
      className="absolute inset-0 opacity-40"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, oklch(70% 0.04 250 / 0.25) 1px, transparent 0)",
        backgroundSize: "22px 22px",
      }}
    />

    {/* Orbital rings */}
    <motion.div
      aria-hidden
      className="absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/15"
      animate={{ rotate: 360 }}
      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
    />
    <motion.div
      aria-hidden
      className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20 border-dashed"
      animate={{ rotate: -360 }}
      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
    />

    {/* Phone mockup */}
    <div className="absolute left-1/2 top-1/2 h-[62%] w-[52%] -translate-x-1/2 -translate-y-1/2">
      <div className="relative h-full w-full rounded-[28px] border-[6px] border-grey bg-white shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)]">
        {/* Notch */}
        <div className="absolute left-1/2 top-2 h-1.5 w-14 -translate-x-1/2 rounded-full bg-grey" />

        {/* Header */}
        <div className="flex items-center gap-2 border-b border-grey-light/60 px-3 pb-2 pt-6">
          <Inbox className="h-3.5 w-3.5 text-primary" strokeWidth={2} />
          <span className="text-[10px] font-bold text-grey">Unified Inbox</span>
          <span className="ml-auto h-1.5 w-1.5 rounded-full bg-success" />
        </div>

        {/* Chat rows */}
        <div className="space-y-2 p-3">
          {[
            { name: "Priya", tint: "bg-primary/10" },
            { name: "James", tint: "bg-surface-peach" },
            { name: "Lin", tint: "bg-surface-mint" },
            { name: "Ana", tint: "bg-surface-lavender" },
          ].map((row, i) => (
            <motion.div
              key={row.name}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{
                duration: 0.4,
                delay: 0.4 + i * 0.09,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex items-center gap-2 rounded-lg bg-grey-light/30 p-1.5"
            >
              <span
                className={`h-5 w-5 flex-shrink-0 rounded-full ${row.tint}`}
              />
              <div className="flex-1 space-y-1">
                <div className="h-1 w-16 rounded-full bg-grey/20" />
                <div className="h-1 w-20 rounded-full bg-grey/10" />
              </div>
              <span className="text-[8px] text-grey-medium">2m</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

    {/* Orbiting channel chips */}
    {[
      { emoji: "💬", top: "12%", left: "8%", delay: 0.2 },
      { emoji: "📷", top: "18%", right: "10%", delay: 0.35 },
      { emoji: "✉️", bottom: "22%", left: "6%", delay: 0.5 },
      { emoji: "✈️", bottom: "14%", right: "8%", delay: 0.65 },
    ].map((c, i) => (
      <motion.div
        key={i}
        className="absolute flex h-10 w-10 items-center justify-center rounded-2xl border border-grey-light/70 bg-white/95 shadow-lg backdrop-blur-md"
        style={{
          top: c.top,
          bottom: c.bottom,
          left: c.left,
          right: c.right,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{
          duration: 0.5,
          delay: c.delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <motion.span
          className="text-base"
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: c.delay,
          }}
        >
          {c.emoji}
        </motion.span>
      </motion.div>
    ))}
  </motion.div>
);

export default ReplyFaster;
