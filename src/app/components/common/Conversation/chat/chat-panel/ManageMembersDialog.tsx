import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { GenericDialog } from "@/app/components/common/";
import { Button } from "@/app/components/ui";
import { getAvatarUrl } from "@/app/utils/avatar";

const ManageMembersDialog = ({
  open,
  onClose,
  tenantUsers,
  members,
  onToggleMember,
  onAddRandom,
  membersLoading,
}: any) => {
  const [localSelection, setLocalSelection] = useState<any[]>([]);

  const normalizedUsers = tenantUsers?.map((item: any) => ({
    id: item.user.id,
    name: item.user.name,
    email: item.user.email,
    avatar: item.user.avatar ?? null,
    role: item.role.type,
  }));

  useEffect(() => {
    if (open && normalizedUsers) {
      const initialState = normalizedUsers.map((u: any) => ({
        ...u,
        selected: members.some((m: any) => m.id === u.id),
      }));

      setLocalSelection(initialState);
    }
  }, [open, tenantUsers, members]);

  const handleSelectToggle = (id: string, checked: boolean) => {
    setLocalSelection((prev) =>
      prev.map((u) => (u.id === id ? { ...u, selected: checked } : u)),
    );
  };

  const handleSave = () => {
    localSelection.forEach((user) => {
      onToggleMember(user.id, user.selected, user.name);
    });

    onClose();
  };

  return (
    <GenericDialog
      open={open}
      onClose={onClose}
      title="Manage Members"
      maxWidth="max-w-md"
    >
      <div className="flex flex-col gap-4">
        {onAddRandom && (
          <Button
            label="Add Random Members (Test)"
            onClick={onAddRandom}
            variant="primary"
          />
        )}

        {membersLoading ? (
          <p className="text-grey-medium flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading users...
          </p>
        ) : localSelection?.length === 0 ? (
          <p className="text-grey-medium">No tenant users available.</p>
        ) : (
          <ul className="space-y-2 max-h-80 overflow-y-auto">
            {localSelection.map((user: any) => (
              <li
                key={user.id}
                className="flex items-center justify-between p-3 border border-grey-light rounded-lg hover:bg-grey-light transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={getAvatarUrl(user.avatar)}
                    alt={user.name}
                    className="h-10 w-10 rounded-full object-cover border border-grey-light"
                  />

                  <div>
                    <p className="text-sm font-medium text-grey">{user.name}</p>
                    <p className="text-xs text-grey-medium">
                      {user.email || "No email"}
                    </p>
                  </div>
                </div>

                <input
                  type="checkbox"
                  checked={user.selected}
                  onChange={(e) =>
                    handleSelectToggle(user.id, e.target.checked)
                  }
                  className="h-4 w-4 accent-information cursor-pointer"
                />
              </li>
            ))}
          </ul>
        )}

        {/* Save button */}
        <Button label="Save Changes" variant="primary" onClick={handleSave} />
      </div>
    </GenericDialog>
  );
};

export default ManageMembersDialog;
