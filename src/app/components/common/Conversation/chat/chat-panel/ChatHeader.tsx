import {
  Bell,
  CheckCircle2,
  Info,
  MessageSquareText,
  Package,
  Search,
  ShoppingCart,
  UsersRoundIcon,
} from "lucide-react";
import { cn } from "@/app/utils/cn";

interface ChatHeaderProps {
  conversation: any;
  members: any[];
  onToggleDetails: () => void;
  onToggleMembers: () => void;
  onToggleOrderInfo: () => void;
  onToggleProductSearch: () => void;
  onToggleOrderNotes: () => void;
}

const getInitials = (value?: string) =>
  value
    ?.split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "PH";

const ChatHeader = ({
  conversation,
  members,
  onToggleDetails,
  onToggleMembers,
  onToggleOrderInfo,
  onToggleProductSearch,
}: ChatHeaderProps) => {
  const title = conversation?.title || "Pharah House";
  const primaryParticipant = conversation?.participantsWithDetails?.[0];
  const subtitle = conversation?.type
    ? `${conversation.type} conversation`
    : "Lead • Conversation";

  const actionButtons = [
    {
      icon: Package,
      label: "Catalog",
      onClick: onToggleProductSearch,
    },
    {
      icon: ShoppingCart,
      label: "Order",
      onClick: onToggleOrderInfo,
    },
    {
      icon: UsersRoundIcon,
      label: `Members${members?.length ? ` (${members.length})` : ""}`,
      onClick: onToggleMembers,
    },
    {
      icon: Info,
      label: "Details",
      onClick: onToggleDetails,
    },
  ];

  return (
    <header className="sticky top-0 z-10 border-b border-grey-light bg-base-white/95 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-4 border-b border-grey-light px-5 py-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-base-white shadow-sm">
            <span className="text-sm font-semibold">{getInitials(title)}</span>
          </div>
          <div className="min-w-0">
            <h2 className="truncate text-lg font-semibold text-grey">
              {title}
            </h2>
            <p className="truncate text-sm text-grey-medium">{subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {[Search, CheckCircle2, MessageSquareText, Bell].map((Icon) => (
            <button
              key={Icon.displayName || Icon.name}
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-grey-light bg-base-white text-grey-medium transition-colors hover:bg-primary-light hover:text-primary"
            >
              <Icon className="h-4 w-4" />
            </button>
          ))}

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light text-primary">
            <span className="text-sm font-semibold">
              {getInitials(primaryParticipant?.name || title)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-light text-primary shadow-sm">
            <span className="text-base font-semibold">
              {getInitials(primaryParticipant?.name || title)}
            </span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="truncate text-base font-semibold text-grey">
                {title}
              </p>
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-success" />
            </div>
            <p className="truncate text-sm text-grey-medium">
              {primaryParticipant?.name || "Lead"} • {members?.length || 0}{" "}
              members
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {actionButtons.map(({ icon: Icon, label, onClick }) => (
            <button
              key={label}
              type="button"
              onClick={onClick}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border border-grey-light bg-base-white px-4 py-2 text-sm font-medium text-grey-medium transition-colors hover:border-primary hover:bg-primary-light hover:text-primary",
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
