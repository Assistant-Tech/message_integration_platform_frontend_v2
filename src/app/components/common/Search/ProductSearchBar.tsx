import { Button, Input } from "@/app/components/ui/";
import { Filter, Search } from "lucide-react";

const ProductSearchBar = () => {
  return (
    <div className="max-h-48 h-full w-full py-4">
      <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 md:gap-16">
        {/* Search bar */}
        <div className="max-w-xl w-full">
          <Input
            placeholder="Search..."
            iconLeft={<Search size={24} color="gray" />}
          />
        </div>
        {/* Sorting filter */}
        <div className="max-w-lg w-full flex gap-4 items-center text-grey-medium">
          <div className="w-full flex justify-start items-center gap-2">
            <h5 className="body-bold-16 w-24">Sort By: </h5>
            <Input placeholder="Date, new to old" />
          </div>
          <Button
            label="Filter"
            variant="none"
            IconLeft={<Filter size={24} color="grey" />}
            className="text-grey-medium body-bold-16 border border-grey-medium px-3 py-2"
          />
        </div>
      </div>
    </div>
  );
};
export default ProductSearchBar;
