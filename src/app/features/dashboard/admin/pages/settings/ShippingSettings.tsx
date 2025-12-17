import React, { useState, useMemo } from "react";
import { MoreVertical, X, Plus, Eye, EyeOff, Check, AlertCircle, Key, Edit2, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { ColumnDef } from "@tanstack/react-table";
import GenericTable from "@/app/features/dashboard/admin/component/table/GenericTable";
import { toast } from "sonner";

type Provider = {
  id: string;
  name: string;
  description: string;
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
    description: "Maecenas dignissim justo eget nulla rutrum molestie.d nibh id sem dignissim finibus ac sit",
    logo: "https://res.cloudinary.com/dtoqwn0gx/image/upload/v1755852429/ship_ni9brc.png",
  },
  {
    id: "pathao",
    name: "Pathao",
    description: "Maecenas dignissim justo eget nulla rutrum molestie.d nibh id sem dignissim finibus ac sit",
    logo: "https://res.cloudinary.com/dtoqwn0gx/image/upload/v1755852883/pathao_yehz6e.webp",
  },
  {
    id: "aramex",
    name: "Aramex",
    description: "Maecenas dignissim justo eget nulla rutrum molestie.d nibh id sem dignissim finibus ac sit",
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
  provider 
}: { 
  onClose: () => void;
  provider: Provider;
}) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-grey">Account Info</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-grey-medium">
            <X size={20} />
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-grey-medium">Provider</span>
            <span className="text-sm font-medium text-grey">{provider.name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-grey-medium">Username</span>
            <span className="text-sm font-medium text-grey">Seamans Furniture</span>
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

const ApiKeyModal = ({
  isOpen,
  onClose,
  provider,
}: {
  isOpen: boolean;
  onClose: () => void;
  provider: Provider | null;
}) => {
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");

  if (!isOpen || !provider) return null;

  const validateApiKey = (key: string) => {
    if (!key) return null;
    return key.length >= 20; // Simple validation
  };

  const handleSave = async () => {
    setSaveStatus("saving");
    
    try {
      const isValid = validateApiKey(apiKey);
      if (!isValid) {
        setSaveStatus("error");
        toast.error("Please enter a valid API key");
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(`${provider.name} API key saved successfully`);
      setSaveStatus("success");
      setTimeout(() => {
        setSaveStatus("idle");
        onClose();
      }, 1500);
    } catch (err) {
      setSaveStatus("error");
      toast.error("Failed to save API key");
    }
  };

  const isValid = validateApiKey(apiKey);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-grey">Add API Key</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-grey-medium">
            <X size={20} />
          </button>
        </div>

        {/* Provider Info */}
        <div className="flex items-center gap-3 mb-6 p-4 bg-gray-50 rounded-lg">
          <img src={provider.logo} alt={provider.name} className="w-10 h-10 rounded object-contain" />
          <div>
            <p className="font-semibold text-grey">{provider.name}</p>
            <p className="text-xs text-grey-medium">Shipping Provider</p>
          </div>
        </div>

        {/* API Key Input */}
        <div className="space-y-2 mb-6">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Key className="w-4 h-4" />
            API Key
          </label>
          <div className="relative">
            <input
              type={showKey ? "text" : "password"}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your API key..."
              className={`w-full px-4 py-3 pr-20 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                apiKey && isValid === false
                  ? "border-red-300 focus:ring-red-500 bg-red-50"
                  : apiKey && isValid === true
                    ? "border-green-300 focus:ring-green-500 bg-green-50"
                    : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              {apiKey && (isValid ? (
                <Check className="w-5 h-5 text-green-600" />
              ) : (
                <X className="w-5 h-5 text-red-500" />
              ))}
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="text-gray-500 hover:text-gray-700"
              >
                {showKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          {apiKey && isValid === false && (
            <p className="text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              API key must be at least 20 characters
            </p>
          )}
        </div>

        {/* Info Box */}
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-xs font-semibold text-blue-800 mb-1">
                How to get your API Key
              </h4>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• Log in to your {provider.name} account</li>
                <li>• Navigate to Settings → API Keys</li>
                <li>• Copy your API key and paste it here</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-lg font-medium bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saveStatus === "saving" || !isValid}
            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
              saveStatus === "saving" || !isValid
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-primary hover:bg-primary-dark text-white"
            }`}
          >
            {saveStatus === "saving" ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving...
              </span>
            ) : saveStatus === "success" ? (
              <span className="flex items-center justify-center gap-2">
                <Check className="w-4 h-4" />
                Saved!
              </span>
            ) : (
              "Save API Key"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const ShippingSettings = () => {
  const [selected, setSelected] = useState<string | null>("nepal-can-move");
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
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
    setSelectedProvider(provider);
    setShowApiKeyModal(true);
    setMenuOpen(null);
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
          <span>{new Date(info.getValue() as string).toLocaleDateString()}</span>
        ),
      },
      {
        accessorKey: "delivery_date",
        header: "Delivery Date",
        cell: (info) => (
          <span>{new Date(info.getValue() as string).toLocaleDateString()}</span>
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
    []
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
        <h3 className="text-lg font-semibold text-grey mb-4">Shipping Providers</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {providers.map((provider) => (
            <div
              key={provider.id}
              className={`relative flex items-center gap-4 rounded-xl border-2 p-4 pr-3 cursor-pointer transition
              ${selected === provider.id ? "border-primary" : "border-grey-light"}`}
              onClick={() => setSelected(provider.id)}
            >
              {/* Radio Indicator */}
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center border-2
                ${selected === provider.id ? "border-primary" : "border-grey-light"}`}
              >
                {selected === provider.id && (
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                )}
              </div>
              
              {/* Logo */}
              <img
                src={provider.logo}
                alt={provider.name}
                className="w-12 h-12 rounded-lg object-contain"
              />
              
              {/* Info */}
              <div className="flex-1">
                <h3 className="h5-bold-16 text-grey">{provider.name}</h3>
                <p className="body-regular-16 text-grey-medium line-clamp-2">
                  {provider.description}
                </p>
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
        <h3 className="text-lg font-semibold text-grey mb-4">Shipping Records</h3>
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
      
      <ApiKeyModal
        isOpen={showApiKeyModal}
        onClose={() => {
          setShowApiKeyModal(false);
          setSelectedProvider(null);
        }}
        provider={selectedProvider}
      />
    </div>
  );
};

export default ShippingSettings;