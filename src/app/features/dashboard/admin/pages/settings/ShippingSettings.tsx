import React, { useState, useMemo } from "react";
import {
  MoreVertical,
  X,
  Plus,
} from "lucide-react";
import { motion } from "framer-motion";
import { ColumnDef } from "@tanstack/react-table";
import GenericTable from "@/app/features/dashboard/admin/component/table/GenericTable";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type Provider = {
  id: string;
  name: string;
  logo: string;
};

type ShippingRecord = {
  shipping_id: string;
  name: string;
  order_id: string;
  order_date: string;
  delivery_date: string;
  status: "pending" | "in-transit" | "delivered" | "cancelled";
};

const providers: Provider[] = [
  {
    id: "nepal-can-move",
    name: "Nepal Can Move",
    logo: "https://res.cloudinary.com/dtoqwn0gx/image/upload/v1755852429/ship_ni9brc.png",
  },
  {
    id: "pathao",
    name: "Pathao",
    logo: "https://res.cloudinary.com/dtoqwn0gx/image/upload/v1755852883/pathao_yehz6e.webp",
  },
  {
    id: "aramex",
    name: "Aramex",
    logo: "https://res.cloudinary.com/dtoqwn0gx/image/upload/v1755852428/ship2_k0yc8x.png",
  },
];

// Mock shipping data
const mockShippingData: ShippingRecord[] = [
  {
    shipping_id: "SHP-001",
    name: "Nepal Can Move",
    order_id: "ORD-2024-001",
    order_date: "2024-12-01",
    delivery_date: "2024-12-05",
    status: "delivered",
  },
  {
    shipping_id: "SHP-002",
    name: "Pathao",
    order_id: "ORD-2024-002",
    order_date: "2024-12-10",
    delivery_date: "2024-12-15",
    status: "in-transit",
  },
  {
    shipping_id: "SHP-003",
    name: "Aramex",
    order_id: "ORD-2024-003",
    order_date: "2024-12-12",
    delivery_date: "2024-12-18",
    status: "pending",
  },
  {
    shipping_id: "SHP-004",
    name: "Nepal Can Move",
    order_id: "ORD-2024-004",
    order_date: "2024-12-14",
    delivery_date: "2024-12-20",
    status: "in-transit",
  },
  {
    shipping_id: "SHP-005",
    name: "Pathao",
    order_id: "ORD-2024-005",
    order_date: "2024-12-08",
    delivery_date: "2024-12-12",
    status: "delivered",
  },
];

const AccountInfoModal = ({
  onClose,
  provider,
}: {
  onClose: () => void;
  provider: Provider;
}) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-grey">Account Info</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-grey-medium"
          >
            <X size={20} />
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-grey-medium">Provider</span>
            <span className="text-sm font-medium text-grey">
              {provider.name}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-grey-medium">Username</span>
            <span className="text-sm font-medium text-grey">
              Seamans Furniture
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-grey-medium">CID</span>
            <span className="text-sm font-medium text-grey">1234567890</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ShippingSettings = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>("nepal-can-move");
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(
    null,
  );
  const [shippingData] = useState<ShippingRecord[]>(mockShippingData);

  const handleMenuClick = (e: React.MouseEvent, providerId: string) => {
    e.stopPropagation();
    setMenuOpen(menuOpen === providerId ? null : providerId);
  };

  const handleViewInfo = (e: React.MouseEvent, provider: Provider) => {
    e.stopPropagation();
    setSelectedProvider(provider);
    setShowModal(true);
    setMenuOpen(null);
  };

  const handleAddApiKey = (e: React.MouseEvent, provider: Provider) => {
    e.stopPropagation();
    setMenuOpen(null);

    // Navigate to integration page with provider query parameter
    navigate(
      `/tenant-example-1/admin/settings/integration?provider=${provider.id}`,
    );
  };

  const handleUnlink = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success("Account unlinked successfully");
    setMenuOpen(null);
  };

  const getStatusColor = (status: ShippingRecord["status"]) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-700";
      case "in-transit":
        return "bg-blue-100 text-blue-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const columns = useMemo<ColumnDef<ShippingRecord>[]>(
    () => [
      {
        accessorKey: "shipping_id",
        header: "Shipping ID",
        cell: (info) => (
          <span className="font-mono text-sm">{info.getValue() as string}</span>
        ),
      },
      {
        accessorKey: "name",
        header: "Provider",
        cell: (info) => (
          <span className="font-medium">{info.getValue() as string}</span>
        ),
      },
      {
        accessorKey: "order_id",
        header: "Order ID",
        cell: (info) => (
          <span className="font-mono text-sm">{info.getValue() as string}</span>
        ),
      },
      {
        accessorKey: "order_date",
        header: "Order Date",
        cell: (info) => (
          <span>
            {new Date(info.getValue() as string).toLocaleDateString()}
          </span>
        ),
      },
      {
        accessorKey: "delivery_date",
        header: "Delivery Date",
        cell: (info) => (
          <span>
            {new Date(info.getValue() as string).toLocaleDateString()}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => {
          const status = info.getValue() as ShippingRecord["status"];
          return (
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          );
        },
      },
    ],
    [],
  );

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <motion.article className="flex flex-col text-start mb-6">
        <h1 className="h4-bold-24 text-grey mb-2">Settings</h1>
        <h2 className="body-semi-bold-16 text-primary">Shipping</h2>
      </motion.article>

      {/* Providers Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-grey mb-4">
          Shipping Providers
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {providers.map((provider) => (
            <div
              key={provider.id}
              className={`relative flex items-center gap-4 rounded-xl border-2 p-4 pr-3 cursor-pointer transition
              ${selected === provider.id ? "border-primary" : "border-grey-light"}`}
              onClick={() => setSelected(provider.id)}
            >
              {/* Logo */}
              <img
                src={provider.logo}
                alt={provider.name}
                className="w-12 h-12 rounded-lg object-contain"
              />

              {/* Info */}
              <div className="flex-1">
                <h3 className="h5-bold-16 text-grey">{provider.name}</h3>
              </div>

              {/* More Menu */}
              <div className="ml-auto relative">
                <button
                  onClick={(e) => handleMenuClick(e, provider.id)}
                  className="p-1 rounded text-grey-medium hover:bg-base-white"
                >
                  <MoreVertical size={18} />
                </button>
                {menuOpen === provider.id && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-grey-light rounded-md shadow-lg z-10 overflow-hidden">
                    <button
                      onClick={(e) => handleAddApiKey(e, provider)}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 body-regular-16 text-grey-medium hover:bg-base-white"
                    >
                      <Plus size={16} />
                      Add API Key
                    </button>
                    <button
                      onClick={(e) => handleViewInfo(e, provider)}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 body-regular-16 text-grey-medium hover:bg-base-white"
                    >
                      View Account Info
                    </button>
                    <button
                      onClick={handleUnlink}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 body-regular-16 text-danger hover:bg-base-white"
                    >
                      Unlink Account
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shipping Records Table */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-grey mb-4">
          Shipping Records
        </h3>
        <GenericTable
          data={shippingData}
          columns={columns}
          emptyMessage="No shipping records found"
        />
      </div>

      {/* Modals */}
      {showModal && selectedProvider && (
        <AccountInfoModal
          onClose={() => {
            setShowModal(false);
            setSelectedProvider(null);
          }}
          provider={selectedProvider}
        />
      )}
    </div>
  );
};

export default ShippingSettings;
