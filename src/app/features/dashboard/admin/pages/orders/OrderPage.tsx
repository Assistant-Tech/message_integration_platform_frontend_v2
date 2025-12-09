import { useEffect, useMemo, useState } from "react";
import { Heading } from "@/app/features/dashboard/admin/component/ui/";
import {
  OrderStats,
  OrderTable,
} from "@/app/features/dashboard/admin/component/";
import { Button } from "@/app/components/ui/";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProductSearchBar from "@/app/components/common/Search/ProductSearchBar";
import { getOrders } from "@/app/services/order.services";
import { buildOrderStats } from "@/app/utils/admin/order.config";
import { Order } from "@/app/types/order.types";

const sortingOptions = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "Price: Low to High", value: "low-high" },
  { label: "Price: High to Low", value: "high-low" },
];

const OrderPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [category, setCategory] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await getOrders();
        setOrders(res.data);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // ✅ Memoized stats calculation
  const stats = useMemo(() => buildOrderStats(orders), [orders]);
  console.log("🚀 ~ OrderPage ~ stats:", stats)

  const handleCreateNewOrder = () => {
    navigate("createOrder");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="w-full flex justify-between items-center">
        <Heading title="Orders" align="left" className="text-base-black" />
        <Button
          label="Create New Order"
          IconLeft={<Plus size={24} />}
          variant="primary"
          onClick={handleCreateNewOrder}
        />
      </div>

      {/* ✅ Stats */}
      <OrderStats stats={stats} />

      {/* ✅ Filters */}
      <ProductSearchBar
        search={search}
        setSearch={setSearch}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortingOptions={sortingOptions}
        category={category}
        setCategory={setCategory}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {/* ✅ Table */}
      <OrderTable
        search={search}
        sortBy={sortBy}
        category={category}
        statusFilter={statusFilter}
      />
    </div>
  );
};

export default OrderPage;
