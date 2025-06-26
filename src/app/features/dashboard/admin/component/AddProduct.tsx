import { Input } from "@/app/components/ui";
import { Heading } from "@/app/features/dashboard/admin/component/ui";
import { Search, X } from "lucide-react";

interface AddProductProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
  selected: string[];
  toggleTag: (tag: string) => void;
}

const AddProduct: React.FC<AddProductProps> = ({
  isOpen,
  onClose,
  categories,
  selected,
  toggleTag,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="max-w-2xl w-full p-6 bg-white rounded-2xl">
        <div className="flex justify-between items-center">
          <Heading title="Add Product" align="left" className="text-grey" />
          <X
            size={24}
            onClick={onClose}
            className="cursor-pointer"
            color="grey"
          />
        </div>

        <Input
          name="product"
          placeholder="Search by Product Name, SKN or Category"
          type="search"
          className="w-full py-3 my-4 border border-grey-light rounded-lg ring-1 ring-primary"
          iconLeft={<Search size={24} />}
        />

        <h2 className="h5-bold-16 text-start text-grey">Category</h2>
        <div className="grid grid-cols-3 gap-4 mb-4 pt-3">
          {categories.map((tag, i) => (
            <button
              key={i}
              onClick={() => toggleTag(tag)}
              className={`label-regular-14 px-3 py-2 rounded-md border border-grey-light hover:bg-primary hover:text-white cursor-pointer ${
                selected.includes(tag)
                  ? "bg-primary text-white border-primary"
                  : "bg-base-white text-grey-medium"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
