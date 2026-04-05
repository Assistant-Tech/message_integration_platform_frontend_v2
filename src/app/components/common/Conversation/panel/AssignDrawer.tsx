import { UserPlus2, X } from "lucide-react";
import { cn } from "@/app/utils/cn";

interface AssigneeOption {
  id: string;
  label: string;
  role: "Admin" | "Member";
}

interface Props {
  contactName: string;
  assignedTo?: string;
  options: AssigneeOption[];
  onAssign: (assigneeId: string | undefined) => void;
  onClose: () => void;
}

const AssignDrawer = ({
  contactName,
  assignedTo,
  options,
  onAssign,
  onClose,
}: Props) => {
  return (
    <aside className="flex h-full flex-col overflow-y-auto bg-base-white">
      <div className="flex items-center justify-between border-b border-grey-light px-5 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-light text-primary">
            <UserPlus2 className="h-5 w-5" />
          </div>
          <div>
            <h3 className="label-semi-bold-14 text-grey">Assign Members</h3>
            <p className="text-sm text-grey-medium">{contactName}</p>
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

      <div className="space-y-3 p-5">
        <button
          type="button"
          onClick={() => onAssign(undefined)}
          className={cn(
            "w-full rounded-xl border px-4 py-3 text-left transition-colors",
            !assignedTo
              ? "border-primary bg-primary-light"
              : "border-grey-light hover:bg-primary-light/40",
          )}
        >
          <p className="text-sm font-semibold text-grey">Unassigned</p>
          <p className="text-xs text-grey-medium">No one is assigned yet</p>
        </button>

        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onAssign(option.id)}
            className={cn(
              "w-full rounded-xl border px-4 py-3 text-left transition-colors",
              assignedTo === option.id
                ? "border-primary bg-primary-light"
                : "border-grey-light hover:bg-primary-light/40",
            )}
          >
            <p className="text-sm font-semibold text-grey">{option.label}</p>
            <p className="text-xs text-grey-medium">{option.role}</p>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default AssignDrawer;
