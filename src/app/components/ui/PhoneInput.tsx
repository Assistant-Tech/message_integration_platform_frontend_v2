import React, { useState } from "react";
import { cn } from "@/app/utils/cn";
import { Input } from "@/app/components/ui";
import { ArrowDown } from "lucide-react";

const countries = [
  { name: "Nepal", code: "+977" },
  { name: "United States", code: "+1" },
  { name: "India", code: "+91" },
];

interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ label, error, className, ...props }, ref) => {
    const [selectedCountryCode, setSelectedCountryCode] = useState(
      countries[0]?.code,
    );

    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label htmlFor="phone" className="body-bold-16 text-grey">
            {label}
          </label>
        )}
        <div
          className={cn(
            "flex items-center w-full border rounded-lg overflow-hidden",
            error ? "border-danger" : "border-gray-300",
            className,
          )}
        >
          {/* Country Dropdown */}
          <div className="relative">
            <select
              id="country"
              name="country"
              className="appearance-none bg-white px-4 py-2 pr-8 body-regular-16 text-grey-medium outline-none cursor-pointer"
              value={selectedCountryCode}
              onChange={(e) => setSelectedCountryCode(e.target.value)}
            >
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ArrowDown size={12} />
            </div>
          </div>

          {/* Country Code Display */}
          <span className="px-2 body-regular-16 text-grey-medium bg-gray-50 border-l border-gray-300 py-2">
            {selectedCountryCode}
          </span>

          {/* Phone Number Input */}
          <Input
            id="phone"
            type="phone"
            placeholder=" "
            className="flex-grow border-none focus:ring-0 px-4 py-2"
            ref={ref}
            {...props}
          />
        </div>
        {error && <p className="text-sm text-danger mt-1">{error}</p>}
      </div>
    );
  },
);

PhoneInput.displayName = "PhoneInput";

export default PhoneInput;
