import React, { useMemo, useState } from "react";
import { CustomDropdown } from "@/app/features/auth/pages/onboarding/components";
import { Button } from "@/app/components/ui/";
import { useOnboardingStore } from "@/app/features/auth/pages/onboarding/hooks/useOnboardingStore";
import {
  OnboardingStep2FormData,
  onboardingStep2Schema,
} from "@/app/features/auth/pages/onboarding/schemas/Onboarding.schema";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Country, State, City } from "country-state-city";
interface OnboardingStep2Props {
  onNext: (stepData: OnboardingStep2FormData) => void;
  onPrevious: () => void;
  isSubmitting: boolean;
}

const OnboardingStep2: React.FC<OnboardingStep2Props> = ({
  onNext,
  onPrevious,
  isSubmitting,
}) => {
  const { data } = useOnboardingStore();

  const [formData, setFormData] = useState<OnboardingStep2FormData>(
    data.step2 || { country: "", state: "", city: "", address: "" },
  );

  const [errors, setErrors] = useState<
    Partial<Record<keyof OnboardingStep2FormData, string>>
  >({});

  // Country list
  const countries = useMemo(
    () =>
      Country.getAllCountries().map(({ name, isoCode }) => ({
        name,
        isoCode,
      })),
    [],
  );

  const selectedCountry = useMemo(
    () => countries.find((c) => c.name === formData.country),
    [formData.country, countries],
  );

  // States
  const states = useMemo(() => {
    if (!selectedCountry) return [];
    return State.getStatesOfCountry(selectedCountry.isoCode).map(
      ({ name, isoCode }) => ({ name, isoCode }),
    );
  }, [selectedCountry]);

  const selectedState = useMemo(
    () => states.find((s) => s.name === formData.state),
    [formData.state, states],
  );

  // Cities
  const cities = useMemo(() => {
    if (!selectedCountry || !selectedState) return [];
    return City.getCitiesOfState(
      selectedCountry.isoCode,
      selectedState.isoCode,
    ).map(({ name }) => ({ name }));
  }, [selectedCountry, selectedState]);

  // Handles field changes and rebuilds the address
  const handleChange = (field: "country" | "state" | "city", value: string) => {
    const updated = {
      ...formData,
      [field]: value,
      ...(field === "country" ? { state: "", city: "" } : {}),
      ...(field === "state" ? { city: "" } : {}),
    };

    updated.address = [updated.city, updated.state, updated.country]
      .filter(Boolean)
      .join(", ");

    setFormData(updated);

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Unified validation with Zod
  const validateForm = (): boolean => {
    const result = onboardingStep2Schema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: typeof errors = {};
      result.error.errors.forEach((err) => {
        const fieldName = err.path[0] as keyof OnboardingStep2FormData;
        fieldErrors[fieldName] = err.message;
      });
      setErrors(fieldErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validateForm()) {
      onNext(formData);
    }
  };

  return (
    <div className="space-y-6">
      {/* Country Dropdown */}
      <div className="flex flex-col">
        <label htmlFor="country" className="mb-1 body-bold-16 text-grey">
          Country <span className="text-danger">*</span>
        </label>
        <CustomDropdown
          id="country"
          options={countries.map((c) => c.name)}
          value={formData.country}
          onChange={(value) => handleChange("country", value)}
          placeholder="Select a country"
          error={!!errors.country}
        />
        {errors.country && (
          <span className="text-danger text-sm mt-1">{errors.country}</span>
        )}
      </div>

      {/* State Dropdown */}
      <div className="flex flex-col">
        <label htmlFor="state" className="mb-1 body-bold-16 text-grey">
          State/Province
        </label>
        <CustomDropdown
          id="state"
          options={states.map((s) => s.name)}
          value={formData.state}
          onChange={(value) => handleChange("state", value)}
          placeholder={
            !formData.country ? "Select a country first" : "Select a state"
          }
          disabled={!formData.country}
          error={!!errors.state}
        />
        {errors.state && (
          <span className="text-danger text-sm mt-1">{errors.state}</span>
        )}
      </div>

      {/* City Dropdown */}
      <div className="flex flex-col">
        <label htmlFor="city" className="mb-1 body-bold-16 text-grey">
          City <span className="text-danger">*</span>
        </label>
        <CustomDropdown
          id="city"
          options={cities.map((c) => c.name)}
          value={formData.city}
          onChange={(value) => handleChange("city", value)}
          placeholder={
            !formData.state ? "Select a state first" : "Select a city"
          }
          disabled={!formData.state}
          error={!!errors.city}
        />
        {errors.city && (
          <span className="text-danger text-sm mt-1">{errors.city}</span>
        )}
      </div>

      {/* Address Preview */}
      {formData.address && (
        <div className="p-2 bg-gray-50 border rounded text-sm text-gray-600">
          Selected address: <strong>{formData.address}</strong>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4">
        <Button
          label="Go Back"
          onClick={onPrevious}
          variant="outlined"
          IconLeft={<ArrowLeft size={20} />}
          disabled={isSubmitting}
        />
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

export default OnboardingStep2;
