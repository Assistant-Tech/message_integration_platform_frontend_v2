import { Loader2, User } from "lucide-react";
import { Button } from "@/app/components/ui";

const ChatMembersDetailsPanel = ({
  members,
  loading = false,
  onMemberDetailsClose,
  onManage,
  onMemberClick,
}: any) => {
  const getLastActiveText = (lastActiveAt: string) => {
    const lastActive = new Date(lastActiveAt);
    const now = new Date();
    const diffMs = now.getTime() - lastActive.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHrs = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHrs / 24);

    if (diffDays >= 1) return `Last active: ${lastActive.toLocaleString()}`;
    if (diffHrs >= 1)
      return `Active ${diffHrs} hr${diffHrs > 1 ? "s" : ""} ago`;
    return `Active ${diffMins} min${diffMins > 1 ? "s" : ""} ago`;
  };

  return (
    <div className="w-80 h-full border-l border-grey-light bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-grey-light">
        <h2 className="font-semibold text-lg text-gray-700">Members</h2>
        <button
          onClick={onMemberDetailsClose}
          className="text-gray-500 hover:text-black transition"
        >
          ✕
        </button>
      </div>

      {/* Members List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {loading ? (
          <div className="flex justify-center py-10 text-gray-400">
            <Loader2 className="animate-spin h-6 w-6" />
          </div>
        ) : members?.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            No members found.
          </div>
        ) : (
          members.map((m: any) => (
            <div
              key={m.id}
              onClick={() => onMemberClick?.(m)}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition"
            >
              {/* Avatar with status */}
              <div className="relative">
                {m.avatar ? (
                  <img
                    src={m.avatar}
                    alt={m.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="h-5 w-5 text-gray-500" />
                  </div>
                )}
                <span
                  className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white
                    ${m.status === "ONLINE" ? "bg-primary" : "bg-grey-medium"}
                  `}
                ></span>
              </div>

              {/* User info */}
              <div className="flex flex-col flex-1 min-w-0">
                <span className="font-medium text-gray-800 truncate">
                  {m.name}
                </span>
                {m.status === "ONLINE" ? (
                  <span className="text-xs text-primary">Online</span>
                ) : m.lastActiveAt ? (
                  <span className="text-xs text-danger truncate">
                    {getLastActiveText(m.lastActiveAt)}
                  </span>
                ) : (
                  <span className="text-xs text-danger">Offline</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Manage Button */}
      <div className="p-2">
        <Button
          label="Manage Members"
          onClick={onManage}
          variant="primary"
          className="w-full"
        />
      </div>
    </div>
  );
};

export default ChatMembersDetailsPanel;
