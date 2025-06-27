import React from "react";
import { Search, X } from "lucide-react";

import { Heading } from "@/app/features/dashboard/admin/component/ui";
import { Input } from "@/app/components/ui";

interface SelectAllCustomerProps {
  isOpen: boolean;
  onClose: () => void;
}
const SelectAllCustomer: React.FC<SelectAllCustomerProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="max-w-2xl w-full p-8 bg-white rounded-2xl max-h-[90vh] overflow-y-auto">
            {/* Heading Section */}
            <div className="flex justify-between items-center mb-4">
              <Heading title="Select Customers" className="text-base-black" />
              <X
                size={24}
                onClick={onClose}
                className="cursor-pointer text-base-black"
              />
            </div>
            {/* Search bar section */}
            <Input
              name="product"
              placeholder="Search by Product Name, SKN or Category"
              type="search"
              className="w-full border border-grey-light rounded-lg ring-1 ring-primary"
              iconLeft={<Search size={24} />}
            />

            {/* Other static datasets for now later in API's integration needed */}
          </div>
        </div>
      )}
    </>
  );
};

export default SelectAllCustomer;
