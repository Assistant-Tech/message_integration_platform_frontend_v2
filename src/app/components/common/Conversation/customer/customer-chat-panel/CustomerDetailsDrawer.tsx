import { Info, UserRound, X } from "lucide-react";
import { cn } from "@/app/utils/cn";
import type { CustomerConversation } from "@/app/features/dashboard/admin/pages/conversation/mockData/customerConversationMockData";
import {
  LEAD_SOURCE_LABELS,
  LEAD_SOURCE_STYLES,
  TAG_STYLES,
} from "@/app/features/dashboard/admin/pages/conversation/mockData/customerConversationMockData";
import CustomerChatAvatar from "./CustomerChatAvatar";

interface Props {
  conversation: CustomerConversation;
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

const titleCase = (value?: string) => {
  if (!value) return "Not assigned";

  return value.charAt(0).toUpperCase() + value.slice(1);
};

const CustomerDetailsDrawer = ({
  conversation,
  onClose,
  onAssignToggle,
}: Props) => {
  const overview = [
    {
      label: "Platform",
      value: titleCase(conversation.platform),
      tone: "",
    },
    {
      label: "Status",
      value: titleCase(conversation.status),
      tone:
        conversation.status === "resolved"
          ? "bg-success-light text-success-dark"
          : conversation.status === "assigned"
            ? "bg-primary-light text-primary"
            : "bg-warning-light text-warning-dark",
    },
    {
      label: "Unread",
      value: `${conversation.unreadCount ?? 0}`,
      tone: "",
    },
    {
      label: "Messages",
      value: `${conversation.messages.length}`,
      tone: "bg-base-white text-grey",
    },
    {
      label: "Source",
      value: conversation.leadSource
        ? LEAD_SOURCE_LABELS[conversation.leadSource]
        : "Unknown",
      tone: conversation.leadSource
        ? LEAD_SOURCE_STYLES[conversation.leadSource]
        : "bg-grey-light text-grey-medium",
    },
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
        <section className="rounded-[28px] border border-grey-light bg-primary-light/35 p-5">
          <div className="flex flex-col items-center text-center">
            <CustomerChatAvatar
              name={conversation.contactName}
              platform={conversation.platform}
            />
            <h4 className="mt-4 text-xl font-semibold text-grey">
              {conversation.contactName}
            </h4>
            <p className="mt-1 text-sm text-grey-medium">
              {titleCase(conversation.platform)} customer
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {conversation.leadSource && (
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-3 py-1 label-regular-14",
                    LEAD_SOURCE_STYLES[conversation.leadSource],
                  )}
                >
                  {LEAD_SOURCE_LABELS[conversation.leadSource]}
                </span>
              )}
              {(conversation.tags?.length
                ? conversation.tags
                : ["No tags"]
              ).map((tag) => (
                <span
                  key={tag}
                  className={cn(
                    "inline-flex items-center rounded-full px-3 py-1 label-regular-14",
                    conversation.tags?.length
                      ? (TAG_STYLES[tag] ?? "bg-grey-light text-grey")
                      : "bg-grey-light text-grey-medium",
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

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
                {conversation.assignedTo || "Not assigned"}
              </dd>
            </div>
            <div className="flex items-start justify-between gap-4">
              <dt className="text-grey-medium">Last activity</dt>
              <dd className="text-right text-grey">
                {formatDateTime(conversation.timestamp)}
              </dd>
            </div>
            {/* <div className="flex items-start justify-between gap-4">
              <dt className="text-grey-medium">Last customer message</dt>
              <dd className="max-w-[180px] text-right text-grey">
                {latestCustomerMessage?.content || "No customer message yet"}
              </dd>
            </div> */}
          </dl>
        </section>

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

        {/* <section className="rounded-[24px] border border-grey-light bg-base-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="label-regular-16 text-grey">
                Conversation signals
              </h4>
              <p className="text-xs text-grey-medium">
                Quick details from the current thread
              </p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-light text-primary">
              <MessageSquare className="h-4 w-4" />
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <div className="rounded-[18px] border border-grey-light bg-primary-light/20 px-3 py-3">
              <div className="flex items-center gap-2 label-regular-16 text-grey">
                <Clock3 className="h-4 w-4 text-primary" />
                Last activity
              </div>
              <p className="mt-2 text-sm text-grey-medium">
                {formatDateTime(conversation.timestamp)}
              </p>
            </div>

            <div className="rounded-[18px] border border-grey-light bg-primary-light/20 px-3 py-3">
              <div className="flex items-center gap-2 label-regular-16 text-grey">
                <Tag className="h-4 w-4 text-primary" />
                Latest message
              </div>
              <p className="mt-2 text-sm text-grey-medium break-words">
                {conversation.lastMessage || "No message yet"}
              </p>
            </div>
          </div>
        </section> */}
      </div>
    </aside>
  );
};

export default CustomerDetailsDrawer;
