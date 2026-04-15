export interface InternalChannelPayloadType {
  title: string;
  type: "internal" | "whatsapp" | "facebook" | "instagram";
  channel: "internal" | "external";
  isDefault: boolean;
  priority: string;
  participants: string[];
}
