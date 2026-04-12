import { cn } from "@/app/utils/cn";
import { STATUS_CONFIG } from "./constants";
import type { MemberStatus } from "./types";

const AVATAR_PALETTES = [
  "bg-primary/15 text-primary",
  "bg-secondary/15 text-secondary-dark",
  "bg-information/15 text-information",
  "bg-success/15 text-success-dark",
  "bg-warning/15 text-warning-dark",
  "bg-danger/15 text-danger",
] as const;

const getColorFromName = (name: string): string => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + hash * 31;
  return AVATAR_PALETTES[Math.abs(hash) % AVATAR_PALETTES.length] ?? AVATAR_PALETTES[0];
};

const getInitials = (name: string): string =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

interface MemberAvatarProps {
  name: string;
  status: MemberStatus;
  size?: "sm" | "md" | "lg";
  avatar?: string;
}

const SIZE_MAP = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
} as const;

const DOT_SIZE_MAP = {
  sm: "h-2.5 w-2.5 -bottom-0 -right-0",
  md: "h-3 w-3 -bottom-0.5 -right-0.5",
  lg: "h-3.5 w-3.5 -bottom-0.5 -right-0.5",
} as const;

const MemberAvatar = ({
  name,
  status,
  size = "md",
  avatar,
}: MemberAvatarProps) => {
  const statusStyle = STATUS_CONFIG[status];

  return (
    <div className="relative flex-shrink-0">
      {avatar ? (
        <img
          src={avatar}
          alt={name}
          className={cn("rounded-full object-cover", SIZE_MAP[size])}
        />
      ) : (
        <div
          className={cn(
            "flex items-center justify-center rounded-full font-semibold select-none",
            SIZE_MAP[size],
            getColorFromName(name),
          )}
        >
          {getInitials(name)}
        </div>
      )}
      <span
        className={cn(
          "absolute rounded-full border-2 border-white",
          DOT_SIZE_MAP[size],
          statusStyle.dot,
        )}
        aria-label={statusStyle.label}
      />
    </div>
  );
};

export default MemberAvatar;
