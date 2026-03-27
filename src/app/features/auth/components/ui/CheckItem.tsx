import { Check, X } from "lucide-react";

const CheckItem = ({
  label,
  condition,
}: {
  label: string;
  condition: boolean;
}) => (
  <div className="flex items-center gap-2 label-regular-14">
    {condition ? (
      <div className="p-px bg-primary rounded-full">
        <Check className="text-white w-4 h-4" />
      </div>
    ) : (
      <div className="p-px bg-danger rounded-full">
        <X className="text-white w-4 h-4" />
      </div>
    )}
    <span className={condition ? "text-primary" : "text-danger"}>{label}</span>
  </div>
);

export default CheckItem;