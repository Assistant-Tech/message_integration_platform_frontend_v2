import PlatformIcon from "@/app/components/common/Conversation/chat/PlatformIcons";
import { cn } from "@/app/utils/cn";
import { CHANNEL_OPTIONS } from "../../constants";
import type { Platform } from "@/app/components/common/Conversation/panel/helpers";

interface ChannelStepProps {
  value: Platform | null;
  onChange: (channel: Platform) => void;
}

const ChannelStep = ({ value, onChange }: ChannelStepProps) => (
  <section aria-labelledby="channel-heading">
    <h2 id="channel-heading" className="text-base font-semibold text-grey">
      Which channel?
    </h2>
    <p className="mt-1 text-sm text-grey-medium">
      Only contacts reachable on the chosen channel will receive the message.
    </p>

    <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
      {CHANNEL_OPTIONS.map((ch) => {
        const isSelected = value === ch.id;
        return (
          <button
            key={ch.id}
            type="button"
            disabled={!ch.available}
            onClick={() => ch.available && onChange(ch.id)}
            className={cn(
              "flex flex-col items-center gap-3 rounded-xl border px-4 py-5 transition-colors",
              !ch.available && "cursor-not-allowed opacity-60",
              isSelected
                ? "border-primary bg-primary-light/30"
                : "border-grey-light bg-white hover:border-primary/40 hover:bg-primary-light/10",
            )}
            aria-pressed={isSelected}
          >
            <PlatformIcon platform={ch.id} size={32} />
            <span className="text-sm font-semibold text-grey">{ch.label}</span>
            {ch.id === "WHATSAPP" && (
              <span className="rounded bg-warning/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-warning">
                Template required
              </span>
            )}
          </button>
        );
      })}
    </div>
  </section>
);

export default ChannelStep;
