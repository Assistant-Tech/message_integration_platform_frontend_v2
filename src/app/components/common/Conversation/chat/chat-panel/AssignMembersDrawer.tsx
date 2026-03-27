import { useEffect, useMemo, useState } from "react";
import { Loader2, UserPlus2, X } from "lucide-react";
import { Button } from "@/app/components/ui";
import { getAvatarUrl } from "@/app/utils/avatar";

interface AssignMembersDrawerProps {
  tenantUsers: any[];
  members: any[];
  membersLoading: boolean;
  isSaving: boolean;
  onClose: () => void;
  onSave: (nextSelectedIds: string[]) => Promise<void>;
}

const AssignMembersDrawer = ({
  tenantUsers,
  members,
  membersLoading,
  isSaving,
  onClose,
  onSave,
}: AssignMembersDrawerProps) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const normalizedUsers = useMemo(
    () =>
      (tenantUsers || []).map((item: any) => ({
        id: item?.user?.id,
        name: item?.user?.name || "Unknown",
        email: item?.user?.email || "No email",
        avatar: item?.user?.avatar ?? null,
      })),
    [tenantUsers],
  );

  useEffect(() => {
    setSelectedIds((members || []).map((member: any) => member.id));
  }, [members]);

  const toggleUser = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((userId) => userId !== id)
        : [...prev, id],
    );
  };

  const handleSave = async () => {
    await onSave(selectedIds);
  };

  return (
    <div className="h-full w-full max-w-[420px] border-l border-grey-light bg-base-white shadow-sm">
      <div className="flex items-center justify-between border-b border-grey-light px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-light text-primary">
            <UserPlus2 className="h-5 w-5" />
          </div>
          <div>
            <h3 className="label-semi-bold-14 text-grey">Assign Members</h3>
            <p className="text-xs text-grey-medium">
              Select members for this conversation
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-grey-light text-grey-medium transition-colors hover:bg-primary-light hover:text-primary"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex h-[calc(100%-72px)] flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          {membersLoading ? (
            <div className="flex items-center gap-2 py-6 text-grey-medium">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading users...
            </div>
          ) : normalizedUsers.length === 0 ? (
            <p className="text-sm text-grey-medium">
              No tenant users available.
            </p>
          ) : (
            <ul className="space-y-2">
              {normalizedUsers.map((user) => {
                const checked = selectedIds.includes(user.id);

                return (
                  <li
                    key={user.id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-grey-light px-3 py-2"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <img
                        src={getAvatarUrl(user.avatar)}
                        alt={user.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-grey">
                          {user.name}
                        </p>
                        <p className="truncate text-xs text-grey-medium">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleUser(user.id)}
                      className="h-4 w-4 cursor-pointer accent-primary"
                    />
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="border-t border-grey-light p-4">
          <Button
            label={isSaving ? "Saving..." : "Save Assignment"}
            onClick={handleSave}
            variant="primary"
            className="w-full"
            disabled={isSaving}
          />
        </div>
      </div>
    </div>
  );
};

export default AssignMembersDrawer;
