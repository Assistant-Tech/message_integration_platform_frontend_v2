import { UserRound, X } from "lucide-react";

interface HeaderProps {
  onClose: () => void;
}

const Header = ({ onClose }: HeaderProps) => (
  <div className="sticky top-0 z-10 flex h-18 items-center justify-between gap-3 border-b border-grey-light bg-base-white/95 px-4 py-6 backdrop-blur">
    <div className="flex min-w-0 items-center gap-2.5">
      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
        <UserRound className="h-4 w-4" />
      </span>
      <h3 className="truncate text-sm font-semibold text-grey">
        Customer details
      </h3>
    </div>
    <button
      type="button"
      onClick={onClose}
      aria-label="Close customer details"
      className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-grey-medium transition-colors hover:bg-grey-light hover:text-grey"
    >
      <X className="h-4 w-4" />
    </button>
  </div>
);

export default Header;
