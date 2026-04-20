import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { COPY_FEEDBACK_DURATION_MS } from "@/app/components/common/Conversation/panel/ContactDetails/constants";

export interface UseCopyToClipboard {
  copiedKey: string | null;
  copy: (value: string, key: string, label: string) => Promise<void>;
}

export const useCopyToClipboard = (
  feedbackDurationMs = COPY_FEEDBACK_DURATION_MS,
): UseCopyToClipboard => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  const copy = useCallback(
    async (value: string, key: string, label: string) => {
      try {
        await navigator.clipboard.writeText(value);
        setCopiedKey(key);
        toast.success(`${label} copied`);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setCopiedKey((curr) => (curr === key ? null : curr));
        }, feedbackDurationMs);
      } catch {
        toast.error("Unable to copy");
      }
    },
    [feedbackDurationMs],
  );

  return { copiedKey, copy };
};
