import { Zap, CalendarClock } from "lucide-react";
import { cn } from "@/app/utils/cn";
import type { BroadcastSchedule } from "../../types";

interface ScheduleStepProps {
  value: BroadcastSchedule;
  onChange: (schedule: BroadcastSchedule) => void;
}

const ScheduleStep = ({ value, onChange }: ScheduleStepProps) => {
  const isImmediate = value.mode === "immediate";

  return (
    <section aria-labelledby="schedule-heading">
      <h2 id="schedule-heading" className="text-base font-semibold text-grey">
        When should it send?
      </h2>
      <p className="mt-1 text-sm text-grey-medium">
        You can pause a scheduled broadcast any time before it starts.
      </p>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <button
          type="button"
          onClick={() => onChange({ mode: "immediate" })}
          className={cn(
            "flex items-start gap-3 rounded-xl border px-4 py-4 text-left transition-colors",
            isImmediate
              ? "border-primary bg-primary-light/30"
              : "border-grey-light bg-white hover:border-primary/40 hover:bg-primary-light/10",
          )}
          aria-pressed={isImmediate}
        >
          <span
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
              isImmediate ? "bg-primary text-white" : "bg-grey-light text-grey-medium",
            )}
          >
            <Zap className="h-4 w-4" strokeWidth={2} />
          </span>
          <div>
            <p className="text-sm font-semibold text-grey">Send now</p>
            <p className="mt-0.5 text-xs text-grey-medium">
              Delivery starts immediately after you confirm.
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() =>
            onChange({
              mode: "scheduled",
              sendAt: value.sendAt ?? new Date().toISOString(),
            })
          }
          className={cn(
            "flex items-start gap-3 rounded-xl border px-4 py-4 text-left transition-colors",
            !isImmediate
              ? "border-primary bg-primary-light/30"
              : "border-grey-light bg-white hover:border-primary/40 hover:bg-primary-light/10",
          )}
          aria-pressed={!isImmediate}
        >
          <span
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
              !isImmediate ? "bg-primary text-white" : "bg-grey-light text-grey-medium",
            )}
          >
            <CalendarClock className="h-4 w-4" strokeWidth={2} />
          </span>
          <div>
            <p className="text-sm font-semibold text-grey">Schedule</p>
            <p className="mt-0.5 text-xs text-grey-medium">
              Pick a date and time in your workspace timezone.
            </p>
          </div>
        </button>
      </div>

      {!isImmediate && (
        <label className="mt-5 block">
          <span className="text-xs font-semibold uppercase tracking-wider text-grey-medium">
            Send at
          </span>
          <input
            type="datetime-local"
            value={value.sendAt ? value.sendAt.slice(0, 16) : ""}
            onChange={(e) =>
              onChange({
                ...value,
                mode: "scheduled",
                sendAt: new Date(e.target.value).toISOString(),
              })
            }
            className="mt-1.5 w-full rounded-lg border border-grey-light bg-white px-3 py-2 text-sm text-grey outline-none focus:border-primary"
          />
        </label>
      )}
    </section>
  );
};

export default ScheduleStep;
