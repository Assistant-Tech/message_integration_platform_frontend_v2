import { Menu, X } from "lucide-react";

interface MobileMenuToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

const MobileMenuToggle: React.FC<MobileMenuToggleProps> = ({
  isOpen,
  onToggle,
}) => (
  <button
    onClick={onToggle}
    className="lg:hidden p-2 rounded-md text-gray hover:text-primary transition-colors"
    aria-label={isOpen ? "Close menu" : "Open menu"}
  >
    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
  </button>
);
export default MobileMenuToggle;
