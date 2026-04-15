import { CalendarClock, Clock4 } from "lucide-react";
import CollapsibleSection from "@/app/components/common/Conversation/panel/ContactDetails/components/CollapsibleSection";
import TimelineItem from "@/app/components/common/Conversation/panel/ContactDetails/components/TimelineItem";
import {
  formatDateTime,
  formatRelative,
} from "@/app/components/common/Conversation/panel/ContactDetails/helpers";
import type { ConversationDetails } from "@/app/components/common/Conversation/panel/ContactDetails/types";

interface ActivitySectionProps {
  conversation: ConversationDetails;
  open: boolean;
  onToggle: () => void;
}

const ActivitySection = ({
  conversation,
  open,
  onToggle,
}: ActivitySectionProps) => (
  <CollapsibleSection
    title="Activity"
    icon={Clock4}
    open={open}
    onToggle={onToggle}
  >
    <ol className="relative space-y-3 border-l border-grey-light pl-4">
      <TimelineItem
        icon={Clock4}
        label="Last activity"
        value={formatRelative(conversation.lastMessageAt)}
        hint={formatDateTime(conversation.lastMessageAt)}
      />
      <TimelineItem
        icon={CalendarClock}
        label="Conversation started"
        value={formatRelative(conversation.createdAt)}
        hint={formatDateTime(conversation.createdAt)}
      />
    </ol>
  </CollapsibleSection>
);

export default ActivitySection;
