import { LucideIcon } from "lucide-react";

export interface ServiceItem {
  id: number;
  icon: LucideIcon;
  title: string;
  description: string;
  img?: string;
}

export enum Status {
  pending = "Pending",
  success = "Success",
  failed = "Failed",
  inprogress = "In Progress",
}

export interface Product {
  name: string;
  price: number;
  SKU: string;
  variants: string;
  visibility: boolean;
  status: Status;
  color: string;
  action: string;
}

export interface ProductTableProps {
  data: Product[];
}
