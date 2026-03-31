import { cn } from "@/app/utils/cn";

type LabelVariant = "status" | "priority";

const CONFIG = {
  status: {
    OPEN: {
      label: "Open",
      className: "bg-success-light text-success ring-success/20",
    },
    CLOSED: {
      label: "Closed",
      className: "bg-secondary-light text-secondary ring-secondary/20",
    },
    PENDING: {
      label: "Pending",
      className: "bg-danger-light text-danger ring-danger/20",
    },
    RESOLVED: {
      label: "Resolved",
      className: "bg-grey-light text-grey ring-grey-medium/20",
    },
  },
  priority: {
    LOW: {
      label: "Low",
      className: "bg-zinc-500/10 text-zinc-400 ring-zinc-500/20",
    },
    NORMAL: {
      label: "Normal",
      className: "bg-information/10 text-information-dark ring-information/20",
    },
    HIGH: {
      label: "High",
      className: "bg-amber-400/10 text-amber-700 ring-amber-400/10",
    },
    URGENT: {
      label: "Urgent",
      className: "bg-danger/10 text-danger-dark ring-danger/20",
    },
  },
} as const;

type Config = typeof CONFIG;

type Props<T extends LabelVariant> = {
  variant: T;
  value: keyof Config[T];
  className?: string;
};

function Label<T extends LabelVariant>({
  variant,
  value,
  className,
}: Props<T>) {
  const config = CONFIG[variant][value];

  return (
    <span
      className={cn(
        // Base
        "inline-flex items-center rounded-lg px-2.5 py-0.5 text-xs font-medium",
        // Glass effect
        "ring-1 ring-inset",
        "bg-white/5 dark:bg-white/10",
        "border border-white/10",
        // Hover polish
        "transition-all duration-200 cursor-pointer hover:scale-[1.02]",
        // Variant styles
        config.className,
        className,
      )}
    >
      {config.label}
    </span>
  );
}

export default Label;
