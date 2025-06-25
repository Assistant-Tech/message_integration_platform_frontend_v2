import { useState } from "react";
import { Heading } from "@/app/features/dashboard/admin/component/ui/";
import {
  OrderStats,
  OrderTable,
} from "@/app/features/dashboard/admin/component/";
import { Input, Button } from "@/app/components/ui/";
import { Settings2, SlidersHorizontal } from "lucide-react";
import { DUMMY_DATA, Order } from "@/app/utils/admin/Order";

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
