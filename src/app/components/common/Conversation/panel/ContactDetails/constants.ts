export const DEFAULT_STATUS_TONE =
  "bg-primary-light text-primary ring-primary/20";

export const DEFAULT_PRIORITY_TONE =
  "bg-warning-light text-warning-dark ring-warning/20";

export const STATUS_TONES: Record<string, string> = {
  CLOSED: "bg-success-light text-success-dark ring-success/20",
  OPEN: DEFAULT_STATUS_TONE,
};

export const PRIORITY_TONES: Record<string, string> = {
  HIGH: "bg-error-light text-error-dark ring-error/20",
  LOW: "bg-grey-light text-grey-medium ring-grey-medium/20",
  NORMAL: DEFAULT_PRIORITY_TONE,
};

export const COPY_FEEDBACK_DURATION_MS = 1500;
