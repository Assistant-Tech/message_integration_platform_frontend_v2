import { Loader2 } from "lucide-react";
import { GenericDialog } from "@/app/components/common/";
import { Button } from "@/app/components/ui";

const ManageMembersDialog = ({
  open,
  onClose,
  members,
  onToggleMember,
  onAddRandom,
  membersLoading,
}: any) => {
  return (
    <GenericDialog
      open={open}
      onClose={onClose}
      title="Manage Members"
      maxWidth="max-w-md"
    >
      <div className="flex flex-col gap-4">
        <Button
          label="Add Random Members (Test)"
          onClick={onAddRandom}
          variant="primary"
        />

        {membersLoading ? (
          <p className="text-grey-medium flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading members...
          </p>
        ) : members.length === 0 ? (
          <p className="text-grey-medium">No members available.</p>
        ) : (
          <ul className="space-y-2 max-h-80 overflow-y-auto">
            {members.map((member: any) => (
              <li
                key={member.id}
                className="flex items-center justify-between p-3 border border-grey-light rounded-lg hover:bg-grey-light transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={
                      member.avatar ||
                      `https://ui-avatars.com/api/?name=${member.name}`
                    }
                    alt={member.name}
                    className="h-10 w-10 rounded-full object-cover border border-grey-light"
                  />
                  <div>
                    <p className="text-sm font-medium text-grey">
                      {member.name}
                    </p>
                    <p className="text-xs text-grey-medium">
                      {member.email || "No email"}
                    </p>
                  </div>
                </div>

                <input
                  type="checkbox"
                  checked={true}
                  onChange={(e) =>
                    onToggleMember(member.id, e.target.checked, member.name)
                  }
                  className="h-4 w-4 accent-information cursor-pointer"
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </GenericDialog>
  );
};

export default ManageMembersDialog;
