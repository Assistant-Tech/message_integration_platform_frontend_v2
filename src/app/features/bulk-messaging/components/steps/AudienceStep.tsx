import { Users } from "lucide-react";
import { cn } from "@/app/utils/cn";
import type { BroadcastAudience } from "../../types";

// TODO: fetch from segments API; these are placeholder segments.
const SEGMENTS: BroadcastAudience[] = [
  { segmentId: "seg_all", label: "All contacts", size: 12480 },
  { segmentId: "seg_vip", label: "VIP customers", size: 1240 },
  { segmentId: "seg_cart_48h", label: "Abandoned cart (48h)", size: 312 },
  { segmentId: "seg_new_7d", label: "New contacts (7d)", size: 640 },
  { segmentId: "seg_inactive", label: "Inactive (30d)", size: 2050 },
];

interface AudienceStepProps {
  value: BroadcastAudience | null;
  onChange: (audience: BroadcastAudience) => void;
}

const AudienceStep = ({ value, onChange }: AudienceStepProps) => (
  <section aria-labelledby="audience-heading">
    <h2 id="audience-heading" className="text-base font-semibold text-grey">
      Who should receive this?
    </h2>
    <p className="mt-1 text-sm text-grey-medium">
      Pick a saved segment. Segment size is an estimate — final count is
      resolved when the broadcast sends.
    </p>

    <ul className="mt-5 grid gap-2">
      {SEGMENTS.map((seg) => {
        const isSelected = value?.segmentId === seg.segmentId;
        return (
          <li key={seg.segmentId}>
            <button
              type="button"
              onClick={() => onChange(seg)}
              className={cn(
                "flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left transition-colors",
                isSelected
                  ? "border-primary bg-primary-light/30"
                  : "border-grey-light bg-white hover:border-primary/40 hover:bg-primary-light/10",
              )}
            >
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg",
                    isSelected
                      ? "bg-primary text-white"
                      : "bg-grey-light text-grey-medium",
                  )}
                >
                  <Users className="h-4 w-4" strokeWidth={2} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-grey">{seg.label}</p>
                  <p className="text-xs text-grey-medium">
                    {seg.size.toLocaleString()} contacts
                  </p>
                </div>
              </div>
              <span
                className={cn(
                  "h-4 w-4 rounded-full border-2 transition-colors",
                  isSelected
                    ? "border-primary bg-primary"
                    : "border-grey-light",
                )}
                aria-hidden
              />
            </button>
          </li>
        );
      })}
    </ul>
  </section>
);

export default AudienceStep;
