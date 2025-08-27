import React, { useMemo, useState } from "react";
import { Button } from "@/app/components/ui/";
import { useOnboardingStore } from "@/app/features/auth/pages/onboarding/hooks/useOnboardingStore";
import {
  OnboardingStep2FormData,
  onboardingStep2Schema,
} from "@/app/features/auth/pages/onboarding/schemas/Onboarding.schema";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Country, State, City } from "country-state-city";
import Select from "react-select/creatable"; // import creatable select for adding options
import { motion } from "framer-motion";

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

  // Store manually added states and cities
  const [customOptions, setCustomOptions] = useState<{
    states: string[];
    cities: string[];
  }>({ states: [], cities: [] });

  // Country list
  const countries = useMemo(
    () =>
      Country.getAllCountries().map(({ name, isoCode }) => ({
        label: name,
        value: isoCode,
      })),
    [],
  );

  // States
  const selectedCountry = useMemo(
    () => countries.find((c) => c.label === formData.country),
    [formData.country, countries],
  );

  // States
  const states = useMemo(() => {
    if (!selectedCountry) return [];

    // Get states from the library
    const libraryStates = State.getStatesOfCountry(selectedCountry.value).map(
      ({ name, isoCode }) => ({
        label: name,
        value: isoCode,
      }),
    );

    // Add custom states for this country
    const customStates = customOptions.states.map((state) => ({
      label: state,
      value: state,
    }));

    return [...libraryStates, ...customStates];
  }, [selectedCountry, customOptions.states]);

  // Cities
  const selectedState = useMemo(
    () => states.find((s) => s.label === formData.state),
    [formData.state, states],
  );

  // Cities
  const cities = useMemo(() => {
    if (!selectedCountry || !selectedState) return [];

    // Get cities from the library
    const libraryCities = City.getCitiesOfState(
      selectedCountry.value,
      selectedState.value,
    ).map(({ name }) => ({
      label: name,
      value: name,
    }));

    // Add custom cities
    const customCities = customOptions.cities.map((city) => ({
      label: city,
      value: city,
    }));

    return [...libraryCities, ...customCities];
  }, [selectedCountry, selectedState, customOptions.cities]);

  // Handles field changes
  const handleChange = (field: "country" | "state" | "city", value: any) => {
    const updated = {
      ...formData,
      [field]: value ? value.label : "",
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
    const currentSchema = onboardingStep2Schema.superRefine((data, ctx) => {
      if (!data.country) {
        ctx.addIssue({
          code: "custom",
          message: "Country is required",
          path: ["country"],
        });
      }
      if (!data.state) {
        ctx.addIssue({
          code: "custom",
          message: "State/Province is required",
          path: ["state"],
        });
      }
      if (!data.city) {
        ctx.addIssue({
          code: "custom",
          message: "City is required",
          path: ["city"],
        });
      }
    });

    const result = currentSchema.safeParse(formData);

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

  // Handle adding a new state or city
  const handleAddNew = (field: "state" | "city", value: string) => {
    // Add the new option to custom options
    setCustomOptions((prev) => ({
      ...prev,
      [field === "state" ? "states" : "cities"]: [
        ...prev[field === "state" ? "states" : "cities"],
        value,
      ],
    }));

    // Update the form data to reflect the newly added state or city
    const updated = {
      ...formData,
      [field]: value,
      ...(field === "state" ? { city: "" } : {}), // Clear city if state is changed
    };

    updated.address = [updated.city, updated.state, updated.country]
      .filter(Boolean)
      .join(", ");

    setFormData(updated);
  };

  return (
    <div className="space-y-6">
      {/* Country Dropdown */}
      <div className="flex flex-col">
        <label htmlFor="country" className="mb-1 body-bold-16 text-grey-medium">
          Country <span className="text-danger">*</span>
        </label>
        <Select
          id="country"
          options={countries}
          value={countries.find((c) => c.label === formData.country) || null}
          onChange={(option) => handleChange("country", option)}
          placeholder="Select a country"
          isSearchable
          className="text-grey-medium"
        />
        {errors.country && (
          <motion.span
            className="text-danger text-sm mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {errors.country}
          </motion.span>
        )}
      </div>

      {/* State Dropdown */}
      <div className="flex flex-col">
        <label htmlFor="state" className="mb-1 body-bold-16 text-grey-medium">
          State/Province <span className="text-danger">*</span>
        </label>
        <Select
          id="state"
          options={states}
          value={states.find((s) => s.label === formData.state) || null}
          onChange={(option) => handleChange("state", option)}
          placeholder="Select a state"
          isSearchable
          isDisabled={!formData.country}
          isClearable
          onCreateOption={(inputValue) => handleAddNew("state", inputValue)}
          className="text-grey-medium"
        />
        {errors.state && (
          <motion.span
            className="text-danger text-sm mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {errors.state}
          </motion.span>
        )}
      </div>

      {/* City Dropdown */}
      <div className="flex flex-col">
        <label htmlFor="city" className="mb-1 body-bold-16 text-grey-medium">
          City <span className="text-danger">*</span>
        </label>
        <Select
          id="city"
          options={cities}
          value={cities.find((c) => c.label === formData.city) || null}
          onChange={(option) => handleChange("city", option)}
          placeholder="Select a city"
          isSearchable
          isDisabled={!formData.state}
          isClearable
          onCreateOption={(inputValue) => handleAddNew("city", inputValue)}
          className="text-grey-medium"
        />
        {errors.city && (
          <motion.span
            className="text-danger text-sm mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {errors.city}
          </motion.span>
        )}
      </div>

      {/* Address Preview */}
      {formData.address && (
        <div className="p-2 bg-base-white border rounded text-sm text-grey-medium">
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
