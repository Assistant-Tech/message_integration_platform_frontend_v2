import { Button } from "@/app/components/ui";
import { Loader2, User } from "lucide-react";

const ChatMembersDetailsPanel = ({
  members,
  loading = false,
  onMemberDetailsClose,
  onManage,
}: any) => {
  return (
    <div className="w-80 h-full border-l border-grey-light bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-grey-light">
        <h2 className="body-bold-16 text-grey">Members</h2>
        <button
          onClick={onMemberDetailsClose}
          className="text-grey-dark hover:text-black transition"
        >
          ✕
        </button>
      </div>

      {/* Members List */}
      <div className="w-96 flex-1 overflow-y-auto p-3 space-y-3">
        {loading ? (
          <div className="flex justify-center py-10 text-grey-light">
            <Loader2 className="animate-spin h-6 w-6" />
          </div>
        ) : members?.length === 0 ? (
          <div className="text-center py-10 text-grey-medium">
            No members found.
          </div>
        ) : (
          members.map((m: any) => (
            <ul
              key={m._id}
              className="flex items-start gap-3 p-2 rounded-lg hover:bg-grey-bg transition"
            >
              <li className="flex items-center gap-4">
                {/* Avatar */}
                {m.avatar ? (
                  <img
                    src={m.avatar}
                    className="h-10 w-10 rounded-full object-cover"
                    alt={m.name}
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-grey-bg flex items-center justify-center">
                    <User className="h-5 w-5 text-grey-dark" />
                  </div>
                )}

                {/* User Info */}
                <div className="flex flex-col">
                  <span className="body-bold-16 text-grey">{m.name}</span>
                  {m.email && (
                    <span className="body-semi-bold-16 text-grey-medium">
                      {m.email}
                    </span>
                  )}
                </div>
              </li>
            </ul>
          ))
        )}

        {/* Manage Button */}
        <Button
          label="Manage Members"
          onClick={onManage}
          variant="primary"
          className="mt-4 w-full"
        />
      </div>
    </div>
  );
};

export default ChatMembersDetailsPanel;
