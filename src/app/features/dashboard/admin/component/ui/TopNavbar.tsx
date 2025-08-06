import { Input } from "@/app/components/ui";
import { Bell, ChevronDown, HelpCircle, Search } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

const TopNavbar = () => {
  return (
    <header className="w-full bg-base-white border-b border-grey-light h-auto flex items-center px-6 py-4 justify-between">
      {/* Search Bar */}
      <div className="flex justify-start items-center mx-4 gap-6 w-full max-w-full">
        <div className="relative w-full max-w-md sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-grey-light" />
          </div>
          <Input
            type="text"
            placeholder="Search"
            className="block w-full pl-10 pr-3 py-3 border border-grey-light rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
          />
        </div>
      </div>

      {/* Right (Icons and Profile) */}
      <div className="flex items-center gap-8">
        <HelpCircle
          color="grey"
          size={24}
          className="text-grey-medium cursor-pointer"
        />
        <Bell
          color="grey"
          size={24}
          className="text-grey-medium cursor-pointer"
        />

        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="flex items-center gap-2 px-3 py-3 focus:outline-none cursor-pointer border-s-2 border-grey-light w-40">
              <div className="w-6 h-6 rounded-full bg-grey-medium" />
              <span className="body-regular-16 text-grey">Jane Doe</span>
              <ChevronDown size={24} color="grey" />
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Content
            sideOffset={8}
            align="end"
            className="z-50 w-40 bg-white rounded "
          >
            <DropdownMenu.Item className="px-4 py-2 text-sm cursor-pointer border-none">
              Profile
            </DropdownMenu.Item>
            <DropdownMenu.Item className="px-4 py-2 text-sm cursor-pointer border-none">
              Logout
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </header>
  );
};

export default TopNavbar;
