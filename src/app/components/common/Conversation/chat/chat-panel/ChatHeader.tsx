import {
  Info,
  Package,
  PackageSearch,
  Search,
  UsersRoundIcon,
} from "lucide-react";

import * as Tooltip from "@radix-ui/react-tooltip";
import { TooltipProvider } from "../../../Tooltip";

const ChatHeader = ({
  conversation,
  members,
  onToggleDetails,
  isMembersPanelOpen,
  isOrderInfoOpen,
  isProductSearchOpen,
  // isOrderNotesOpen,
}: any) => {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between py-2 px-4 bg-white border-b border-grey-light">
      <div className="flex items-start gap-2">
        <div>
          <h2 className="h5-bold-16 text-base-grey">
            {conversation?.title || "Untitled Conversation"}
          </h2>
          <p className="text-sm text-grey-medium">
            {members?.length || 0} members
          </p>
        </div>
      </div>

      <div className="flex justify-end items-center gap-1">
        <TooltipProvider>
          {/* Order Notes */}
          {/* <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button
                onClick={isOrderNotesOpen}
                className="p-2 py-px hover:bg-primary hover:text-white rounded-lg transition-colors border border-primary cursor-pointer"
              >
                Notes
              </button>
            </Tooltip.Trigger>
            <Tooltip.Content
              side="bottom"
              className="rounded-md bg-grey text-white px-2 py-1 text-xs"
            >
              Order Notes
            </Tooltip.Content>
          </Tooltip.Root> */}

          {/* PRODUCT CATALOG */}
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button
                onClick={isProductSearchOpen}
                className="p-2 hover:bg-grey-light rounded-lg transition-colors"
              >
                <Package size={20} className="text-grey-medium" />
              </button>
            </Tooltip.Trigger>
            <Tooltip.Content
              side="bottom"
              className="rounded-md bg-grey text-white px-2 py-1 text-xs"
            >
              Product Catalog
            </Tooltip.Content>
          </Tooltip.Root>
          {/* ORDER INFO */}
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button
                onClick={isOrderInfoOpen}
                className="p-2 hover:bg-grey-light rounded-lg transition-colors"
              >
                <Search size={20} className="text-grey-medium" />
              </button>
            </Tooltip.Trigger>
            <Tooltip.Content
              side="bottom"
              className="rounded-md bg-grey text-white px-2 py-1 text-xs"
            >
              Order Information
            </Tooltip.Content>
          </Tooltip.Root>

          {/* MEMBERS */}
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button
                onClick={isMembersPanelOpen}
                className="p-2 hover:bg-grey-light rounded-lg transition-colors"
              >
                <UsersRoundIcon size={20} className="text-grey-medium" />
              </button>
            </Tooltip.Trigger>
            <Tooltip.Content
              side="bottom"
              className="rounded-md bg-grey text-white px-2 py-1 text-xs"
            >
              Members Details
            </Tooltip.Content>
          </Tooltip.Root>

          {/* DETAILS */}
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button
                onClick={onToggleDetails}
                className="p-2 hover:bg-grey-light rounded-lg transition-colors"
              >
                <Info size={20} className="text-grey-medium" />
              </button>
            </Tooltip.Trigger>
            <Tooltip.Content
              side="bottom"
              className="rounded-md bg-grey text-white px-2 py-1 text-xs"
            >
              Conversation Details
            </Tooltip.Content>
          </Tooltip.Root>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ChatHeader;
