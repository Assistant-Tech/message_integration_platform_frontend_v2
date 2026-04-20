import { motion } from "framer-motion";
import { Bell, Mic, WifiOff, Apple, Play, Smartphone } from "lucide-react";
import landing from "@/app/content/json/landing.json";
import { AnimatedBadge, SectionEyebrow, LandingContainer } from "./_shared";

const { mobileApp } = landing;

const BULLET_ICONS = [Bell, Mic, WifiOff];

const MobileApp = () => {
  return (
    <section
      aria-label="Mobile app"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      {/* Soft gradient canvas backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(900px 500px at 80% 50%, var(--color-primary-light), transparent 70%), radial-gradient(700px 400px at 20% 80%, var(--color-secondary-light), transparent 70%)",
        }}
      />

      <LandingContainer className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-center lg:gap-12">
        {/* Left: copy */}
        <div className="lg:col-span-6">
          <SectionEyebrow align="left">{mobileApp.eyebrow}</SectionEyebrow>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="mt-5 font-meri text-[32px] font-bold leading-[1.1] tracking-[-0.02em] text-grey sm:text-[48px] lg:text-[56px]"
          >
            {mobileApp.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-5 max-w-xl body-regular-16 text-grey-medium sm:text-[17px] sm:leading-[28px]"
          >
            {mobileApp.description}
          </motion.p>

          <ul className="mt-8 space-y-4">
            {mobileApp.bullets.map((line, i) => {
              const Icon = BULLET_ICONS[i % BULLET_ICONS.length] ?? Bell;
              return (
                <motion.li
                  key={line}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.4,
                    delay: 0.2 + i * 0.08,
                  }}
                  className="flex items-center gap-3 body-medium-16 text-grey"
                >
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-grey-light/70">
                    <Icon className="h-4 w-4 text-primary" strokeWidth={1.8} />
                  </span>
                  <span>{line}</span>
                </motion.li>
              );
            })}
          </ul>

          {/* Store buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <AppStoreButton
              icon={<Apple className="h-6 w-6" fill="white" strokeWidth={0} />}
              topLine="Download on the"
              bottomLine="App Store"
              href="#ios"
            />
            <AppStoreButton
              icon={<Play className="h-5 w-5" fill="white" strokeWidth={0} />}
              topLine="Get it on"
              bottomLine="Google Play"
              href="#android"
            />
          </motion.div>

          <AnimatedBadge tone="mint" className="mt-6">
            <Smartphone className="h-3 w-3" strokeWidth={2.2} /> Also works beautifully in your browser
          </AnimatedBadge>
        </div>

        {/* Right: phone mockup */}
        <div className="relative lg:col-span-6">
          <PhoneMockup />
        </div>
      </LandingContainer>
    </section>
  );
};

const AppStoreButton = ({
  icon,
  topLine,
  bottomLine,
  href,
}: {
  icon: React.ReactNode;
  topLine: string;
  bottomLine: string;
  href: string;
}) => (
  <motion.a
    href={href}
    whileHover={{ scale: 1.04, y: -3 }}
    whileTap={{ scale: 0.98 }}
    transition={{ type: "spring", stiffness: 400, damping: 30 }}
    className="inline-flex h-16 sm:h-14 items-center gap-3 rounded-xl sm:rounded-2xl bg-base-black px-4 sm:px-5 text-white shadow-[0_16px_40px_-12px_rgba(0,0,0,0.4)] border border-grey-light/10 transition-all duration-300 hover:shadow-[0_20px_50px_-16px_rgba(46,94,153,0.3)] hover:border-grey-light/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
  >
    <span className="flex h-9 w-9 sm:h-8 sm:w-8 items-center justify-center flex-shrink-0">
      {icon}
    </span>
    <span className="flex flex-col leading-tight">
      <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.12em] text-white/60 font-medium">
        {topLine}
      </span>
      <span className="text-[14px] sm:text-[15px] font-bold text-white">
        {bottomLine}
      </span>
    </span>
  </motion.a>
);

/**
 * Stylized phone — inbox list with animated incoming message + push toast.
 */
const PhoneMockup = () => (
  <motion.div
    initial={{ opacity: 0, y: 30, rotate: -3 }}
    whileInView={{ opacity: 1, y: 0, rotate: -3 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    className="relative mx-auto w-full max-w-[340px]"
  >
    {/* Phone body */}
    <div className="relative aspect-[9/18] rounded-[44px] border-[10px] border-grey bg-white shadow-[0_50px_100px_-30px_rgba(46,94,153,0.35)]">
      {/* Notch */}
      <div className="absolute left-1/2 top-3 z-10 h-1.5 w-20 -translate-x-1/2 rounded-full bg-grey" />

      {/* Screen */}
      <div className="h-full overflow-hidden rounded-[32px] bg-gradient-to-b from-primary-light/40 via-white to-white">
        {/* Status bar */}
        <div className="flex items-center justify-between px-5 pt-8 pb-2">
          <span className="text-[11px] font-semibold text-grey">9:41</span>
          <div className="flex items-center gap-1 text-grey">
            <span className="h-1.5 w-1.5 rounded-full bg-grey" />
            <span className="h-1.5 w-1.5 rounded-full bg-grey" />
            <span className="h-1.5 w-1.5 rounded-full bg-grey/40" />
          </div>
        </div>

        {/* App header */}
        <div className="flex items-center justify-between px-5 py-3">
          <div>
            <p className="caption-medium-12 text-grey-medium">Inbox</p>
            <p className="font-meri text-[20px] font-bold text-grey">
              Good morning
            </p>
          </div>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
            <span className="text-sm">🔔</span>
          </span>
        </div>

        {/* Conversation rows */}
        <div className="space-y-2 px-4">
          {[
            {
              name: "Priya Sharma",
              snippet: "Is this still available?",
              channel: "WhatsApp",
              tint: "bg-surface-mint",
              unread: true,
            },
            {
              name: "James R.",
              snippet: "Order #4521 update?",
              channel: "Instagram",
              tint: "bg-surface-peach",
              unread: true,
            },
            {
              name: "Lin Wu",
              snippet: "Thanks for the quick reply!",
              channel: "Messenger",
              tint: "bg-surface-lavender",
              unread: false,
            },
            {
              name: "Ana Costa",
              snippet: "Can I change delivery date?",
              channel: "Telegram",
              tint: "bg-surface-sky",
              unread: false,
            },
          ].map((row, i) => (
            <motion.div
              key={row.name}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{
                duration: 0.4,
                delay: 0.35 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex items-center gap-3 rounded-2xl bg-white px-3 py-2.5 shadow-sm ring-1 ring-grey-light/50"
            >
              <span
                className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${row.tint} text-sm font-semibold text-grey`}
              >
                {row.name[0]}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-[13px] font-semibold text-grey">
                    {row.name}
                  </p>
                  {row.unread && (
                    <span className="h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                  )}
                </div>
                <p className="truncate text-[11px] text-grey-medium">
                  {row.snippet}
                </p>
                <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary/70">
                  {row.channel}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

    {/* Push notification floating above */}
    <motion.div
      initial={{ opacity: 0, y: -16, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className="absolute -right-4 top-8 w-[240px] rounded-2xl border border-grey-light/70 bg-white/95 p-3 shadow-xl backdrop-blur-md sm:-right-8"
    >
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="flex items-start gap-2.5"
      >
        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-primary/15">
          <span className="text-[13px]">💬</span>
        </span>
        <div className="min-w-0">
          <p className="text-[11px] font-bold text-grey">Chatblix</p>
          <p className="truncate text-[11px] text-grey-medium">
            New DM from Priya · WhatsApp
          </p>
        </div>
      </motion.div>
    </motion.div>
  </motion.div>
);

export default MobileApp;
