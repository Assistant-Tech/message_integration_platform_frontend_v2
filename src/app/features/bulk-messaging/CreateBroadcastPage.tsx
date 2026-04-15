import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Send } from "lucide-react";
import { APP_ROUTES } from "@/app/constants/routes";
import StepIndicator, {
  type Step,
} from "./components/StepIndicator";
import AudienceStep from "./components/steps/AudienceStep";
import ChannelStep from "./components/steps/ChannelStep";
import MessageStep from "./components/steps/MessageStep";
import ScheduleStep from "./components/steps/ScheduleStep";
import type {
  BroadcastAudience,
  BroadcastMessage,
  BroadcastSchedule,
} from "./types";
import type { Platform } from "@/app/components/common/Conversation/panel/helpers";

const STEPS: Step[] = [
  { id: "audience", label: "Audience" },
  { id: "channel", label: "Channel" },
  { id: "message", label: "Message" },
  { id: "schedule", label: "Schedule" },
];

const CreateBroadcastPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const listHref = slug
    ? `/app/${slug}/admin/${APP_ROUTES.ADMIN.BULK_MESSAGING}`
    : "#";

  const [name, setName] = useState("Untitled broadcast");
  const [activeIndex, setActiveIndex] = useState(0);
  const [audience, setAudience] = useState<BroadcastAudience | null>(null);
  const [channel, setChannel] = useState<Platform | null>(null);
  const [message, setMessage] = useState<BroadcastMessage>({ body: "" });
  const [schedule, setSchedule] = useState<BroadcastSchedule>({
    mode: "immediate",
  });

  const canAdvance = useMemo(() => {
    switch (activeIndex) {
      case 0:
        return Boolean(audience);
      case 1:
        return Boolean(channel);
      case 2:
        return message.body.trim().length > 0;
      case 3:
        return schedule.mode === "immediate" || Boolean(schedule.sendAt);
      default:
        return false;
    }
  }, [activeIndex, audience, channel, message.body, schedule]);

  const isLast = activeIndex === STEPS.length - 1;

  const handleNext = () => {
    if (!canAdvance) return;
    if (!isLast) {
      setActiveIndex((i) => i + 1);
      return;
    }
    // TODO: POST /broadcasts with the collected draft, then navigate to detail.
    navigate(listHref);
  };

  const handleBack = () => {
    if (activeIndex === 0) navigate(listHref);
    else setActiveIndex((i) => i - 1);
  };

  return (
    <div className="flex h-full min-h-0 flex-col bg-primary-light/10">
      <header className="border-b border-grey-light bg-white px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <Link
            to={listHref}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-grey-medium hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} />
            Broadcasts
          </Link>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-label="Broadcast name"
            className="flex-1 max-w-md rounded-md border border-transparent bg-transparent px-2 py-1 text-base font-semibold text-grey outline-none focus:border-grey-light"
          />
          <StepIndicator
            steps={STEPS}
            activeIndex={activeIndex}
            onSelect={setActiveIndex}
          />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-3xl px-6 py-8">
          {activeIndex === 0 && (
            <AudienceStep value={audience} onChange={setAudience} />
          )}
          {activeIndex === 1 && (
            <ChannelStep value={channel} onChange={setChannel} />
          )}
          {activeIndex === 2 && (
            <MessageStep
              channel={channel}
              value={message}
              onChange={setMessage}
            />
          )}
          {activeIndex === 3 && (
            <ScheduleStep value={schedule} onChange={setSchedule} />
          )}
        </div>
      </div>

      <footer className="flex items-center justify-between border-t border-grey-light bg-white px-6 py-3">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-grey-medium hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2} />
          {activeIndex === 0 ? "Cancel" : "Back"}
        </button>

        <div className="flex items-center gap-3 text-xs text-grey-medium">
          {audience && (
            <span>
              Will reach{" "}
              <span className="tabular-nums font-semibold text-grey">
                {audience.size.toLocaleString()}
              </span>{" "}
              contacts
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleNext}
          disabled={!canAdvance}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:bg-grey-light disabled:text-grey-medium"
        >
          {isLast ? (
            <>
              <Send className="h-4 w-4" strokeWidth={2.2} />
              {schedule.mode === "scheduled" ? "Schedule broadcast" : "Send now"}
            </>
          ) : (
            <>
              Continue
              <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
            </>
          )}
        </button>
      </footer>
    </div>
  );
};

export default CreateBroadcastPage;
