import { Users, Loader2 } from "lucide-react";
import { cn } from "@/app/utils/cn";
import { Button } from "@/app/components/ui";

interface ChatDetailsPanelProps {
  conversation: any;
  members: any[];
  tenantUsers: any[];
  membersLoading: boolean;
  onManage: () => void;
  onEdit: () => void;
}

const ChatDetailsPanel = ({
  conversation,
  members,
  tenantUsers,
  membersLoading,
  onManage,
  onEdit,
}: ChatDetailsPanelProps) => {
  return (
    <div className="w-96 border-l border-grey-light bg-base-white overflow-y-auto">
      {/* Header */}
      <div className="px-4 py-6 border-b border-grey-light flex items-center gap-2">
        <Users className="h-5 w-5 text-grey" />
        <h3 className="font-semibold text-grey">Details</h3>
      </div>

      {/* Body */}
      <div className="p-4 space-y-6">
        {/* Title */}
        <div>
          <h4 className="font-semibold text-grey mb-2">Title</h4>
          <p className="text-grey-medium">{conversation?.title || "N/A"}</p>
        </div>

        {/* Priority */}
        <div>
          <h4 className="font-semibold text-grey mb-2">Priority</h4>
          <span
            className={cn(
              "inline-block px-3 py-1 rounded-full text-xs font-medium capitalize",
              conversation?.priority === "urgent" && "bg-red-100 text-danger",
              conversation?.priority === "high" && "bg-orange-100 text-warning",
              conversation?.priority === "normal" &&
                "bg-blue-100 text-information-dark",
            )}
          >
            {conversation?.priority || "normal"}
          </span>
        </div>

        {/* Members */}
        <div>
          <h4 className="font-semibold text-grey mb-3">
            Members ({members.length})
          </h4>
          {membersLoading ? (
            <p className="text-grey-light flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading...
            </p>
          ) : (
            <ul className="space-y-2">
              {tenantUsers?.map(({ user }: any) => {
                const isOnline = user.status === "ONLINE";
                const lastActive = user.lastActive
                  ? new Date(user.lastActive).toLocaleString()
                  : "N/A";

                return (
                  <li
                    key={user.id}
                    className="flex items-center justify-between p-3 border border-grey-light rounded-lg hover:bg-grey-light transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={
                            user.avatar ||
                            `https://ui-avatars.com/api/?name=${user.name}`
                          }
                          alt={user.name}
                          className="h-8 w-8 rounded-full object-cover border border-grey-light"
                        />
                        <span
                          className={cn(
                            "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white",
                            isOnline ? "bg-primary" : "bg-grey-light",
                          )}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-grey">
                          {user.name}
                        </p>
                        <p className="text-xs text-grey-medium">
                          {isOnline ? "Online" : `Last active: ${lastActive}`}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 pt-4 border-t border-grey-light">
          <Button label="Manage Members" onClick={onManage} variant="primary" />
          <Button
            variant="outlined"
            label="Edit Conversation"
            onClick={onEdit}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatDetailsPanel;
