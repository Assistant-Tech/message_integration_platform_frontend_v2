import { Button } from "@/app/components/ui";
import { cn } from "@/app/utils/cn";
import { PILL_ACTIVE, PILL_BASE, PILL_INACTIVE } from "./constants";
import type { ConversationAction } from "./types";

interface Props {
  action: ConversationAction;
}

const ActionPill = ({ action }: Props) => (
  <Button
    variant="none"
    size="xs"
    label={action.label}
    IconLeft={<action.Icon className="h-3.5 w-3.5" />}
    onClick={action.onSelect}
    className={cn(PILL_BASE, action.isActive ? PILL_ACTIVE : PILL_INACTIVE)}
  />
);

export default ActionPill;
