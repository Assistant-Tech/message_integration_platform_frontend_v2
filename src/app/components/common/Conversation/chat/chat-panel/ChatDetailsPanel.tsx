import { Loader2, Mail, PencilLine, ShieldCheck, Users, X } from "lucide-react";
import { cn } from "@/app/utils/cn";
import { Button } from "@/app/components/ui";

interface ChatDetailsPanelProps {
  onClose: () => void;
  conversation: any;
  members: any[];
  membersLoading: boolean;
  onManage: () => void;
  onEdit: () => void;
}

const getInitials = (value?: string) =>
  value
    ?.split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "PH";

const formatDate = (value?: string) => {
  if (!value) return "Not available";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Not available";

  return date.toLocaleString();
};

const ChatDetailsPanel = ({
  onClose,
  conversation,
  members,
  membersLoading,
  onManage,
  onEdit,
}: ChatDetailsPanelProps) => {
  const stats = [
    {
      label: "Status",
      value: conversation?.status || "active",
      tone: "bg-success-light text-success-dark",
    },
    {
      label: "Priority",
      value: conversation?.priority || "normal",
      tone:
        conversation?.priority === "urgent"
          ? "bg-danger-light text-danger"
          : conversation?.priority === "high"
            ? "bg-warning-light text-warning-dark"
            : "bg-information-light text-information-dark",
    },
    {
      label: "Members",
      value: `${members?.length || 0}`,
      tone: "bg-primary-light text-primary",
    },
    {
      label: "Updated",
      value: conversation?.updatedAt
        ? new Date(conversation.updatedAt).toLocaleDateString()
        : "N/A",
      tone: "bg-primary-light text-primary",
    },
  ];

  return (
    <aside className="flex h-full flex-col overflow-y-auto bg-base-white">
      <div className="flex items-center justify-between border-b border-grey-light px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-light text-primary">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-grey">
              Contact details
            </h3>
            <p className="text-sm text-grey-medium">Drawer overview</p>
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
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-xl font-semibold text-base-white shadow-sm">
              {getInitials(conversation?.title)}
            </div>
            <h4 className="mt-4 text-xl font-semibold text-grey">
              {conversation?.title || "Pharah House"}
            </h4>
            <p className="mt-1 text-sm text-grey-medium">
              {(conversation?.type || "Internal").toString()} •{" "}
              {conversation?.status || "active"}
            </p>
            <div className="mt-4 flex items-center gap-2 rounded-full bg-base-white px-4 py-2 text-sm text-grey-medium">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-success" />
              Active now
            </div>
          </div>
        </section>

        <section>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-grey-medium">
            Overview
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[22px] border border-grey-light bg-base-white p-4"
              >
                <p className="text-xs uppercase tracking-[0.12em] text-grey-medium">
                  {stat.label}
                </p>
                <span
                  className={cn(
                    "mt-3 inline-flex rounded-full px-3 py-1 text-sm font-semibold capitalize",
                    stat.tone,
                  )}
                >
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[24px] border border-grey-light bg-base-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-light text-primary">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-grey">
                Conversation info
              </p>
              <p className="text-xs text-grey-medium">
                Snapshot of the selected thread
              </p>
            </div>
          </div>

          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex items-start justify-between gap-4">
              <dt className="text-grey-medium">Created</dt>
              <dd className="text-right text-grey">
                {formatDate(conversation?.createdAt)}
              </dd>
            </div>
            <div className="flex items-start justify-between gap-4">
              <dt className="text-grey-medium">Last active</dt>
              <dd className="text-right text-grey">
                {formatDate(
                  conversation?.lastActiveAt || conversation?.updatedAt,
                )}
              </dd>
            </div>
            <div className="flex items-start justify-between gap-4">
              <dt className="text-grey-medium">Last message</dt>
              <dd className="max-w-[190px] text-right text-grey">
                {conversation?.lastMessage || "No message yet"}
              </dd>
            </div>
          </dl>
        </section>

        <section className="rounded-[24px] border border-grey-light bg-base-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold text-grey">
                Members ({members?.length || 0})
              </h4>
              <p className="text-xs text-grey-medium">
                Latest participants in this conversation
              </p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-light text-primary">
              <Mail className="h-4 w-4" />
            </div>
          </div>

          {membersLoading ? (
            <div className="flex items-center gap-2 py-6 text-grey-medium">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading members...
            </div>
          ) : members?.length ? (
            <div className="mt-4 space-y-3">
              {members.slice(0, 4).map((member: any) => (
                <div
                  key={member.id || member.email || member.name}
                  className="flex items-center gap-3 rounded-[18px] border border-grey-light bg-primary-light/20 px-3 py-3"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-sm font-semibold text-base-white">
                    {getInitials(member.name)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-grey">
                      {member.name}
                    </p>
                    <p className="truncate text-xs text-grey-medium">
                      {member.email || "No email provided"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-grey-medium">No members yet.</p>
          )}
        </section>

        <div className="flex flex-col gap-3 border-t border-grey-light pt-4">
          <Button
            label="Manage Members"
            onClick={onManage}
            variant="primary"
            className="w-full"
          />
          <Button
            variant="outlined"
            label="Edit Conversation"
            onClick={onEdit}
            className="w-full"
            IconLeft={<PencilLine className="h-4 w-4" />}
          />
        </div>
      </div>
    </aside>
  );
};

export default ChatDetailsPanel;
