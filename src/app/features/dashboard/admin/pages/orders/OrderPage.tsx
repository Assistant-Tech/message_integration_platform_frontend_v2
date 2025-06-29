import { useState } from "react";
import { Heading } from "@/app/features/dashboard/admin/component/ui/";
import {
  OrderStats,
  OrderTable,
} from "@/app/features/dashboard/admin/component/";
import { Input, Button } from "@/app/components/ui/";
import { Plus, Settings2, SlidersHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "@/app/constants/routes";

const OrderPage = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleCreateNewOrder = () => {
    navigate(APP_ROUTES.ADMIN.ORDERS_CREATE);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="w-full flex justify-between items-center">
        <Heading title="Orders" align="left" className="text-base-black" />
        <Button
          label="Create New Order"
          IconLeft={<Plus size={24} />}
          variant="primary"
          onClick={handleCreateNewOrder}
        />
      </div>

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

      <OrderTable />
    </div>
  );
};

export default OrderPage;
