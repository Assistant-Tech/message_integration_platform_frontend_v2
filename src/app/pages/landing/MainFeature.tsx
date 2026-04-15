import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/app/components/ui";
import { featureCards } from "@/app/utils/utils";
import { cn } from "@/app/utils/cn";
import { Container } from "@/app/components/layout";

interface FeatureAccent {
  iconBg: string;
  iconText: string;
  ring: string;
  glow: string;
  badge: string;
  underline: string;
}

const ACCENTS: FeatureAccent[] = [
  {
    iconBg: "bg-primary-light",
    iconText: "text-primary",
    ring: "ring-primary/15",
    glow: "group-hover:shadow-primary/20",
    badge: "text-primary/80",
    underline: "bg-primary",
  },
  {
    iconBg: "bg-success-light",
    iconText: "text-success-dark",
    ring: "ring-success/15",
    glow: "group-hover:shadow-success/20",
    badge: "text-success-dark/80",
    underline: "bg-success",
  },
  {
    iconBg: "bg-warning-light",
    iconText: "text-warning-dark",
    ring: "ring-warning/15",
    glow: "group-hover:shadow-warning/20",
    badge: "text-warning-dark/80",
    underline: "bg-warning",
  },
  {
    iconBg: "bg-information-light",
    iconText: "text-information",
    ring: "ring-information/15",
    glow: "group-hover:shadow-information/20",
    badge: "text-information/80",
    underline: "bg-information",
  },
];

const MainFeature = () => {
  const cards = featureCards.slice(0, 4);

  return (
    <section
      id="feature"
      className="relative scroll-mt-24 py-20 sm:py-24"
      aria-labelledby="feature-heading"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
      />
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] xl:gap-20">
          {/* Heading */}
          <header className="text-center lg:sticky lg:top-24 lg:text-left">
            <div className="flex justify-center lg:justify-start">
              <Badge
                title="USE IT ANYWHERE, ANYTIME"
                textStyle="body-italic-bold-16"
              />
            </div>

            <h2 id="feature-heading" className="h2-bold-40 mt-5 text-grey">
              What <span className="text-primary">Chatblix</span> helps you do
            </h2>

            <p className="h4-regular-24 mt-4 text-grey-medium">
              Simple tools to manage customer messages, work with your team, and
              grow your business.
            </p>

            <div className="mt-6 flex items-center justify-center gap-3 text-sm font-medium text-grey-medium lg:justify-start">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-light/60 px-3 py-1 text-xs font-semibold text-primary">
                <Sparkles className="h-3 w-3" />
                {cards.length} core capabilities
              </span>
              <span className="hidden h-px w-12 bg-grey-light sm:inline-block" />
              <span className="hidden text-xs sm:inline">Built for teams</span>
            </div>
          </header>

          {/* Cards */}
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {cards.map((card, index) => {
              const accent = ACCENTS[index % ACCENTS.length]!;
              return (
                <FeatureCard
                  key={card.title}
                  index={index}
                  title={card.title}
                  description={card.description}
                  Icon={card.icon}
                  accent={accent}
                />
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
};

export default MainFeature;

/* ─── Card ──────────────────────────────────────────────────────────── */

interface FeatureCardProps {
  index: number;
  title: string;
  description: string;
  Icon: LucideIcon;
  accent: FeatureAccent;
}

const FeatureCard = ({
  index,
  title,
  description,
  Icon,
  accent,
}: FeatureCardProps) => (
  <motion.li
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
  >
    <article
      className={cn(
        "group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-grey-light bg-base-white p-6",
        "transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-2xl",
        accent.glow,
      )}
    >
      {/* Index */}
      <span
        aria-hidden
        className={cn(
          "absolute right-5 top-5 font-mono text-xs font-semibold tabular-nums",
          accent.badge,
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Icon */}
      <span
        className={cn(
          "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ring-1 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3",
          accent.iconBg,
          accent.iconText,
          accent.ring,
        )}
      >
        <Icon className="h-6 w-6" strokeWidth={1.8} />
      </span>

      {/* Body */}
      <div className="flex flex-1 flex-col">
        <h3 className="h5-bold-16 text-grey">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-grey-medium">
          {description}
        </p>
      </div>

      {/* Footer hover affordance */}
      <div className="flex items-center justify-between pt-2">
        <span
          aria-hidden
          className={cn(
            "h-0.5 w-6 origin-left rounded-full transition-all duration-300 group-hover:w-16",
            accent.underline,
          )}
        />
        <ArrowUpRight
          aria-hidden
          className={cn(
            "h-4 w-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100",
            accent.iconText,
          )}
        />
      </div>
    </article>
  </motion.li>
);
