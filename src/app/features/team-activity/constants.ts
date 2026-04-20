import type { MemberStatus, ActivityAction } from "./types";

export const STATUS_CONFIG: Record<
  MemberStatus,
  { label: string; dot: string; bg: string; text: string }
> = {
  online: {
    label: "Online",
    dot: "bg-success",
    bg: "bg-success-light",
    text: "text-success",
  },
  away: {
    label: "Away",
    dot: "bg-warning",
    bg: "bg-warning-light",
    text: "text-warning-dark",
  },
  busy: {
    label: "Busy",
    dot: "bg-danger",
    bg: "bg-danger-light",
    text: "text-danger",
  },
  offline: {
    label: "Offline",
    dot: "bg-grey-medium",
    bg: "bg-grey-light",
    text: "text-grey-medium",
  },
};

export const ACTION_LABELS: Record<ActivityAction, string> = {
  replied: "replied to",
  resolved: "resolved",
  assigned: "assigned",
  tagged: "tagged in",
  transferred: "transferred",
  noted: "added a note to",
};
