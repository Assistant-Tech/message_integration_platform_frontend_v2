import type { MessageSenderType } from "@/app/types/message.types";

import type { UISenderType } from "@/app/types/message.types";

/**
 * Map a raw API sender type to the UI sender type used in the inbox.
 */
export function toUISender(senderType: MessageSenderType): UISenderType {
  switch (senderType) {
    case "AGENT":
      return "agent";
    case "CUSTOMER":
    case "CONTACT":
      return "customer";
    default:
      return "system";
  }
}
