import { Check } from "lucide-react";
import { useState } from "react";

const VisibilityCell: React.FC<{ value: boolean }> = ({ value }) => {
  const [enabled, setEnabled] = useState<boolean>(value);

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={enabled}
        onChange={() => setEnabled((prev) => !prev)}
      />
      <div className="w-5 h-5 rounded border border-gray-300 peer-checked:bg-primary peer-checked:border-primary grid place-items-center">
        {enabled && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
      </div>
    </label>
  );
};

export default VisibilityCell;
