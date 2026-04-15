import { useMemo } from "react";
import { AtSign, Hash, MessageSquare, Sparkles } from "lucide-react";
import { toast } from "sonner";
import ChatAvatar from "@/app/components/common/Conversation/panel/ChatAvatar";
import Pill from "@/app/components/common/Conversation/panel/ContactDetails/components/Pill";
import QuickAction from "@/app/components/common/Conversation/panel/ContactDetails/components/QuickAction";
import {
  getInitials,
  titleCase,
} from "@/app/components/common/Conversation/panel/ContactDetails/helpers";
import {
  DEFAULT_PRIORITY_TONE,
  DEFAULT_STATUS_TONE,
  PRIORITY_TONES,
  STATUS_TONES,
} from "@/app/components/common/Conversation/panel/ContactDetails/constants";
import type { ConversationDetails } from "@/app/components/common/Conversation/panel/ContactDetails/types";

interface HeroProps {
  conversation: ConversationDetails;
  onCopy: (value: string, key: string, label: string) => void;
}

const Hero = ({ conversation, onCopy }: HeroProps) => {
  const displayName = conversation.contact?.name ?? conversation.title;
  const channelLabel = titleCase(conversation.channel);
  const initials = useMemo(() => getInitials(displayName), [displayName]);

  const statusTone =
    STATUS_TONES[conversation.status] ?? DEFAULT_STATUS_TONE;
  const priorityTone =
    PRIORITY_TONES[conversation.priority] ?? DEFAULT_PRIORITY_TONE;

  const email = conversation.contact?.email;

  return (
    <section className="relative overflow-hidden rounded-2xl border border-grey-light bg-gradient-to-br from-primary-light/50 via-base-white to-base-white p-5">
      <span
        aria-hidden
        className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/10 blur-2xl"
      />
      <div className="relative flex flex-col items-center text-center">
        <div className="rounded-full ring-4 ring-base-white shadow-sm">
          <ChatAvatar
            name={displayName}
            url={conversation.contact?.avatar}
            platform={conversation.channel}
          />
        </div>
        <h4 className="mt-3 max-w-full truncate text-base font-semibold text-grey">
          {displayName}
        </h4>
        <p className="mt-0.5 flex items-center gap-1 text-xs text-grey-medium">
          <MessageSquare className="h-3 w-3" />
          {channelLabel}
          {initials && (
            <>
              <span className="mx-1 text-grey-light">•</span>
              <span>{initials}</span>
            </>
          )}
        </p>

        <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5">
          <Pill tone={statusTone}>{titleCase(conversation.status)}</Pill>
          <Pill tone={priorityTone}>
            {titleCase(conversation.priority)} priority
          </Pill>
          {conversation.unreadCount > 0 && (
            <Pill tone="bg-primary text-white ring-primary/30">
              {conversation.unreadCount} unread
            </Pill>
          )}
        </div>

        <div className="mt-4 flex items-center justify-center gap-1.5">
          <QuickAction
            icon={AtSign}
            label="Copy email"
            disabled={!email}
            onClick={() => email && onCopy(email, "email", "Email")}
          />
          <QuickAction
            icon={Hash}
            label="Copy conversation ID"
            onClick={() => onCopy(conversation.id, "id", "ID")}
          />
          <QuickAction
            icon={Sparkles}
            label="AI summary"
            onClick={() => toast.info("AI summary coming soon")}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
