import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/app/utils/cn";
import { Button } from "@/app/components/ui";
import type { RecentConversation } from "./types";

const STATUS_STYLES = {
  active: {
    badge: "bg-success-light text-success",
    line: "bg-success",
    action: "Reply",
  },
  waiting: {
    badge: "bg-warning-light text-warning-dark",
    line: "bg-warning",
    action: "Reply",
  },
  resolved: {
    badge: "bg-grey-light text-grey-medium",
    line: "bg-grey-light",
    action: "View",
  },
} as const;

interface RecentConversationsProps {
  conversations: RecentConversation[];
}

const ConversationRow = ({
  conversation,
  isLast,
  index,
}: {
  conversation: RecentConversation;
  isLast: boolean;
  index: number;
}) => {
  const style = STATUS_STYLES[conversation.status];

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.1 + index * 0.06 }}
      className="group flex gap-4 rounded-xl px-2 py-3 transition-colors hover:bg-primary-light/20"
    >
      {/* Timeline */}
      <div className="flex flex-col items-center">
        <span
          className={cn(
            "flex h-8 w-14 flex-shrink-0 items-center justify-center rounded-lg body-regular-16",
            style.badge,
          )}
        >
          {conversation.time}
        </span>
        {!isLast && (
          <div className={cn("mt-1 w-0.5 flex-1 rounded-full", style.line)} />
        )}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <h4 className="body-semi-bold-16 truncate text-grey">
            {conversation.name}
          </h4>
          <Button
            label={style.action}
            variant="outlined"
            size="xs"
            className="opacity-0 transition-opacity group-hover:opacity-100"
          />
        </div>
        <p className="caption-medium-12 text-grey-medium">
          {conversation.channel}
        </p>
        <p className="label-regular-14 mt-0.5 line-clamp-1 text-grey-medium">
          {conversation.message}
        </p>
      </div>
    </motion.div>
  );
};

const RecentConversations = ({ conversations }: RecentConversationsProps) => (
  <motion.section
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: 0.35 }}
    className="flex h-full flex-col rounded-2xl border border-grey-light/60 bg-white p-6"
  >
    <div className="mb-4 flex items-center justify-between">
      <h2 className="h4-semi-bold-24 text-grey">Recent Conversations</h2>
      <button
        type="button"
        className="label-semi-bold-14 text-primary transition-colors hover:underline"
      >
        See all
      </button>
    </div>

    <div className="flex-1 space-y-1 overflow-y-auto">
      {conversations.map((conv, i) => (
        <ConversationRow
          key={conv.id}
          conversation={conv}
          isLast={i === conversations.length - 1}
          index={i}
        />
      ))}
    </div>

    <Button
      label="View all conversations"
      variant="neutral"
      size="sm"
      IconRight={<ArrowRight className="h-4 w-4" />}
      className="mt-4 w-full border border-grey-light/60"
    />
  </motion.section>
);

export default RecentConversations;
