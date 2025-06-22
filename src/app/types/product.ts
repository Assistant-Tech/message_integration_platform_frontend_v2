import { LucideIcon } from "lucide-react";

export interface ServiceItem {
  id: number;
  icon: LucideIcon;
  title: string;
  description: string;
  img?: string;
}
