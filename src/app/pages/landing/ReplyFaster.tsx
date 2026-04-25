import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Bell,
  BarChart3,
  Check,
  MessageSquare,
  Search,
  Settings as SettingsIcon,
  Sparkles,
  Star,
  Users as UsersIcon,
} from "lucide-react";
import landing from "@/app/content/json/landing.json";
import {
  SectionEyebrow,
  GradientHeadline,
  FloatingStatCard,
  LandingContainer,
} from "./_shared";

import whatsappIcon from "@/app/assets/dashboard-icons/whatsapp.svg";
import instaIcon from "@/app/assets/dashboard-icons/insta.svg";
import fbIcon from "@/app/assets/dashboard-icons/fb.svg";
import telegramIcon from "@/app/assets/dashboard-icons/telegram.svg";

const { replyFaster } = landing;

const STAT_POSITIONS: Array<{
  tone: "primary" | "secondary" | "mint" | "neutral";
  className: string;
  delay: number;
  drift?: "sm" | "md";
}> = [
  {
    tone: "primary",
    className: "absolute -top-3 left-0 sm:-left-4",
    delay: 0.2,
  },
  {
    tone: "secondary",
    className: "absolute -bottom-4 right-0 sm:-right-4",
    delay: 0.5,
    drift: "md",
  },
];

const ReplyFaster = () => {
  return (
    <section
      aria-label="Reply faster. From anywhere."
      className="relative overflow-hidden py-28 sm:py-36"
    >
      <LandingContainer className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
        {/* Left: illustration + floating stats */}
        <div className="relative order-2 lg:order-1 lg:col-span-6">
          <ReplyIllustration />

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
          <SectionEyebrow align="left" className="mb-5">
            {replyFaster.eyebrow}
          </SectionEyebrow>

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

/* ──────────────────────────────────────────────────────────────────────────
 * ReplyIllustration — faithful Chatblix inbox mockup inside a phone frame,
 * with a rotating "new message" toast that cycles across channels and an
 * AI-reply confirmation, mirroring the real product flow.
 * ──────────────────────────────────────────────────────────────────────── */

interface InboxRow {
  name: string;
  avatar: string; // tint classname
  snippet: string;
  time: string;
  channelIcon: string;
  channelDot: string;
  vip?: boolean;
  unread?: number;
  assigned?: string;
}

const INBOX_ROWS: InboxRow[] = [
  {
    name: "Anjali Tamang",
    avatar: "bg-surface-peach",
    snippet: "Dai, can I get this delivered to Pokhara by tom…",
    time: "5m",
    channelIcon: whatsappIcon,
    channelDot: "#25D366",
    vip: true,
    unread: 2,
  },
  {
    name: "Sujan Shrestha",
    avatar: "bg-surface-mint",
    snippet: "Esewa gardiye hai check garnu ta. Thanks!",
    time: "18m",
    channelIcon: instaIcon,
    channelDot: "#E1306C",
    assigned: "Aayush (Support)",
  },
  {
    name: "Binod Chaudhary",
    avatar: "bg-surface-lavender",
    snippet: "Size chart pathaidinu na please.",
    time: "26m",
    channelIcon: fbIcon,
    channelDot: "#0084FF",
    unread: 1,
  },
  {
    name: "Prakriti Bhattarai",
    avatar: "bg-surface-sky",
    snippet: "Do you have any outlet in Baneshwor? Ki onlin…",
    time: "48m",
    channelIcon: telegramIcon,
    channelDot: "#229ED9",
    vip: true,
    unread: 3,
  },
];

const INCOMING_CYCLE: Array<{
  name: string;
  channel: string;
  channelIcon: string;
  channelDot: string;
  message: string;
}> = [
  {
    name: "Priya Sharma",
    channel: "WhatsApp",
    channelIcon: whatsappIcon,
    channelDot: "#25D366",
    message: "Hi! Is size M still in stock?",
  },
  {
    name: "James R.",
    channel: "Instagram",
    channelIcon: instaIcon,
    channelDot: "#E1306C",
    message: "Can I change my order address?",
  },
  {
    name: "Lin Wu",
    channel: "Messenger",
    channelIcon: fbIcon,
    channelDot: "#0084FF",
    message: "What's your return policy?",
  },
  {
    name: "Ana Costa",
    channel: "Telegram",
    channelIcon: telegramIcon,
    channelDot: "#229ED9",
    message: "Do you ship to Pokhara?",
  },
];

const ReplyIllustration = () => {
  const [cycleIndex, setCycleIndex] = useState(0);
  const [phase, setPhase] = useState<"incoming" | "replying" | "idle">("idle");

  useEffect(() => {
    let incomingTimer: number | undefined;
    let replyTimer: number | undefined;
    let advanceTimer: number | undefined;

    incomingTimer = window.setTimeout(() => setPhase("incoming"), 600);
    replyTimer = window.setTimeout(() => setPhase("replying"), 3200);
    advanceTimer = window.setTimeout(() => {
      setPhase("idle");
      setCycleIndex((i) => (i + 1) % INCOMING_CYCLE.length);
    }, 5200);

    return () => {
      if (incomingTimer) window.clearTimeout(incomingTimer);
      if (replyTimer) window.clearTimeout(replyTimer);
      if (advanceTimer) window.clearTimeout(advanceTimer);
    };
  }, [cycleIndex]);

  const current = INCOMING_CYCLE[cycleIndex] ?? INCOMING_CYCLE[0]!;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-[380px]"
    >
      {/* Phone body */}
      <div className="relative aspect-[9/18] rounded-[42px] border-[10px] border-grey bg-white shadow-[0_40px_80px_-30px_rgba(46,94,153,0.35)]">
        {/* Notch */}
        <div className="absolute left-1/2 top-2.5 z-10 h-1.5 w-20 -translate-x-1/2 rounded-full bg-grey" />

        {/* Screen */}
        <div className="relative flex h-full flex-col overflow-hidden rounded-[32px] bg-white">
          {/* Status bar */}
          <div className="flex items-center justify-between px-5 pt-7 pb-1">
            <span className="text-[11px] font-semibold text-grey">6:21</span>
            <div className="flex items-center gap-1 text-grey/80">
              <span className="h-1.5 w-1.5 rounded-full bg-grey" />
              <span className="h-1.5 w-1.5 rounded-full bg-grey" />
              <span className="h-1.5 w-1.5 rounded-full bg-grey/40" />
            </div>
          </div>

          {/* App header */}
          <div className="flex items-center justify-between border-b border-grey-light/60 px-4 py-2.5">
            <span className="font-meri text-[14px] font-bold tracking-tight text-grey">
              CHATBLIX
            </span>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full text-grey">
                <Bell className="h-3.5 w-3.5" strokeWidth={2} />
              </span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-[10px] font-bold text-primary">
                A
              </span>
            </div>
          </div>

          {/* Search + Manage */}
          <div className="flex items-center gap-2 px-3 pt-2.5">
            <div className="flex h-8 flex-1 items-center gap-1.5 rounded-xl border border-grey-light/70 bg-grey-light/30 px-2.5">
              <Search className="h-3 w-3 text-grey-medium" strokeWidth={2} />
              <span className="text-[10px] text-grey-medium">
                Search conversations…
              </span>
            </div>
            <button className="rounded-xl border border-grey-light/70 bg-white px-2.5 py-1 text-[10px] font-semibold text-grey">
              Manage
            </button>
          </div>

          {/* Filter chips */}
          <div className="flex items-center gap-1.5 px-3 pb-2 pt-2">
            {["All", "Unread", "Priority", "Assigned"].map((chip, i) => {
              const active = i === 0;
              return (
                <span
                  key={chip}
                  className={
                    active
                      ? "rounded-full bg-primary px-2.5 py-0.5 text-[9px] font-bold text-white"
                      : "rounded-full bg-primary/10 px-2.5 py-0.5 text-[9px] font-semibold text-primary"
                  }
                >
                  {chip}
                </span>
              );
            })}
          </div>

          {/* Conversation list */}
          <div className="flex-1 divide-y divide-grey-light/40 overflow-hidden">
            {INBOX_ROWS.map((row, i) => (
              <motion.div
                key={row.name}
                initial={{ opacity: 0, x: -6 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{
                  duration: 0.35,
                  delay: 0.35 + i * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex items-start gap-2.5 px-3 py-2"
              >
                <div className="relative flex-shrink-0">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${row.avatar} text-[11px] font-bold text-grey`}
                  >
                    {row.name[0]}
                  </span>
                  <span
                    className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-white"
                    style={{ backgroundColor: row.channelDot }}
                    aria-label={`via channel dot ${row.channelDot}`}
                  >
                    <img
                      src={row.channelIcon}
                      alt=""
                      className="h-2 w-2"
                      aria-hidden
                    />
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-1">
                      {row.vip && (
                        <Star
                          className="h-3 w-3 flex-shrink-0 text-[#F5C518]"
                          strokeWidth={2}
                          fill="#F5C518"
                          aria-hidden
                        />
                      )}
                      <p className="truncate text-[11.5px] font-bold text-grey">
                        {row.name}
                      </p>
                    </div>
                    <span className="flex-shrink-0 text-[9px] font-semibold text-primary">
                      {row.time}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-[10px] leading-tight text-grey-medium">
                    {row.snippet}
                  </p>
                  {row.assigned && (
                    <span className="mt-1 inline-block rounded-full bg-primary/10 px-1.5 py-0.5 text-[8px] font-semibold text-primary">
                      {row.assigned}
                    </span>
                  )}
                </div>

                {row.unread && (
                  <span className="mt-1 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-white">
                    {row.unread}
                  </span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Bottom nav */}
          <div className="flex items-center justify-around border-t border-grey-light/60 bg-white/90 px-2 py-2 backdrop-blur">
            {[
              { icon: MessageSquare, label: "Inbox", active: true },
              { icon: UsersIcon, label: "Contacts" },
              { icon: BarChart3, label: "Analytics" },
              { icon: SettingsIcon, label: "Settings" },
            ].map(({ icon: Icon, label, active }) => (
              <div
                key={label}
                className={`flex flex-col items-center gap-0.5 ${
                  active ? "text-primary" : "text-grey-medium"
                }`}
              >
                <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                <span className="text-[8px] font-semibold">{label}</span>
              </div>
            ))}
          </div>

          {/* Home indicator */}
          <div className="flex justify-center pb-1.5 pt-1">
            <span className="h-1 w-20 rounded-full bg-grey" />
          </div>
        </div>
      </div>

      {/* Incoming message toast — rotates across channels */}
      <AnimatePresence mode="wait">
        {phase !== "idle" && (
          <motion.div
            key={`incoming-${cycleIndex}`}
            initial={{ opacity: 0, y: -16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.92 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute -right-4 top-24 hidden w-[240px] rounded-2xl border border-grey-light/70 bg-white/95 p-3 shadow-[0_24px_50px_-18px_rgba(46,94,153,0.4)] backdrop-blur-md sm:block sm:-right-10"
          >
            <div className="flex items-start gap-2.5">
              <span
                className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${current.channelDot}22` }}
              >
                <img
                  src={current.channelIcon}
                  alt=""
                  className="h-4 w-4"
                  aria-hidden
                />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="truncate text-[11px] font-bold text-grey">
                    {current.name}
                  </p>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-primary">
                    Now
                  </span>
                </div>
                <p className="mt-0.5 line-clamp-2 text-[10.5px] leading-tight text-grey-medium">
                  {current.message}
                </p>
                <p className="mt-1 text-[8.5px] font-semibold uppercase tracking-wide text-grey-medium">
                  via {current.channel}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI reply confirmation toast — appears during replying phase */}
      <AnimatePresence mode="wait">
        {phase === "replying" && (
          <motion.div
            key={`reply-${cycleIndex}`}
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.92 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute -left-4 bottom-28 hidden w-[220px] rounded-2xl border border-primary/30 bg-gradient-to-br from-primary to-information p-3 text-white shadow-[0_24px_50px_-18px_rgba(46,94,153,0.45)] sm:block sm:-left-10"
          >
            <div className="flex items-start gap-2.5">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-xl bg-white/20">
                <Sparkles className="h-3.5 w-3.5" strokeWidth={2.2} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[10.5px] font-bold uppercase tracking-wider text-white/90">
                  Chatblix AI
                </p>
                <p className="mt-0.5 text-[10.5px] leading-tight text-white">
                  Replied in 1.8s — handed off to your team for review.
                </p>
                <span className="mt-1 flex items-center gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{
                        duration: 1.1,
                        repeat: Infinity,
                        delay: i * 0.15,
                      }}
                      className="h-1 w-1 rounded-full bg-white"
                    />
                  ))}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ReplyFaster;
