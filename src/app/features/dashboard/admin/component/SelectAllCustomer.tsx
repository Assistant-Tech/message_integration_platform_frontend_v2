import React, { useState } from "react";
import { X } from "lucide-react";
import { Input } from "@/app/components/ui";

// Platform Icons
import facebook from "@/app/assets/dashboard-icons/facebook.svg";
import instagram from "@/app/assets/dashboard-icons/insta.svg";
import whatsapp from "@/app/assets/dashboard-icons/whatsapp.svg";

interface Customer {
  id: string;
  name: string;
  avatar: string;
  platform: string;
  lastContact: string;
}

interface SelectAllCustomerProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock Customers
const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "Jerry Helfer",
    avatar: "https://i.pravatar.cc/150?img=1",
    platform: "instagram",
    lastContact: "22/05/2024",
  },
  {
    id: "2",
    name: "Rodger Struck",
    avatar: "https://i.pravatar.cc/150?img=2",
    platform: "whatsapp",
    lastContact: "22/05/2024",
  },
  {
    id: "3",
    name: "Patricia Sanders",
    avatar: "https://i.pravatar.cc/150?img=3",
    platform: "facebook",
    lastContact: "22/05/2024",
  },
  {
    id: "4",
    name: "Nina Brooks",
    avatar: "https://i.pravatar.cc/150?img=4",
    platform: "instagram",
    lastContact: "21/05/2024",
  },
  {
    id: "5",
    name: "Derek Stone",
    avatar: "https://i.pravatar.cc/150?img=5",
    platform: "whatsapp",
    lastContact: "20/05/2024",
  },
  {
    id: "6",
    name: "Linda Monroe",
    avatar: "https://i.pravatar.cc/150?img=6",
    platform: "facebook",
    lastContact: "19/05/2024",
  },
  {
    id: "7",
    name: "Caleb Foster",
    avatar: "https://i.pravatar.cc/150?img=7",
    platform: "instagram",
    lastContact: "18/05/2024",
  },
  {
    id: "8",
    name: "Sophia Jordan",
    avatar: "https://i.pravatar.cc/150?img=8",
    platform: "facebook",
    lastContact: "17/05/2024",
  },
  {
    id: "9",
    name: "Leo Harmon",
    avatar: "https://i.pravatar.cc/150?img=9",
    platform: "whatsapp",
    lastContact: "16/05/2024",
  },
  {
    id: "10",
    name: "Grace Collins",
    avatar: "https://i.pravatar.cc/150?img=10",
    platform: "instagram",
    lastContact: "15/05/2024",
  },
];

const platformIcons: Record<string, string> = {
  facebook,
  instagram,
  whatsapp,
};

const SelectAllCustomer: React.FC<SelectAllCustomerProps> = ({
  isOpen,
  onClose,
}) => {
  const [search, setSearch] = useState("");

  const filtered = mockCustomers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="max-w-lg w-full bg-white p-6 rounded-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Select Customers</h2>
          <X className="cursor-pointer" onClick={onClose} />
        </div>

        {/* Search */}
        <Input
          type="text"
          placeholder="Search customers"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-4 border border-primary-light rounded-lg"
        />

        {/* Customer List */}
        <div className="flex flex-col gap-4">
          {filtered.map((customer) => (
            <div
              key={customer.id}
              className="flex justify-between items-center"
            >
              <div className="flex items-center gap-3">
                {/* Avatar Container */}
                <div className="relative w-10 h-10">
                  <img
                    src={customer.avatar}
                    alt={customer.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {platformIcons[customer.platform] && (
                    <img
                      src={platformIcons[customer.platform]}
                      alt={customer.platform}
                      className="absolute bottom-0 right-0 w-4 h-4 rounded-full border border-white bg-white shadow-sm"
                    />
                  )}
                </div>
                {/* Name */}
                <div>
                  <p className="font-medium text-grey-medium">
                    {customer.name}
                  </p>
                </div>
              </div>
              <p className="text-sm text-grey-medium">{customer.lastContact}</p>
            </div>
          ))}
        </div>

        {/* TODO: Replace mock data with real API call */}
        {/*
        useEffect(() => {
          const fetchCustomers = async () => {
            const res = await axios.get("/api/customers");
            setCustomers(res.data);
          };
          fetchCustomers();
        }, []);
        */}
      </div>
    </div>
  );
};

export default SelectAllCustomer;
