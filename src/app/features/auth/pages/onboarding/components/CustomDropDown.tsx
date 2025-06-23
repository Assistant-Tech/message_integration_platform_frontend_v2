import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface CustomDropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
  loading?: boolean;
  error?: boolean;
  id?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder,
  disabled = false,
  loading = false,
  error = false,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  const getDisplayValue = () => {
    if (loading) return "Loading...";
    if (value) return value;
    return placeholder;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        id={id}
        type="button"
        className={`w-full border p-2 rounded body-regular-16 text-grey text-left flex items-center justify-between ${
          error ? "border-danger" : "border-grey-light"
        } ${disabled ? "bg-base-white cursor-not-allowed" : "bg-base-white cursor-pointer hover:border-grey-medium"}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <span className={value ? "text-grey" : "text-grey-medium"}>
          {getDisplayValue()}
        </span>
        <ChevronDown
          size={20}
          className={`transition-transform ${isOpen ? "rotate-180" : ""} ${
            disabled ? "text-grey-medium" : "text-grey"
          }`}
        />
      </button>

      {isOpen && !disabled && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-grey-light rounded shadow-lg z-50 max-h-60 overflow-y-auto">
          {options.length === 0 ? (
            <div className="p-2 text-gray-500 body-regular-16">
              {loading ? "Loading..." : "No options available"}
            </div>
          ) : (
            options.map((option) => (
              <button
                key={option}
                type="button"
                className="w-full text-left p-2 hover:bg-grey-light body-regular-16 text-grey"
                onClick={() => handleSelect(option)}
              >
                {option}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
