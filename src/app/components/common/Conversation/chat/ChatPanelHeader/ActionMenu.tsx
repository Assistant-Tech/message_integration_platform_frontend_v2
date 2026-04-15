import { Menu } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Button } from "@/app/components/ui";
import { cn } from "@/app/utils/cn";
import {
  MENU_ITEM_ACTIVE,
  MENU_ITEM_BASE,
  MENU_ITEM_INACTIVE,
} from "./constants";
import type { ConversationAction } from "./types";

interface Props {
  actions: ConversationAction[];
}

const ActionMenu = ({ actions }: Props) => (
  <DropdownMenu.Root>
    <DropdownMenu.Trigger asChild>
      <Button
        variant="none"
        iconOnly
        size="xs"
        aria-label="Conversation actions"
        IconLeft={<Menu className="h-4 w-4" />}
        className="!h-9 !w-9 rounded-full border border-grey-light bg-base-white text-grey-medium hover:border-primary hover:bg-primary-light hover:text-primary"
      />
    </DropdownMenu.Trigger>

    <DropdownMenu.Portal>
      <DropdownMenu.Content
        align="end"
        sideOffset={8}
        className="z-50 min-w-[160px] rounded-2xl border border-grey-light bg-base-white p-2 shadow-md"
      >
        {actions.map(({ key, label, Icon, isActive, onSelect }) => (
          <DropdownMenu.Item
            key={key}
            onSelect={onSelect}
            className={cn(
              MENU_ITEM_BASE,
              isActive ? MENU_ITEM_ACTIVE : MENU_ITEM_INACTIVE,
            )}
          >
            <Icon className="h-4 w-4 flex-shrink-0" />
            <span>{label}</span>
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  </DropdownMenu.Root>
);

export default ActionMenu;
