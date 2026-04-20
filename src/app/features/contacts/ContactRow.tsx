import { motion } from "framer-motion";
import { MessageSquare, MoreHorizontal, Mail, Phone } from "lucide-react";
import { cn } from "@/app/utils/cn";
import { STATUS_STYLES, CHANNEL_META } from "./constants";
import type { ContactRecord } from "./types";

import whatsappIcon from "@/app/assets/dashboard-icons/whatsapp.svg";
import fbIcon from "@/app/assets/dashboard-icons/fb.svg";
import instaIcon from "@/app/assets/dashboard-icons/insta.svg";
import tiktokIcon from "@/app/assets/dashboard-icons/tiktok.svg";

const CHANNEL_ICONS: Record<string, string> = {
  WHATSAPP: whatsappIcon,
  FACEBOOK: fbIcon,
  INSTAGRAM: instaIcon,
  TIKTOK: tiktokIcon,
};

const AVATAR_PALETTES = [
  "bg-primary/15 text-primary",
  "bg-secondary/15 text-secondary-dark",
  "bg-information/15 text-information",
  "bg-success/15 text-success-dark",
  "bg-warning/15 text-warning-dark",
  "bg-danger/15 text-danger",
] as const;

const getColor = (name: string): string => {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + h * 31;
  return AVATAR_PALETTES[Math.abs(h) % AVATAR_PALETTES.length] ?? AVATAR_PALETTES[0];
};

const getInitials = (name: string): string =>
  name.split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("");

interface ContactRowProps {
  contact: ContactRecord;
  index: number;
}

const ContactRow = ({ contact, index }: ContactRowProps) => {
  const status = STATUS_STYLES[contact.status];
  const channel = CHANNEL_META[contact.channel];

  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, delay: 0.02 + index * 0.03 }}
      className="group border-b border-grey-light/40 last:border-b-0 transition-colors hover:bg-primary-light/8"
    >
      {/* Name + Avatar */}
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div className="relative flex-shrink-0">
            <div
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold select-none",
                getColor(contact.name),
              )}
            >
              {getInitials(contact.name)}
            </div>
            <span
              className={cn("absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white", status.dot)}
            />
          </div>
          <div className="min-w-0">
            <p className="body-semi-bold-16 truncate text-grey">{contact.name}</p>
            <p className="caption-medium-12 truncate text-grey-medium">{contact.company}</p>
          </div>
        </div>
      </td>

      {/* Contact info */}
      <td className="hidden px-5 py-3.5 lg:table-cell">
        <div className="space-y-0.5">
          <p className="label-regular-14 flex items-center gap-1.5 text-grey">
            <Mail className="h-3 w-3 text-grey-medium" strokeWidth={1.8} />
            {contact.email}
          </p>
          <p className="caption-medium-12 flex items-center gap-1.5 text-grey-medium">
            <Phone className="h-3 w-3" strokeWidth={1.8} />
            {contact.phone}
          </p>
        </div>
      </td>

      {/* Channel */}
      <td className="hidden px-5 py-3.5 md:table-cell">
        <span className="inline-flex items-center gap-2 rounded-full px-2.5 py-1">
          {CHANNEL_ICONS[contact.channel] ? (
            <img
              src={CHANNEL_ICONS[contact.channel]}
              alt={channel?.label}
              className="h-4 w-4 flex-shrink-0"
            />
          ) : (
            <span
              className="h-3 w-3 flex-shrink-0 rounded-full"
              style={{ backgroundColor: channel?.color }}
            />
          )}
          <span className="label-medium-14 text-grey">{channel?.label}</span>
        </span>
      </td>

      {/* Tags */}
      <td className="hidden px-5 py-3.5 xl:table-cell">
        <div className="flex flex-wrap gap-1">
          {contact.tags.length > 0 ? (
            contact.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-primary/8 px-2 py-0.5 caption-medium-12 text-primary"
              >
                {tag}
              </span>
            ))
          ) : (
            <span className="caption-medium-12 text-grey-medium/50">—</span>
          )}
        </div>
      </td>

      {/* Last message */}
      <td className="hidden px-5 py-3.5 sm:table-cell">
        <div>
          <p className="label-medium-14 text-grey">{contact.lastMessageAt}</p>
          <p className="caption-medium-12 text-grey-medium">
            {contact.conversationCount} conversations
          </p>
        </div>
      </td>

      {/* Status */}
      <td className="px-5 py-3.5">
        <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1", status.bg)}>
          <span className={cn("h-1.5 w-1.5 rounded-full", status.dot)} />
          <span className={cn("caption-medium-12 font-medium", status.text)}>{status.label}</span>
        </span>
      </td>

      {/* Actions */}
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label={`Message ${contact.name}`}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-grey-medium transition-all hover:bg-primary/10 hover:text-primary"
          >
            <MessageSquare className="h-4 w-4" strokeWidth={1.8} />
          </button>
          <button
            type="button"
            aria-label={`More actions for ${contact.name}`}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg text-grey-medium",
              "opacity-0 transition-all group-hover:opacity-100",
              "hover:bg-grey-light/50",
            )}
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </td>
    </motion.tr>
  );
};

export default ContactRow;
