import type { LucideIcon } from "lucide-react";

interface TimelineItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
  hint?: string;
}

const TimelineItem = ({
  icon: Icon,
  label,
  value,
  hint,
}: TimelineItemProps) => (
  <li className="relative">
    <span className="absolute -left-[22px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary-light ring-2 ring-base-white">
      <Icon className="h-2.5 w-2.5 text-primary" />
    </span>
    <p className="text-xs text-grey-medium">{label}</p>
    <p className="text-xs font-medium text-grey" title={hint}>
      {value}
    </p>
  </li>
);

export default TimelineItem;
