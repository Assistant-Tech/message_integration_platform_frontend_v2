import React, { useState } from "react";
import { Button, Input } from "@/app/components/ui/";
import { useOnboardingStore } from "@/app/features/auth/pages/onboarding/hooks/useOnboardingStore";
import {
  onboardingStep1Schema,
  OnboardingStep1FormData,
} from "@/app/features/auth/pages/onboarding/schemas/Onboarding.schema";
import { ZodError } from "zod";
import { ArrowRight } from "lucide-react";

interface FormErrors {
  organizationName?: string;
  email?: string;
  contactNumber?: string;
  website?: string;
}

interface OnboardingStep1Props {
  onNext: (stepData: OnboardingStep1FormData) => void;
  onPrevious: () => void;
  isSubmitting: boolean;
}

const OnboardingStep1: React.FC<OnboardingStep1Props> = ({
  onNext,
  isSubmitting,
}) => {
  const { data } = useOnboardingStore();

  const [formData, setFormData] = useState<OnboardingStep1FormData>(
    data.step1 || {
      organizationName: "",
      email: "",
      contactNumber: "",
      website: "",
    },
  );

  const [errors, setErrors] = useState<FormErrors>({});
  const [countryCode, setCountryCode] = useState<string>("Nepal");

  const handleInputChange = (
    field: keyof OnboardingStep1FormData,
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      onboardingStep1Schema.parse(formData);
      setErrors({});
      // Include country code in the contact number data if needed
      const dataWithCountry = {
        ...formData,
        contactNumber: `${countryCode}-${formData.contactNumber}`,
      };
      onNext(dataWithCountry);
    } catch (err) {
      if (err instanceof ZodError) {
        const newErrors: FormErrors = {};
        err.errors.forEach((error) => {
          if (error.path.length > 0) {
            newErrors[error.path[0] as keyof FormErrors] = error.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <div className="space-y-6">
      <Input
        id="organizationName"
        label="Company Name"
        placeholder="Enter your company name"
        value={formData.organizationName}
        onChange={(e) => handleInputChange("organizationName", e.target.value)}
        error={errors.organizationName}
        required
      />

      <Input
        id="email"
        type="email"
        label="Company Email"
        placeholder="xyzcompany@gmail.com"
        value={formData.email}
        onChange={(e) => handleInputChange("email", e.target.value)}
        error={errors.email}
        required
      />

      <div>
        <label className="body-bold-16 text-grey mb-2 block">
          Company Phone Number <span className="text-danger">*</span>
        </label>
        <div className="flex">
          <select
            className="px-3 py-2 border border-grey-light rounded-l-lg text-grey-medium bg-white min-w-[100px]"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
          >
            <option value="Nepal">🇳🇵 Nepal</option>
            <option value="India">🇮🇳 India</option>
            <option value="USA">🇺🇸 USA</option>
            <option value="UK">🇬🇧 UK</option>
          </select>
          <div className="flex-1">
            <Input
              id="phone"
              type="tel"
              placeholder="+977 9876543210"
              value={formData.contactNumber}
              onChange={(e) =>
                handleInputChange("contactNumber", e.target.value)
              }
              error={errors.contactNumber}
              className="rounded-l-none border-l-0"
            />
          </div>
        </div>
        {errors.contactNumber && (
          <p className="text-danger text-sm mt-1">{errors.contactNumber}</p>
        )}
      </div>

      <Input
        id="website"
        type="url"
        label="Company Website"
        placeholder="https://www.xyz.com"
        value={formData.website}
        onChange={(e) => handleInputChange("website", e.target.value)}
        error={errors.website}
      />

      <div className="flex justify-end pt-4">
        <Button
          label="Next"
          onClick={handleSubmit}
          variant="primary"
          IconRight={<ArrowRight size={20} />}
          disabled={isSubmitting}
        />
      </div>
    </div>
  );
};

export default OnboardingStep1;
