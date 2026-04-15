import { useEffect, useRef, useState, type ReactElement } from "react";
import { motion } from "framer-motion";
import { Badge, Button } from "@/app/components/ui";
import { cn } from "@/app/utils/cn";

interface OrderStep {
  key: string;
  label: string;
  caption: string;
  Illustration: () => ReactElement;
}

const CreateIllustration = () => (
  <svg
    viewBox="0 0 320 320"
    xmlns="http://www.w3.org/2000/svg"
    className="h-full w-full"
  >
    <defs>
      <linearGradient id="cm-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#EAF1FB" />
        <stop offset="100%" stopColor="#FFFFFF" />
      </linearGradient>
      <linearGradient id="cm-cart" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#3F77BD" />
        <stop offset="100%" stopColor="#2E5E99" />
      </linearGradient>
    </defs>
    <rect width="320" height="320" fill="url(#cm-bg)" />
    <ellipse cx="160" cy="260" rx="110" ry="14" fill="#2E5E99" opacity="0.08" />
    {/* parcels */}
    <g>
      <rect x="48" y="180" width="56" height="50" rx="6" fill="#F5C68A" />
      <rect x="48" y="180" width="56" height="10" rx="3" fill="#E0A968" />
      <rect x="72" y="180" width="8" height="50" fill="#E0A968" />
      <rect x="220" y="190" width="52" height="44" rx="6" fill="#F5C68A" />
      <rect x="220" y="190" width="52" height="9" rx="3" fill="#E0A968" />
      <rect x="242" y="190" width="8" height="44" fill="#E0A968" />
    </g>
    {/* cart body */}
    <g>
      <path d="M100 110 H230 L218 178 H118 Z" fill="url(#cm-cart)" />
      <path
        d="M100 110 H230"
        stroke="#1F4373"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M88 96 L72 80 L60 80"
        stroke="#1F4373"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M88 96 L100 110"
        stroke="#1F4373"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <circle cx="132" cy="200" r="12" fill="#1F4373" />
      <circle cx="132" cy="200" r="5" fill="#FFFFFF" />
      <circle cx="206" cy="200" r="12" fill="#1F4373" />
      <circle cx="206" cy="200" r="5" fill="#FFFFFF" />
    </g>
    {/* checkmark badge */}
    <g>
      <circle cx="220" cy="100" r="22" fill="#3F77BD" />
      <path
        d="M210 100 L218 108 L232 94"
        stroke="#FFFFFF"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </g>
    {/* sparkles */}
    <g fill="#3F77BD" opacity="0.6">
      <circle cx="70" cy="140" r="3" />
      <circle cx="260" cy="150" r="4" />
      <circle cx="180" cy="60" r="3" />
    </g>
  </svg>
);

const DispatchIllustration = () => (
  <svg
    viewBox="0 0 320 320"
    xmlns="http://www.w3.org/2000/svg"
    className="h-full w-full"
  >
    <defs>
      <linearGradient id="dp-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#EAF1FB" />
        <stop offset="100%" stopColor="#FFFFFF" />
      </linearGradient>
    </defs>
    <rect width="320" height="320" fill="url(#dp-bg)" />
    {/* conveyor */}
    <rect x="20" y="220" width="280" height="22" rx="11" fill="#1F4373" />
    <g stroke="#3F77BD" strokeWidth="3" strokeLinecap="round">
      <line x1="40" y1="231" x2="60" y2="231" />
      <line x1="80" y1="231" x2="100" y2="231" />
      <line x1="120" y1="231" x2="140" y2="231" />
      <line x1="160" y1="231" x2="180" y2="231" />
      <line x1="200" y1="231" x2="220" y2="231" />
      <line x1="240" y1="231" x2="260" y2="231" />
    </g>
    {/* parcel */}
    <g>
      <rect x="110" y="120" width="120" height="100" rx="6" fill="#D89A60" />
      <rect x="110" y="120" width="120" height="20" rx="3" fill="#B97D44" />
      <rect x="160" y="120" width="20" height="100" fill="#B97D44" />
      {/* shipping label */}
      <rect x="128" y="160" width="64" height="42" rx="3" fill="#FFFFFF" />
      <line
        x1="136"
        y1="172"
        x2="184"
        y2="172"
        stroke="#1F4373"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="136"
        y1="180"
        x2="172"
        y2="180"
        stroke="#3F77BD"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* barcode */}
      <g stroke="#1F4373" strokeWidth="1.5">
        <line x1="138" y1="190" x2="138" y2="198" />
        <line x1="142" y1="190" x2="142" y2="198" />
        <line x1="146" y1="190" x2="146" y2="198" />
        <line x1="150" y1="190" x2="150" y2="198" />
        <line x1="156" y1="190" x2="156" y2="198" />
        <line x1="162" y1="190" x2="162" y2="198" />
        <line x1="168" y1="190" x2="168" y2="198" />
        <line x1="174" y1="190" x2="174" y2="198" />
        <line x1="180" y1="190" x2="180" y2="198" />
      </g>
    </g>
    {/* motion lines */}
    <g stroke="#3F77BD" strokeWidth="4" strokeLinecap="round" opacity="0.7">
      <line x1="40" y1="150" x2="80" y2="150" />
      <line x1="50" y1="170" x2="95" y2="170" />
      <line x1="35" y1="190" x2="75" y2="190" />
    </g>
  </svg>
);

const TrackIllustration = () => (
  <svg
    viewBox="0 0 320 320"
    xmlns="http://www.w3.org/2000/svg"
    className="h-full w-full"
  >
    <defs>
      <linearGradient id="tk-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#EAF1FB" />
        <stop offset="100%" stopColor="#FFFFFF" />
      </linearGradient>
    </defs>
    <rect width="320" height="320" fill="url(#tk-bg)" />
    {/* map tile */}
    <rect
      x="30"
      y="50"
      width="260"
      height="220"
      rx="16"
      fill="#FFFFFF"
      stroke="#D6E0EE"
      strokeWidth="2"
    />
    {/* roads */}
    <g stroke="#D6E0EE" strokeWidth="10" strokeLinecap="round">
      <line x1="30" y1="120" x2="290" y2="120" />
      <line x1="30" y1="200" x2="290" y2="200" />
      <line x1="100" y1="50" x2="100" y2="270" />
      <line x1="220" y1="50" x2="220" y2="270" />
    </g>
    {/* blocks */}
    <g fill="#EAF1FB">
      <rect x="40" y="60" width="50" height="50" rx="4" />
      <rect x="110" y="60" width="100" height="50" rx="4" />
      <rect x="230" y="60" width="50" height="50" rx="4" />
      <rect x="40" y="130" width="50" height="60" rx="4" />
      <rect x="230" y="210" width="50" height="50" rx="4" />
    </g>
    {/* dashed route */}
    <path
      d="M70 240 Q70 180 130 180 T210 130 T270 80"
      fill="none"
      stroke="#3F77BD"
      strokeWidth="4"
      strokeLinecap="round"
      strokeDasharray="2 8"
    />
    {/* origin pin */}
    <g>
      <circle cx="70" cy="240" r="8" fill="#3F77BD" />
      <circle cx="70" cy="240" r="3" fill="#FFFFFF" />
    </g>
    {/* destination pin */}
    <g>
      <path
        d="M270 60 C282 60 290 70 290 82 C290 96 270 116 270 116 C270 116 250 96 250 82 C250 70 258 60 270 60 Z"
        fill="#2E5E99"
      />
      <circle cx="270" cy="82" r="7" fill="#FFFFFF" />
    </g>
    {/* truck */}
    <g>
      <rect x="158" y="158" width="34" height="22" rx="3" fill="#3F77BD" />
      <rect x="186" y="164" width="18" height="16" rx="2" fill="#1F4373" />
      <rect x="190" y="167" width="10" height="7" rx="1" fill="#EAF1FB" />
      <circle cx="168" cy="184" r="5" fill="#1F4373" />
      <circle cx="195" cy="184" r="5" fill="#1F4373" />
    </g>
  </svg>
);

const STEPS: OrderStep[] = [
  {
    key: "create",
    label: "Create your order",
    caption:
      "Build orders in seconds — pick products, set quantities, and confirm.",
    Illustration: CreateIllustration,
  },
  {
    key: "dispatch",
    label: "Dispatch your order",
    caption: "Hand-off is automated — packed, labeled, and on the way.",
    Illustration: DispatchIllustration,
  },
  {
    key: "track",
    label: "Track your order",
    caption: "Live status, ETA, and delivery confirmation in one view.",
    Illustration: TrackIllustration,
  },
];

const ROTATION_MS = 4000;
const TRANSITION_S = 0.45;
const TRANSITION_EASE = [0.22, 0.9, 0.3, 1] as const;

const OrderManagement = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prevIndex = useRef(0);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      prevIndex.current = activeIndex;
      setActiveIndex((curr) => (curr + 1) % STEPS.length);
    }, ROTATION_MS);
    return () => clearInterval(id);
  }, [activeIndex, isPaused]);

  const goTo = (index: number) => {
    prevIndex.current = activeIndex;
    setActiveIndex(index);
  };

  return (
    <section
      id="order-management"
      className="relative scroll-mt-24 overflow-hidden py-20 sm:py-24"
      aria-labelledby="order-mgmt-heading"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/3 h-72 w-72 rounded-full"
      />
      <div className="relative mx-auto grid w-full items-center gap-12 px-4 lg:grid-cols-2 lg:gap-20">
        {/* ── Left: Visual carousel ──────────────────────────────────── */}
        <div
          className="order-2 w-full lg:order-1"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <StepTimeline
            steps={STEPS}
            activeIndex={activeIndex}
            onSelect={goTo}
          />

          <div
            className="relative mx-auto mt-8 flex h-[300px] w-full items-center justify-center overflow-hidden sm:h-[380px] lg:h-[440px]"
            aria-live="polite"
          >
            {STEPS.map((step, index) => {
              const offset =
                ((index - activeIndex + STEPS.length) % STEPS.length) - 1;
              const isActive = offset === 0;
              const { Illustration } = step;

              return (
                <motion.figure
                  key={step.key}
                  className="absolute aspect-square w-[220px] overflow-hidden rounded-3xl border border-grey-light/60 bg-white shadow-xl sm:w-[300px] lg:w-[340px]"
                  initial={false}
                  animate={{
                    x: offset * 110,
                    scale: isActive ? 1 : 0.82,
                    opacity: Math.abs(offset) > 1 ? 0 : isActive ? 1 : 0.4,
                    zIndex: isActive ? 30 : 10 - Math.abs(offset),
                    rotate: offset * -3,
                  }}
                  transition={{ duration: TRANSITION_S, ease: TRANSITION_EASE }}
                  aria-hidden={!isActive}
                >
                  <Illustration />
                  {!isActive && (
                    <div className="pointer-events-none absolute inset-0 bg-grey/40 backdrop-blur-[1px]" />
                  )}
                  {isActive && (
                    <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-grey/90 via-grey/60 to-transparent px-4 py-3 text-white">
                      <span className="text-xs font-semibold uppercase tracking-wide opacity-80">
                        Step {index + 1}
                      </span>
                      <span className="text-sm font-semibold">
                        {step.label}
                      </span>
                    </figcaption>
                  )}
                </motion.figure>
              );
            })}
          </div>
        </div>

        {/* ── Right: Copy + CTA ─────────────────────────────────────── */}
        <div className="order-1 lg:order-2">
          <Badge title="MANAGE YOUR ORDERS" textStyle="body-italic-bold-16" />
          <h2 id="order-mgmt-heading" className="h2-bold-40 mt-4 text-grey">
            Track and Manage <span className="text-primary">Your Orders</span>
          </h2>
          <p className="h4-regular-24 mt-4 text-grey-medium">
            Stay on top of your operations with intuitive tools. Monitor, track,
            and streamline every order from cart to doorstep.
          </p>

          <ul className="mt-6 space-y-3">
            {STEPS.map((step, index) => {
              const isActive = index === activeIndex;
              const isDone = index < activeIndex;
              return (
                <li
                  key={step.key}
                  onClick={() => goTo(index)}
                  className={cn(
                    "flex cursor-pointer items-start gap-3 rounded-xl border border-transparent p-2 transition-colors duration-[450ms]",
                    isActive && "border-grey-light bg-primary-light/30",
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors duration-[450ms]",
                      isActive || isDone
                        ? "bg-primary text-white"
                        : "bg-grey-light text-grey-medium",
                    )}
                  >
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-grey">
                      {step.label}
                    </p>
                    <p className="text-xs text-grey-medium">{step.caption}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button
              label="Start Free Trial"
              variant="primary"
              className="px-4 py-2"
            />
            <Button
              label="Book a Demo"
              variant="outlined"
              className="px-4 py-2"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderManagement;

/* ─── Sub-components ────────────────────────────────────────────────── */

interface StepTimelineProps {
  steps: OrderStep[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

const StepTimeline = ({ steps, activeIndex, onSelect }: StepTimelineProps) => (
  <div
    role="tablist"
    aria-label="Order management steps"
    className="relative flex w-full items-start justify-between"
  >
    {steps.map((step, index) => {
      const isActive = index === activeIndex;
      const isDone = index < activeIndex;
      return (
        <button
          key={step.key}
          type="button"
          role="tab"
          aria-selected={isActive}
          onClick={() => onSelect(index)}
          className="group relative flex w-full flex-col items-center focus:outline-none"
        >
          {index < steps.length - 1 && (
            <span className="pointer-events-none absolute left-1/2 top-[7px] h-0.5 w-full -translate-y-1/2 overflow-hidden bg-grey-light">
              <motion.span
                initial={false}
                animate={{ width: isDone ? "100%" : "0%" }}
                transition={{ duration: TRANSITION_S, ease: TRANSITION_EASE }}
                className="block h-full bg-primary"
              />
            </span>
          )}

          <motion.span
            initial={false}
            animate={{
              backgroundColor: isDone || isActive ? "#2E5E99" : "#e3e3e3",
              scale: isActive ? 1.35 : 1,
            }}
            transition={{ duration: TRANSITION_S, ease: TRANSITION_EASE }}
            className="relative z-10 h-3.5 w-3.5 rounded-full ring-4 ring-base-white"
          />
          <span
            className={cn(
              "mt-2 text-center text-xs font-medium transition-colors duration-[450ms] sm:text-sm",
              isActive
                ? "text-primary"
                : "text-grey-medium group-hover:text-grey",
            )}
          >
            {step.label}
          </span>
        </button>
      );
    })}
  </div>
);
