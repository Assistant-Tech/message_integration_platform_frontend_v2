import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { getAvatarUrl } from "@/app/utils/avatar";
import { getInitials } from "@/app/components/common/Conversation/panel/helpers";

interface Props {
  userName: string;
  userRole: string;
  hasUser: boolean;
  profileRoute: string;
  onLogout: () => void;
}

// Note: this trigger uses a native <button> because its content
// (avatar + name/role + chevron) can't be expressed via Button's
// label/IconLeft/IconRight slots — Button doesn't render `children`.
const ProfileMenu = ({
  userName,
  userRole,
  hasUser,
  profileRoute,
  onLogout,
}: Props) => (
  <DropdownMenu.Root>
    <DropdownMenu.Trigger asChild>
      <button
        type="button"
        className="flex items-center gap-3 rounded-full border border-grey-light bg-base-white px-3 py-2 text-left transition-colors hover:bg-primary-light"
      >
        {hasUser ? (
          <img
            src={getAvatarUrl()}
            alt={userName}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light text-sm font-semibold text-primary">
            {getInitials(userName)}
          </div>
        )}
        <div className="hidden min-w-0 sm:block">
          <p className="truncate text-sm font-semibold text-grey">{userName}</p>
          <p className="truncate text-xs text-grey-medium">{userRole}</p>
        </div>
        <ChevronDown size={20} className="text-grey-medium" />
      </button>
    </DropdownMenu.Trigger>

    <DropdownMenu.Content
      sideOffset={8}
      align="end"
      className="z-50 min-w-[180px] rounded-2xl border border-grey-light bg-base-white p-2 shadow-sm"
    >
      <Link to={profileRoute}>
        <DropdownMenu.Item className="rounded-xl px-4 py-2 text-sm text-grey outline-none transition-colors hover:bg-primary-light">
          Profile
        </DropdownMenu.Item>
      </Link>
      <DropdownMenu.Item
        className="rounded-xl px-4 py-2 text-sm text-danger outline-none transition-colors hover:bg-danger-light"
        onClick={onLogout}
      >
        Logout
      </DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
);

export default ProfileMenu;
