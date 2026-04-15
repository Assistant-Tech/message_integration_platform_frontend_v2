import { motion } from "framer-motion";
import {
  MessageSquare,
  CheckCircle2,
  UserPlus,
  Tag,
  ArrowRightLeft,
  StickyNote,
} from "lucide-react";
import { cn } from "@/app/utils/cn";
import { ACTION_LABELS } from "./constants";
import MemberAvatar from "./MemberAvatar";
import type { ActivityEvent, ActivityAction } from "./types";

const ACTION_ICONS: Record<ActivityAction, typeof MessageSquare> = {
  replied: MessageSquare,
  resolved: CheckCircle2,
  assigned: UserPlus,
  tagged: Tag,
  transferred: ArrowRightLeft,
  noted: StickyNote,
};

const ACTION_COLORS: Record<ActivityAction, string> = {
  replied: "text-primary",
  resolved: "text-success",
  assigned: "text-information",
  tagged: "text-secondary-dark",
  transferred: "text-warning-dark",
  noted: "text-grey-medium",
};

interface ActivityFeedProps {
  events: ActivityEvent[];
}

const ActivityFeed = ({ events }: ActivityFeedProps) => (
  <motion.section
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: 0.3 }}
    className="flex h-full flex-col rounded-2xl border border-grey-light/60 bg-white p-6"
  >
    <div className="mb-4 flex items-center justify-between">
      <h3 className="h4-semi-bold-24 text-grey">Live Feed</h3>
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success" />
      </span>
    </div>

    <div className="flex-1 space-y-1 overflow-y-auto scrollbar-invisible">
      {events.map((event, i) => {
        const ActionIcon = ACTION_ICONS[event.action];
        const iconColor = ACTION_COLORS[event.action];

        return (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0.05 + i * 0.04 }}
            className="group flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-primary-light/10"
          >
            <MemberAvatar name={event.memberName} status="online" size="sm" />

            <div className="min-w-0 flex-1">
              <p className="label-regular-14 text-grey">
                <span className="font-semibold">{event.memberName}</span>
                {" "}
                <span className="text-grey-medium">
                  {ACTION_LABELS[event.action]}
                </span>
                {" "}
                <span className="font-medium">{event.target}</span>
              </p>
              <div className="mt-0.5 flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <ActionIcon
                    className={cn("h-3 w-3", iconColor)}
                    strokeWidth={1.8}
                  />
                  <span className="caption-medium-12 text-grey-medium">
                    {event.channel}
                  </span>
                </div>
                <span className="caption-medium-12 text-grey-medium/60">
                  &middot;
                </span>
                <span className="caption-medium-12 text-grey-medium/60">
                  {event.timestamp}
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  </motion.section>
);

export default ActivityFeed;
