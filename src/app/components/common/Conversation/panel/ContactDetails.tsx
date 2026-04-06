import { Info, UserRound, X } from "lucide-react";
import { cn } from "@/app/utils/cn";
import type { Inbox } from "@/app/types/inbox.types";
import ChatAvatar from "./ChatAvatar";

interface Props {
  conversation: Inbox & { tags?: string[] };
  onClose: () => void;
  onAssignToggle?: () => void;
}

const formatDateTime = (value?: string) => {
  if (!value) return "Not available";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not available";
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const titleCase = (value?: string | null) => {
  if (!value) return "Not assigned";
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};

const ContactDetails = ({ conversation, onClose, onAssignToggle }: Props) => {
  const displayName = conversation.contact?.name ?? conversation.title;
  const channelLabel = titleCase(conversation.channel);

  const statusTone =
    conversation.status === "CLOSED"
      ? "bg-success-light text-success-dark"
      : "bg-primary-light text-primary";

  const priorityTone =
    conversation.priority === "HIGH"
      ? "bg-error-light text-error-dark"
      : conversation.priority === "LOW"
        ? "bg-grey-light text-grey-medium"
        : "bg-warning-light text-warning-dark";

  const overview = [
    { label: "Channel", value: channelLabel, tone: "bg-grey-light text-grey" },
    {
      label: "Status",
      value: titleCase(conversation.status),
      tone: statusTone,
    },
    {
      label: "Priority",
      value: titleCase(conversation.priority),
      tone: priorityTone,
    },
    { label: "Unread", value: `${conversation.unreadCount}`, tone: "" },
  ];

  return (
    <aside className="flex h-full flex-col overflow-y-auto bg-base-white">
      <div className="flex items-center justify-between border-b border-grey-light px-5 py-2.5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-grey-light text-grey">
            <Info className="h-5 w-5" />
          </div>
          <div>
            <h3 className="body-semi-bold-16 text-grey">Customer details</h3>
            <p className="text-sm text-grey-medium">Selected conversation</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-grey-light bg-base-white text-grey-medium transition-colors hover:bg-primary-light hover:text-primary"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-6 px-5 py-5">
        {/* Contact card */}
        <section className="rounded-[28px] border border-grey-light bg-primary-light/35 p-5">
          <div className="flex flex-col items-center text-center">
            <ChatAvatar
              name={displayName}
              url={conversation.contact?.avatar}
              platform={conversation.channel}
            />
            <h4 className="mt-4 text-xl font-semibold text-grey">
              {displayName}
            </h4>
            <p className="mt-1 text-sm text-grey-medium">
              {channelLabel} customer
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {(conversation.tags?.length
                ? conversation.tags
                : ["No tags"]
              ).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full px-3 py-1 label-regular-14 bg-grey-light text-grey"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Overview grid */}
        <section>
          <h4 className="mb-3 label-regular-16 uppercase tracking-[0.12em] text-grey-medium">
            Overview
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {overview.map((item) => (
              <div
                key={item.label}
                className="rounded-[22px] border border-grey-light bg-base-white p-4"
              >
                <p className="text-xs uppercase tracking-[0.12em] text-grey-medium">
                  {item.label}
                </p>
                <span
                  className={cn(
                    "mt-3 inline-flex rounded-full px-3 py-1 label-regular-16",
                    item.tone,
                  )}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Customer profile */}
        <section className="rounded-[24px] border border-grey-light bg-base-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-light text-primary">
              <UserRound className="h-5 w-5" />
            </div>
            <div>
              <p className="label-regular-16 text-grey">Customer profile</p>
              <p className="text-xs text-grey-medium">
                Snapshot from the selected thread
              </p>
            </div>
          </div>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex items-start justify-between gap-4">
              <dt className="text-grey-medium">Assigned to</dt>
              <dd className="text-right text-grey">
                {conversation.assignedUser?.name ?? "Not assigned"}
              </dd>
            </div>
            {conversation.contact?.email && (
              <div className="flex items-start justify-between gap-4">
                <dt className="text-grey-medium">Email</dt>
                <dd className="text-right text-grey">
                  {conversation.contact.email}
                </dd>
              </div>
            )}
            <div className="flex items-start justify-between gap-4">
              <dt className="text-grey-medium">Last activity</dt>
              <dd className="text-right text-grey">
                {formatDateTime(conversation.lastMessageAt)}
              </dd>
            </div>
          </dl>
        </section>

        {/* Assign section */}
        <section className="rounded-[24px] border border-grey-light bg-base-white p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h4 className="label-regular-16 text-grey">Assign Section</h4>
              <p className="text-xs text-grey-medium">
                Open assign drawer to choose admin/member
              </p>
            </div>
            <button
              type="button"
              onClick={onAssignToggle}
              className="rounded-lg border border-grey-light px-3 py-1.5 text-xs font-semibold text-grey transition-colors hover:border-primary hover:text-primary"
            >
              Assign
            </button>
          </div>
        </section>
      </div>
    </aside>
  );
};

export default ContactDetails;
