import { useState } from "react";
import { Heading } from "@/app/features/dashboard/admin/component/ui/";
import {
  OrderStats,
  OrderTable,
} from "@/app/features/dashboard/admin/component/";
import { Input, Button } from "@/app/components/ui/";
import { Settings2, SlidersHorizontal } from "lucide-react";

interface Order {
  id: string;
  name: string;
  createdAt: string;
  total: number;
  payment: "Paid" | "Unpaid" | "Pending";
  status: "Confirmed" | "Shipped" | "Delivered" | "Cancelled";
}
const DUMMY_DATA: Order[] = [
  {
    id: "ORD-001",
    name: "John Doe",
    createdAt: "2025-06-20",
    total: 2499,
    payment: "Paid",
    status: "Confirmed",
  },
  {
    id: "ORD-002",
    name: "Jane Smith",
    createdAt: "2025-06-21",
    total: 3499,
    payment: "Pending",
    status: "Shipped",
  },
  {
    id: "ORD-003",
    name: "Alice Johnson",
    createdAt: "2025-06-22",
    total: 1799,
    payment: "Paid",
    status: "Delivered",
  },
  {
    id: "ORD-004",
    name: "Bob Lee",
    createdAt: "2025-06-23",
    total: 2999,
    payment: "Unpaid",
    status: "Cancelled",
  },
  {
    id: "ORD-005",
    name: "Charlie Brown",
    createdAt: "2025-06-24",
    total: 1599,
    payment: "Paid",
    status: "Confirmed",
  },
];

const OrderPage = () => {
  const [search, setSearch] = useState("");
  const [orders] = useState<Order[]>(DUMMY_DATA);

  const filteredData = orders.filter((order) =>
    order.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="p-6 space-y-6">
      <Heading title="Orders" align="left" className="text-base-black" />

      <OrderStats />

      {/* Search + Filter */}
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/2"
        />
        <Button
          variant="outlined"
          label="Filter"
          className="flex items-center gap-2 text-grey border-grey hover:border-primary"
          IconLeft={<Settings2 size={24} />}
        >
          <SlidersHorizontal className="w-4 h-4" />
        </Button>
      </div>

      <OrderTable data={filteredData} />
    </div>
  );
};

export default OrderPage;
