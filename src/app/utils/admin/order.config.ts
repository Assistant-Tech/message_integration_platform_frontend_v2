import { Order } from "@/app/types/order.types";

export const buildOrderStats = (orders: Order[]) => {
  const total = orders.length;
  const paid = orders.filter((o) => o.status === "PAID").length;
  const shipped = orders.filter((o) => o.status === "SHIPPED").length;
  const delivered = orders.filter((o) => o.status === "DELIVERED").length;
  const cancelled = orders.filter((o) => o.status === "CANCELLED").length;
  const pending = orders.filter((o) => o.status === "PENDING").length;

  return [
    { label: "Total Orders", count: total, color: "bg-primary-inactive" },
    { label: "Paid", count: paid, color: "bg-secondary-light" },
    { label: "Shipped", count: shipped, color: "bg-information-light" },
    { label: "Delivered", count: delivered, color: "bg-primary-light" },
    { label: "Cancelled", count: cancelled, color: "bg-danger-light" },
    { label: "Pending", count: pending, color: "bg-warning-light" },
  ];
};