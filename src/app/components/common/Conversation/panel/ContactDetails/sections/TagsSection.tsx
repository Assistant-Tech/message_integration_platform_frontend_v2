import { Hash } from "lucide-react";
import CollapsibleSection from "@/app/components/common/Conversation/panel/ContactDetails/components/CollapsibleSection";

interface TagsSectionProps {
  tags: string[];
  open: boolean;
  onToggle: () => void;
}

const TagsSection = ({ tags, open, onToggle }: TagsSectionProps) => (
  <CollapsibleSection
    title={`Tags${tags.length ? ` · ${tags.length}` : ""}`}
    icon={Hash}
    open={open}
    onToggle={onToggle}
  >
    {tags.length > 0 ? (
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center rounded-full bg-grey-light px-2.5 py-1 text-xs font-medium text-grey transition-colors hover:bg-primary-light hover:text-primary"
          >
            {tag}
          </span>
        ))}
      </div>
    ) : (
      <p className="text-xs italic text-grey-medium">No tags applied</p>
    )}
  </CollapsibleSection>
);

export default TagsSection;
