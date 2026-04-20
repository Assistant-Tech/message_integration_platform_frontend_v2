import { AtSign, Hash, Inbox as InboxIcon, UserRound } from "lucide-react";
import CollapsibleSection from "@/app/components/common/Conversation/panel/ContactDetails/components/CollapsibleSection";
import ProfileRow from "@/app/components/common/Conversation/panel/ContactDetails/components/ProfileRow";
import type { ConversationDetails } from "@/app/components/common/Conversation/panel/ContactDetails/types";

interface ProfileSectionProps {
  conversation: ConversationDetails;
  open: boolean;
  onToggle: () => void;
  copiedKey: string | null;
  onCopy: (value: string, key: string, label: string) => void;
}

const ProfileSection = ({
  conversation,
  open,
  onToggle,
  copiedKey,
  onCopy,
}: ProfileSectionProps) => {
  const email = conversation.contact?.email;

  return (
    <CollapsibleSection
      title="Profile"
      icon={InboxIcon}
      open={open}
      onToggle={onToggle}
    >
      <dl className="divide-y divide-grey-light/70">
        <ProfileRow
          icon={UserRound}
          label="Assigned to"
          value={
            conversation.assignedUser?.name ?? (
              <span className="text-grey-medium">Unassigned</span>
            )
          }
        />
        {email && (
          <ProfileRow
            icon={AtSign}
            label="Email"
            value={email}
            copyable
            copied={copiedKey === "email-row"}
            onCopy={() => onCopy(email, "email-row", "Email")}
          />
        )}
        <ProfileRow
          icon={Hash}
          label="Conversation ID"
          value={
            <span className="font-mono text-[11px]">
              {conversation.id.slice(0, 10)}…
            </span>
          }
          copyable
          copied={copiedKey === "id-row"}
          onCopy={() => onCopy(conversation.id, "id-row", "ID")}
        />
      </dl>
    </CollapsibleSection>
  );
};

export default ProfileSection;
