import { motion } from "framer-motion";
import {
  Sparkles,
  Route,
  Tags,
  Users,
  LineChart,
  Share2,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";
import landing from "@/app/content/json/landing.json";
import { cn } from "@/app/utils/cn";
import {
  AnimatedBadge,
  GradientHeadline,
  SectionEyebrow,
  LandingContainer,
} from "./_shared";

const { aiSupercharge } = landing;

const ICON_MAP: Record<string, LucideIcon> = {
  Sparkles,
  Route,
  Tags,
  Users,
  LineChart,
  Share2,
};

type Tint = "sky" | "mint" | "peach" | "lavender";

const TINT_STYLES: Record<Tint, { bg: string; ink: string; glow: string }> = {
  sky: {
    bg: "bg-surface-sky",
    ink: "text-surface-sky-ink",
    glow: "shadow-[0_30px_60px_-30px_oklch(65%_0.18_245/0.35)]",
  },
  mint: {
    bg: "bg-surface-mint",
    ink: "text-surface-mint-ink",
    glow: "shadow-[0_30px_60px_-30px_oklch(65%_0.14_175/0.35)]",
  },
  peach: {
    bg: "bg-surface-peach",
    ink: "text-surface-peach-ink",
    glow: "shadow-[0_30px_60px_-30px_oklch(72%_0.17_55/0.35)]",
  },
  lavender: {
    bg: "bg-surface-lavender",
    ink: "text-surface-lavender-ink",
    glow: "shadow-[0_30px_60px_-30px_oklch(65%_0.15_295/0.35)]",
  },
};

const AISupercharge = () => {
  return (
    <section
      aria-label="AI features"
      className="relative overflow-hidden py-28 sm:py-36"
    >
      <LandingContainer>
        <SectionEyebrow>{aiSupercharge.eyebrow}</SectionEyebrow>

        <div className="mt-5">
          <GradientHeadline
            lead={aiSupercharge.title}
            accent={aiSupercharge.titleAccent}
            as="h2"
          />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mx-auto mt-5 max-w-2xl text-center body-regular-16 text-grey-medium sm:text-[17px] sm:leading-[28px]"
        >
          {aiSupercharge.description}
        </motion.p>

        {/* Wide hero card with AI conversation mock */}
        <AIConversationCard
          customerMessage={aiSupercharge.heroMockup.customerMessage}
          aiTyping={aiSupercharge.heroMockup.aiTyping}
          aiReply={aiSupercharge.heroMockup.aiReply}
        />

        {/* Feature grid: 1 → 2 → 4 columns (tight focused set) */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {aiSupercharge.features.map((f, i) => {
            const Icon = ICON_MAP[f.icon] ?? Sparkles;
            const tint = (f.tint as Tint) in TINT_STYLES ? (f.tint as Tint) : "sky";
            const style = TINT_STYLES[tint];

            return (
              <motion.article
                key={f.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -4 }}
                className={cn(
                  "group relative overflow-hidden rounded-3xl border border-white/80 p-6 transition-shadow duration-300 hover:shadow-xl",
                  style.bg,
                  style.glow,
                )}
              >
                {/* Subtle inner gradient */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent opacity-60"
                />

                <div className="relative flex h-full flex-col">
                  <span
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-2xl bg-white/80 shadow-sm ring-1 ring-white/80 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110",
                      style.ink,
                    )}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>

                  <h3 className="mt-6 body-semi-bold-16 text-grey sm:text-[18px]">
                    {f.title}
                  </h3>
                  <p className="mt-2 label-regular-14 text-grey-medium">
                    {f.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </LandingContainer>
    </section>
  );
};

interface AIConversationCardProps {
  customerMessage: string;
  aiTyping: string;
  aiReply: string;
}

const AIConversationCard = ({
  customerMessage,
  aiTyping,
  aiReply,
}: AIConversationCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    className="relative mt-12 overflow-hidden rounded-3xl border border-grey-light/60 bg-gradient-to-br from-primary-light/50 via-white to-secondary-light/40 p-6 sm:p-10 shadow-[0_40px_80px_-40px_rgba(46,94,153,0.35)]"
  >
    <AnimatedBadge
      tone="primary"
      icon={<Sparkles className="h-3 w-3" strokeWidth={2.2} />}
      className="mb-6"
    >
      AI on shift · replying now
    </AnimatedBadge>

    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
      {/* Left: copy */}
      <div>
        <h3 className="font-meri text-[28px] font-bold leading-[1.15] tracking-[-0.02em] text-grey sm:text-[36px]">
          Hired. Onboarded. Never calls in sick.
        </h3>
        <p className="mt-4 body-regular-16 text-grey-medium">
          Chatblix AI answers first-touch DMs, qualifies leads, and hands off
          to a human only when it matters. Trained on your brand voice in
          under ten minutes.
        </p>

        <ul className="mt-6 space-y-2.5">
          {[
            "Drafts replies your team can approve in one tap",
            "Responds instantly, 24/7 — no training period",
            "Flags uncertainty before guessing",
          ].map((line) => (
            <li
              key={line}
              className="flex items-start gap-2 label-regular-14 text-grey"
            >
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Right: chat mock */}
      <div className="relative mx-auto w-full max-w-md">
        <div className="space-y-3 rounded-2xl border border-grey-light/70 bg-white/90 p-5 backdrop-blur-md shadow-[0_18px_40px_-18px_rgba(46,94,153,0.35)]">
          {/* Customer bubble */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.45, delay: 0.35 }}
            className="flex gap-2.5"
          >
            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-surface-peach text-surface-peach-ink">
              <MessageCircle className="h-4 w-4" strokeWidth={2} />
            </span>
            <div className="flex-1 rounded-2xl rounded-tl-sm bg-grey-light/50 px-3.5 py-2">
              <p className="caption-medium-12 font-semibold text-grey">
                Customer · WhatsApp
              </p>
              <p className="mt-0.5 label-regular-14 text-grey">
                {customerMessage}
              </p>
            </div>
          </motion.div>

          {/* AI typing bubble → reply */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.45, delay: 0.85 }}
            className="flex flex-row-reverse gap-2.5"
          >
            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/15">
              <Sparkles
                className="h-4 w-4 text-primary"
                strokeWidth={2}
              />
            </span>
            <div className="flex-1 rounded-2xl rounded-tr-sm bg-gradient-to-br from-primary to-information px-3.5 py-2 text-white shadow-md">
              <p className="caption-medium-12 font-semibold text-white/80">
                Chatblix AI · {aiTyping}
              </p>
              <TypingReply text={aiReply} />
            </div>
          </motion.div>

          {/* Hand-off hint */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.45, delay: 2 }}
            className="flex items-center gap-2 rounded-xl border border-dashed border-primary/30 bg-primary/5 px-3 py-2"
          >
            <Users
              className="h-3.5 w-3.5 text-primary"
              strokeWidth={2}
            />
            <p className="caption-medium-12 text-grey-medium">
              Unsure? Hands off to a human in one tap.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  </motion.div>
);

/**
 * Simulated typing animation — reveals reply character-by-character on mount.
 */
const TypingReply = ({ text }: { text: string }) => (
  <p className="mt-0.5 label-regular-14 text-white">
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.3, delay: 1.2 }}
    >
      {text}
    </motion.span>
  </p>
);

export default AISupercharge;
