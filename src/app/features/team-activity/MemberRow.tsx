import { motion } from "framer-motion";
import {
  MessageSquare,
  CheckCircle2,
  Clock,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/app/utils/cn";
import { STATUS_CONFIG } from "./constants";
import MemberAvatar from "./MemberAvatar";
import type { TeamMember } from "./types";

interface MemberRowProps {
  member: TeamMember;
  index: number;
}

const formatActiveTime = (minutes: number): string => {
  if (minutes === 0) return "-";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  return `${h}h ${m}m`;
};

const MemberRow = ({ member, index }: MemberRowProps) => {
  const statusStyle = STATUS_CONFIG[member.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: 0.05 + index * 0.04 }}
      className={cn(
        "group grid grid-cols-[1fr] gap-3 rounded-xl px-4 py-3.5",
        "transition-colors duration-200 hover:bg-primary-light/15",
        "md:grid-cols-[minmax(200px,2fr)_1fr_1fr_1fr_1fr_40px]",
        "md:items-center",
      )}
    >
      {/* Member info */}
      <div className="flex items-center gap-3">
        <MemberAvatar name={member.name} status={member.status} />
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="body-semi-bold-16 truncate text-grey">
              {member.name}
            </p>
            <span
              className={cn(
                "hidden rounded-full px-2 py-0.5 sm:inline-flex",
                statusStyle.bg,
              )}
            >
              <span className={cn("caption-medium-12", statusStyle.text)}>
                {statusStyle.label}
              </span>
            </span>
          </div>
          <p className="caption-medium-12 truncate text-grey-medium">
            {member.role} &middot; {member.lastActiveAt}
          </p>
        </div>
      </div>

      {/* Active conversations — visible on md+ */}
      <div className="hidden items-center gap-1.5 md:flex">
        <MessageSquare
          className="h-3.5 w-3.5 text-primary"
          strokeWidth={1.8}
        />
        <span className="label-medium-14 text-grey">
          {member.activeConversations}
        </span>
        <span className="caption-medium-12 text-grey-medium">active</span>
      </div>

      {/* Resolved today */}
      <div className="hidden items-center gap-1.5 md:flex">
        <CheckCircle2
          className="h-3.5 w-3.5 text-success"
          strokeWidth={1.8}
        />
        <span className="label-medium-14 text-grey">
          {member.resolvedToday}
        </span>
        <span className="caption-medium-12 text-grey-medium">resolved</span>
      </div>

      {/* Response time */}
      <div className="hidden items-center gap-1.5 md:flex">
        <Clock
          className="h-3.5 w-3.5 text-information"
          strokeWidth={1.8}
        />
        <span className="label-medium-14 text-grey">
          {member.avgResponseTime}
        </span>
      </div>

      {/* Active time today */}
      <div className="hidden md:block">
        <span className="label-medium-14 text-grey">
          {formatActiveTime(member.activeMinutesToday)}
        </span>
      </div>

      {/* Mobile secondary info row */}
      <div className="flex items-center gap-4 md:hidden">
        <span className="caption-medium-12 text-grey-medium">
          {member.activeConversations} chats
        </span>
        <span className="caption-medium-12 text-grey-medium">
          {member.resolvedToday} resolved
        </span>
        <span className="caption-medium-12 text-grey-medium">
          {member.avgResponseTime} avg
        </span>
      </div>

      {/* Actions */}
      <button
        type="button"
        aria-label={`More actions for ${member.name}`}
        className={cn(
          "hidden h-8 w-8 items-center justify-center rounded-lg md:flex",
          "text-grey-medium opacity-0 transition-all",
          "hover:bg-grey-light/50 group-hover:opacity-100",
        )}
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>
    </motion.div>
  );
};

export default MemberRow;
