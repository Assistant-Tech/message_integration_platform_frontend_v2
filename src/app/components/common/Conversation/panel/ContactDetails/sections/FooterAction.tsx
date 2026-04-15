import { UserPlus2 } from "lucide-react";
import { cn } from "@/app/utils/cn";

interface FooterActionProps {
  isAssigned: boolean;
  onAssignToggle: () => void;
}

const FooterAction = ({ isAssigned, onAssignToggle }: FooterActionProps) => (
  <div className="sticky bottom-0 border-t border-grey-light bg-base-white/95 px-4 py-4.5 backdrop-blur">
    <button
      type="button"
      onClick={onAssignToggle}
      className={cn(
        "group flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
        isAssigned
          ? "border border-grey-light bg-base-white text-grey hover:border-primary hover:bg-primary-light/40 hover:text-primary"
          : "bg-primary text-white shadow-sm hover:bg-primary/90 hover:shadow-md",
      )}
    >
      <UserPlus2 className="h-4 w-4 transition-transform group-hover:-rotate-12" />
      {isAssigned ? "Reassign conversation" : "Assign conversation"}
    </button>
  </div>
);

export default FooterAction;
