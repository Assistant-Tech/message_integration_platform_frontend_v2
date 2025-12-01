import { useState } from "react";
import {
  DataTableToolbar,
  Heading,
} from "@/app/features/dashboard/admin/component/ui/";
import {
  OrderStats,
  OrderTable,
} from "@/app/features/dashboard/admin/component/";
import { Button } from "@/app/components/ui/";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OrderPage = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleCreateNewOrder = () => {
    navigate("createOrder");
  };

  const handleFilterClick = () => {
    console.log("Filter clicked!");
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

      {/* 🔹 Reusable DataTableToolbar */}
      <DataTableToolbar
        search={search}
        onSearchChange={setSearch}
        onFilterClick={handleFilterClick}
      />

      <OrderTable />
    </div>
  );
};

export default OrderPage;
