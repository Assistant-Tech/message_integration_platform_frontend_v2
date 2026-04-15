import { useCallback, useState } from "react";
import Header from "@/app/components/common/Conversation/panel/ContactDetails/sections/Header";
import Hero from "@/app/components/common/Conversation/panel/ContactDetails/sections/Hero";
import ProfileSection from "@/app/components/common/Conversation/panel/ContactDetails/sections/ProfileSection";
import TagsSection from "@/app/components/common/Conversation/panel/ContactDetails/sections/TagsSection";
import ActivitySection from "@/app/components/common/Conversation/panel/ContactDetails/sections/ActivitySection";
import FooterAction from "@/app/components/common/Conversation/panel/ContactDetails/sections/FooterAction";
import { useCopyToClipboard } from "@/app/components/common/Conversation/panel/ContactDetails/useCopyToClipboard";
import type { ContactDetailsProps } from "@/app/components/common/Conversation/panel/ContactDetails/types";

type SectionKey = "profile" | "tags" | "activity";

const ContactDetails = ({
  conversation,
  onClose,
  onAssignToggle,
}: ContactDetailsProps) => {
  const [openSections, setOpenSections] = useState<Record<SectionKey, boolean>>(
    { profile: true, tags: true, activity: true },
  );

  const toggleSection = useCallback(
    (key: SectionKey) =>
      setOpenSections((prev) => ({ ...prev, [key]: !prev[key] })),
    [],
  );

  const { copiedKey, copy } = useCopyToClipboard();

  const tags = conversation.tags ?? [];
  const isAssigned = Boolean(conversation.assignedUser);

  return (
    <aside className="flex h-full flex-col overflow-y-auto bg-base-white">
      <Header onClose={onClose} />

      <div className="flex-1 space-y-4 px-4 py-4">
        <Hero conversation={conversation} onCopy={copy} />

        <ProfileSection
          conversation={conversation}
          open={openSections.profile}
          onToggle={() => toggleSection("profile")}
          copiedKey={copiedKey}
          onCopy={copy}
        />

        <TagsSection
          tags={tags}
          open={openSections.tags}
          onToggle={() => toggleSection("tags")}
        />

        <ActivitySection
          conversation={conversation}
          open={openSections.activity}
          onToggle={() => toggleSection("activity")}
        />
      </div>

      {onAssignToggle && (
        <FooterAction
          isAssigned={isAssigned}
          onAssignToggle={onAssignToggle}
        />
      )}
    </aside>
  );
};

export default ContactDetails;
