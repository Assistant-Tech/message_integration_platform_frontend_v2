import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionStyle,
} from "framer-motion";
import {
  ArrowRight,
  PlayCircle,
  Sparkles,
  ShieldCheck,
  Zap,
  TrendingDown,
  Apple,
  Play,
  Smartphone,
} from "lucide-react";
import { Link } from "react-router-dom";
import landing from "@/app/content/json/landing.json";
import { DASHBOARD_IMAGE_URL } from "@/app/constants/image-cloudinary";
import { Button } from "@/app/components/ui";
import { cn } from "@/app/utils/cn";
import { AuroraBackdrop, LandingContainer } from "./_shared";

import fbIcon from "@/app/assets/dashboard-icons/fb.svg";
import tiktokIcon from "@/app/assets/dashboard-icons/tiktok.svg";

const { hero } = landing;

const HEADLINE_WORDS = hero.title.split(" ");
const ACCENT_WORDS = hero.titleAccent.split(" ");

const Hero = () => {
  const tiltRef = useRef<HTMLDivElement>(null);

  // Mouse-parallax tilt (capped at 6°, spring-smoothed)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], ["6deg", "-6deg"]), {
    stiffness: 120,
    damping: 16,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], ["-6deg", "6deg"]), {
    stiffness: 120,
    damping: 16,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = tiltRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const cardStyle: MotionStyle = {
    rotateX,
    rotateY,
    transformPerspective: 1200,
    transformStyle: "preserve-3d",
  };

  return (
    <section
      id="hero"
      aria-label="Chatblix hero"
      className="relative isolate overflow-hidden pt-28 pb-24 sm:pt-32 sm:pb-28 lg:pt-36 lg:pb-32"
    >
      <AuroraBackdrop />

      <LandingContainer className="relative z-10">
        {/* Partner badge — Meta + TikTok official integrations */}
        <PartnerBadge />

        {/* Headline — word-by-word reveal */}
        <h1 className="mx-auto mt-6 max-w-4xl text-center font-meri font-bold tracking-[-0.03em] text-grey">
          <span className="block text-[40px] leading-[44px] sm:text-[58px] sm:leading-[62px] lg:text-[76px] lg:leading-[80px]">
            {HEADLINE_WORDS.map((word, i) => (
              <motion.span
                key={`lead-${i}`}
                className="mr-[0.22em] inline-block"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.12 + i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {word}
              </motion.span>
            ))}
          </span>
          <span className="mt-2 block text-[40px] leading-[44px] sm:text-[58px] sm:leading-[62px] lg:text-[76px] lg:leading-[80px]">
            {ACCENT_WORDS.map((word, i) => (
              <motion.span
                key={`accent-${i}`}
                className="mr-[0.22em] inline-block bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, var(--color-primary) 0%, var(--color-information) 55%, var(--color-secondary) 100%)",
                }}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.12 + (HEADLINE_WORDS.length + i) * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.55,
            delay: 0.12 + (HEADLINE_WORDS.length + ACCENT_WORDS.length) * 0.06,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto mt-8 max-w-2xl text-center body-regular-16 text-grey-medium sm:text-[18px] sm:leading-[28px]"
        >
          {hero.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <Link to={hero.primaryCta.href} className="contents">
            <Button
              label={hero.primaryCta.label}
              variant="primary"
              size="md"
              IconRight={<ArrowRight className="h-4 w-4" strokeWidth={2.2} />}
              className="rounded-full px-6 shadow-[0_14px_30px_-10px_rgba(46,94,153,0.55)]"
            />
          </Link>

          <a href={hero.secondaryCta.href} className="contents">
            <Button
              label={hero.secondaryCta.label}
              variant="outlined"
              size="md"
              IconLeft={
                <PlayCircle
                  className="h-5 w-5 text-primary"
                  strokeWidth={1.8}
                />
              }
              className="rounded-full border-grey-light/70 bg-white/70 px-5 text-grey backdrop-blur-sm hover:border-primary/40"
            />
          </a>
        </motion.div>

        {/* Reassurance strip */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-5 flex items-center justify-center gap-2 caption-medium-12 text-grey-medium"
        >
          <ShieldCheck className="h-3.5 w-3.5 text-success" strokeWidth={2} />
          {hero.reassurance}
        </motion.p>

        {/* Mobile availability */}
        <MobileAvailabilityRow />

        {/* Dashboard preview — tilted card */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.9,
            delay: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative mx-auto mt-10 max-w-6xl sm:mt-12 lg:mt-14"
        >
          {/* Soft under-card glow */}
          <div
            aria-hidden
            className="absolute -inset-x-8 -bottom-16 -top-8 -z-10 rounded-[32px] bg-[radial-gradient(60%_60%_at_50%_50%,var(--color-primary-light),transparent_70%)] opacity-80 blur-2xl"
          />

          <div
            ref={tiltRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative"
          >
            <motion.div
              style={cardStyle}
              className="relative rounded-[22px] border border-grey-light/70 bg-white p-2 shadow-[0_40px_80px_-30px_rgba(46,94,153,0.35)] sm:p-3"
            >
              {/* Browser chrome */}
              <div className="flex items-center justify-between rounded-t-xl bg-gradient-to-b from-grey-light/40 to-grey-light/20 px-4 py-2.5">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                </div>
                <div className="hidden min-w-[240px] flex-1 items-center justify-center gap-1.5 rounded-md bg-white/70 px-3 py-1 caption-medium-12 text-grey-medium sm:flex">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" />
                  app.chatblix.com
                </div>
                <span className="caption-medium-12 text-grey-medium">
                  Live inbox
                </span>
              </div>

              {/* Dashboard image */}
              <div className="overflow-hidden rounded-b-xl rounded-t-sm bg-grey-light/15">
                <img
                  src={DASHBOARD_IMAGE_URL}
                  alt="Chatblix unified inbox dashboard preview"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  width="1600"
                  height="1000"
                  className="h-auto w-full object-cover"
                />
              </div>
            </motion.div>

            {/* Floating callout — AI activity (large, left) */}
            <AICallout />

            {/* Floating callout — live DM toast (top-right) */}
            <LiveMessageToast />

            {/* Floating callout — response time stat with sparkline (bottom-right) */}
            <ResponseTimeCallout />
          </div>
        </motion.div>
      </LandingContainer>
    </section>
  );
};

/* ──────────────────────────────────────────────────────────────────────────
 * Partner badge — small pill above headline signaling official Meta + TikTok
 * Business Partner status. Builds trust before the eye hits the headline.
 * ──────────────────────────────────────────────────────────────────────── */
const PartnerBadge = () => (
  <motion.div
    initial={{ opacity: 0, y: -8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
    className="mx-auto flex w-fit items-center gap-2 rounded-full border border-grey-light/70 bg-white/80 px-3.5 py-1.5 shadow-[0_6px_20px_-10px_rgba(46,94,153,0.25)] backdrop-blur-sm"
  >
    <span className="flex items-center -space-x-1.5">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white ring-1 ring-grey-light/70">
        <img src={fbIcon} alt="" className="h-3.5 w-3.5" aria-hidden />
      </span>
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white ring-1 ring-grey-light/70">
        <img src={tiktokIcon} alt="" className="h-3.5 w-3.5" aria-hidden />
      </span>
    </span>
    <span className="caption-medium-12 font-semibold text-grey">
      Official Meta &amp; TikTok Business Partner
    </span>
    <ShieldCheck
      className="h-3.5 w-3.5 text-success"
      strokeWidth={2.2}
      aria-hidden
    />
  </motion.div>
);

/* ──────────────────────────────────────────────────────────────────────────
 * Mobile availability row — "Also on mobile · App Store · Google Play"
 * ──────────────────────────────────────────────────────────────────────── */
const MobileAvailabilityRow = () => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 1.55, ease: [0.22, 1, 0.36, 1] }}
    className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
  >
    <span className="inline-flex items-center gap-2 rounded-full border border-grey-light/70 bg-white/70 px-3.5 py-1.5 caption-medium-12 text-grey-medium backdrop-blur-sm">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
        <Smartphone className="h-3 w-3 text-primary" strokeWidth={2.2} />
      </span>
      Also on mobile
    </span>

    <span aria-hidden className="text-grey-medium/40">
      ·
    </span>

    <a
      href="#ios"
      className="group inline-flex items-center gap-2 rounded-full border border-grey-light/70 bg-white px-3.5 py-1.5 caption-medium-12 font-semibold text-grey transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_8px_20px_-8px_rgba(46,94,153,0.25)]"
      aria-label="Download Chatblix on the App Store"
    >
      <Apple className="h-3.5 w-3.5" strokeWidth={0} fill="currentColor" />
      App Store
    </a>

    <a
      href="#android"
      className="group inline-flex items-center gap-2 rounded-full border border-grey-light/70 bg-white px-3.5 py-1.5 caption-medium-12 font-semibold text-grey transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_8px_20px_-8px_rgba(46,94,153,0.25)]"
      aria-label="Get Chatblix on Google Play"
    >
      <Play
        className="h-3 w-3 text-primary"
        strokeWidth={0}
        fill="currentColor"
      />
      Google Play
    </a>
  </motion.div>
);

/* ──────────────────────────────────────────────────────────────────────────
 * Floating callouts — three distinct, design-forward cards that orbit the
 * dashboard preview. Each has its own personality (status card, push toast,
 * stat with sparkline) so the group reads as a small product story instead
 * of repeated blocks.
 * ──────────────────────────────────────────────────────────────────────── */

/** Tiny activity-bar chart — 7 bars, stagger in + subtle idle pulse. */
const ActivityBars = ({
  heights,
  delay = 0,
}: {
  heights: number[];
  delay?: number;
}) => (
  <div className="flex h-6 items-end gap-[3px]">
    {heights.map((h, i) => (
      <motion.span
        key={i}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{
          duration: 0.45,
          delay: delay + i * 0.07,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ originY: 1, height: `${h}%` }}
        className={cn(
          "w-[5px] rounded-full",
          i === heights.length - 1
            ? "bg-gradient-to-t from-primary to-information"
            : "bg-primary/30",
        )}
      />
    ))}
  </div>
);

/** Down-trending sparkline (SVG) — reinforces "response time getting faster". */
const Sparkline = () => (
  <svg
    viewBox="0 0 80 28"
    className="h-7 w-20"
    preserveAspectRatio="none"
    aria-hidden
  >
    <defs>
      <linearGradient id="spark-fill" x1="0" x2="0" y1="0" y2="1">
        <stop
          offset="0%"
          stopColor="var(--color-secondary)"
          stopOpacity="0.35"
        />
        <stop
          offset="100%"
          stopColor="var(--color-secondary)"
          stopOpacity="0"
        />
      </linearGradient>
    </defs>
    <motion.path
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.2, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
      d="M1 6 L12 11 L22 8 L32 14 L42 12 L52 18 L62 19 L72 23 L79 22"
      fill="none"
      stroke="var(--color-secondary)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <motion.path
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 1.6 }}
      d="M1 6 L12 11 L22 8 L32 14 L42 12 L52 18 L62 19 L72 23 L79 22 L79 28 L1 28 Z"
      fill="url(#spark-fill)"
    />
    {/* End dot */}
    <motion.circle
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3, delay: 1.8 }}
      cx="79"
      cy="22"
      r="2.5"
      fill="var(--color-secondary)"
      style={{ transformOrigin: "79px 22px" }}
    />
  </svg>
);

/** AI activity status card — gradient glow, static big number, activity bars. */
const AICallout = () => (
  <motion.div
    initial={{ opacity: 0, x: -24, y: 14 }}
    animate={{ opacity: 1, x: 0, y: 0 }}
    transition={{ duration: 0.75, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
    className="pointer-events-none absolute -left-6 top-10 hidden w-[252px] md:block lg:-left-10"
  >
    <motion.div
      animate={{ y: [0, -7, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="relative overflow-hidden rounded-[20px] border border-white/70 bg-white/95 p-4 shadow-[0_28px_60px_-26px_rgba(46,94,153,0.45),0_0_0_1px_rgba(46,94,153,0.04)] backdrop-blur-2xl"
    >
      {/* Thin gradient top accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-primary via-information to-primary opacity-80"
      />
      {/* Soft corner glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(140% 100% at 0% 0%, oklch(65% 0.18 245 / 0.16), transparent 55%)",
        }}
      />

      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-information text-white shadow-[0_8px_18px_-6px_rgba(46,94,153,0.55)] ring-1 ring-white/50">
            <Sparkles className="h-4 w-4" strokeWidth={2.2} />
          </span>
          <div className="flex flex-col leading-tight">
            <span className="text-[12px] font-bold text-grey">Chatblix AI</span>
            <span className="flex items-center gap-1 text-[10px] font-medium text-grey-medium">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
              </span>
              On shift
            </span>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-success-light px-2 py-0.5 text-[10px] font-bold tracking-wide text-success-dark">
          <span className="h-1 w-1 rounded-full bg-success" />
          LIVE
        </span>
      </div>

      <div className="relative mt-4 flex items-end justify-between gap-3">
        <div>
          <div className="flex items-baseline gap-1.5">
            <motion.span
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: 1.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="bg-clip-text text-[36px] font-black leading-none tracking-[-0.03em] text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 55%, var(--color-information) 100%)",
              }}
            >
              12
            </motion.span>
            <span className="text-[13px] font-semibold text-grey-medium">
              chats
            </span>
          </div>
          <p className="mt-1 text-[11px] font-medium text-grey-medium">
            replied while you slept
          </p>
        </div>
        <ActivityBars heights={[30, 55, 42, 68, 50, 80, 95]} delay={1.3} />
      </div>
    </motion.div>
  </motion.div>
);

/** Incoming DM push toast — Priya just messaged on WhatsApp. */
const LiveMessageToast = () => (
  <motion.div
    initial={{ opacity: 0, x: 22, y: -10 }}
    animate={{ opacity: 1, x: 0, y: 0 }}
    transition={{ duration: 0.7, delay: 1.35, ease: [0.22, 1, 0.36, 1] }}
    className="pointer-events-none absolute right-0 top-24 hidden w-[260px] md:block lg:-right-8"
  >
    <motion.div
      animate={{ y: [0, -5, 0] }}
      transition={{
        duration: 4.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.4,
      }}
      className="relative overflow-hidden rounded-[20px] border border-white/70 bg-white/95 p-3.5 shadow-[0_28px_60px_-24px_rgba(46,94,153,0.4),0_0_0_1px_rgba(46,94,153,0.04)] backdrop-blur-2xl"
    >
      {/* Subtle channel-tinted top accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#25D366] via-primary to-transparent opacity-90"
      />

      <div className="flex items-start gap-3">
        {/* Avatar with glow ring */}
        <div className="relative flex-shrink-0">
          <div
            aria-hidden
            className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 blur-[3px]"
          />
          <div
            className="relative flex h-11 w-11 items-center justify-center rounded-full text-[14px] font-bold text-white ring-2 ring-white"
            style={{
              background:
                "linear-gradient(135deg, oklch(72% 0.17 55) 0%, oklch(58% 0.18 25) 100%)",
            }}
          >
            P
          </div>
          {/* Channel badge (WhatsApp) */}
          <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-[#25D366] text-[8px]">
            💬
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-[13px] font-bold text-grey">
              Priya Sharma
            </p>
            <motion.span
              animate={{ opacity: [1, 0.45, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-primary"
            >
              <span className="h-1 w-1 rounded-full bg-primary" />
              Now
            </motion.span>
          </div>
          <p className="mt-1 line-clamp-2 text-[11.5px] leading-[16px] text-grey-medium">
            Hi! Is the size M still in stock?
          </p>
          <div className="mt-2 flex items-center gap-1">
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-secondary-dark">
              VIP
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-grey-light/60 px-1.5 py-0.5 text-[9px] font-semibold text-grey-medium">
              <span className="h-1 w-1 rounded-full bg-[#25D366]" />
              WhatsApp
            </span>
          </div>
        </div>
      </div>

      {/* AI drafting footer */}
      <div className="mt-3 flex items-center justify-between gap-2 rounded-xl bg-gradient-to-r from-primary/6 via-primary/4 to-transparent px-2.5 py-1.5">
        <span className="flex items-center gap-1.5 text-[10px] font-semibold text-grey">
          <Sparkles className="h-3 w-3 text-primary" strokeWidth={2.4} />
          AI is drafting
        </span>
        <span className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -3, 0], opacity: [0.35, 1, 0.35] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
              className="h-1 w-1 rounded-full bg-primary"
            />
          ))}
        </span>
      </div>
    </motion.div>
  </motion.div>
);

/** Response-time card — big number + sparkline + trend delta pill. */
const ResponseTimeCallout = () => (
  <motion.div
    initial={{ opacity: 0, x: 24, y: 14 }}
    animate={{ opacity: 1, x: 0, y: 0 }}
    transition={{ duration: 0.75, delay: 1.55, ease: [0.22, 1, 0.36, 1] }}
    className="pointer-events-none absolute -right-6 bottom-14 hidden w-[248px] md:block lg:-right-10"
  >
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{
        duration: 5.2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1,
      }}
      className="relative overflow-hidden rounded-[20px] border border-white/70 bg-white/95 p-4 shadow-[0_28px_60px_-26px_rgba(46,94,153,0.45),0_0_0_1px_rgba(46,94,153,0.04)] backdrop-blur-2xl"
    >
      {/* Thin secondary gradient top accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-secondary to-secondary-dark opacity-80"
      />
      {/* Soft corner glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(140% 100% at 100% 100%, oklch(72% 0.17 55 / 0.2), transparent 55%)",
        }}
      />

      <div className="relative flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-secondary to-secondary-dark text-white shadow-[0_8px_18px_-6px_rgba(232,148,75,0.55)] ring-1 ring-white/50">
          <Zap className="h-4 w-4" strokeWidth={2.2} fill="white" />
        </span>
        <span className="text-[12px] font-bold text-grey">Response time</span>
        <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-success-light px-2 py-0.5 text-[10px] font-bold tracking-wide text-success-dark">
          <TrendingDown className="h-2.5 w-2.5" strokeWidth={2.8} />
          38%
        </span>
      </div>

      <div className="relative mt-3 flex items-end justify-between gap-3">
        <div>
          <div className="flex items-baseline gap-1.5">
            <motion.span
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: 1.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="bg-clip-text text-[36px] font-black leading-none tracking-[-0.03em] text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, oklch(30% 0.05 250) 0%, var(--color-grey) 100%)",
              }}
            >
              2.1
            </motion.span>
            <span className="text-[13px] font-semibold text-grey-medium">
              min
            </span>
          </div>
          <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-grey-medium">
            <span className="font-bold text-success">↓</span>
            from 3.4 min last week
          </p>
        </div>
        <Sparkline />
      </div>
    </motion.div>
  </motion.div>
);

export default Hero;
