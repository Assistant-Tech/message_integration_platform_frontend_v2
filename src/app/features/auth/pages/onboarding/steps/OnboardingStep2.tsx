import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  CustomDropdown,
  StepSidebar,
} from "@/app/features/auth/pages/onboarding/components";
import { Button, Input, Logo } from "@/app/components/ui/";
import { useOnboardingStore } from "@/app/features/auth/pages/onboarding/hooks/useOnboardingStore";
import {
  OnboardingStep2FormData,
  onboardingStep2Schema,
} from "@/app/features/auth/pages/onboarding/schemas/Onboarding.schema";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getCitiesByCountry } from "@/app/features/auth/pages/onboarding/hooks/useCitiesByCountry";

const countries = ["Nepal", "India", "United States", "Australia", "Canada"];

interface LocationErrors {
  country?: string;
  state?: string;
  city?: string;
}

const OnboardingStep2: React.FC = () => {
  const navigate = useNavigate();
  const { data, setStepData, setCompletedSteps } = useOnboardingStore();
  const currentStep = 2;

  const [formData, setFormData] = useState<OnboardingStep2FormData>(
    data.step2 || {
      country: "",
      state: "",
      city: "",
    },
  );

  const [errors, setErrors] = useState<LocationErrors>({});
  const [cities, setCities] = useState<string[]>([]);
  const [loadingCities, setLoadingCities] = useState(false);

  const handleChange = (
    field: keyof OnboardingStep2FormData,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "country" ? { city: "" } : {}),
    }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const result = onboardingStep2Schema.safeParse(formData);

    if (!result.success) {
      const newErrors: LocationErrors = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof LocationErrors;
        newErrors[field] = err.message;
      });
      setErrors(newErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setStepData("step2", formData);
      setCompletedSteps(2);
      navigate("/onboardingform/step-3");
    }
  };

  useEffect(() => {
    const fetchCities = async () => {
      if (!formData.country) {
        setCities([]);
        return;
      }

      setLoadingCities(true);
      try {
        const response = await getCitiesByCountry({
          country: formData.country,
        });
        setCities(response.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
        setCities([]);
      } finally {
        setLoadingCities(false);
      }
    };

    fetchCities();
  }, [formData.country]);

  return (
    <div className="min-h-screen h-full bg-base-white py-12 px-4">
      <div className="max-w-7xl mx-auto flex flex-col justify-center overflow-visible">
        <article className="pb-12">
          <Logo />
        </article>

        <div className="mb-10">
          <h1 className="h2-bold-40 text-base-black mb-2">
            Welcome to Chatblix, Jane!
          </h1>
          <p className="text-grey-medium body-regular-16 max-w-2xl">
            Complete your onboarding process by setting up your workplace. The
            next few steps will contain all the necessary information you will
            need to enter to personalize your Chatblix account.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start max-w-full gap-16 overflow-visible">
          <StepSidebar
            currentStep={currentStep}
            previousStep={currentStep - 1}
          />

          <div className="w-full lg:flex-1">
            <h2 className="h4-bold-24 text-grey mb-6">Company's Location</h2>

            <div className="space-y-6">
              {/* Country Dropdown */}
              <div className="flex flex-col">
                <label
                  htmlFor="country"
                  className="mb-1 body-bold-16 text-grey"
                >
                  Country <span className="text-danger">*</span>
                </label>
                <CustomDropdown
                  id="country"
                  options={countries}
                  value={formData.country}
                  onChange={(value) => handleChange("country", value)}
                  placeholder="Select a country"
                  error={!!errors.country}
                />
                {errors.country && (
                  <span className="text-danger text-sm mt-1">
                    {errors.country}
                  </span>
                )}
              </div>

              {/* State Input */}
              <div className="flex flex-col">
                <label htmlFor="state" className="mb-1 body-bold-16 text-grey">
                  State/Province
                </label>
                <Input
                  id="state"
                  className={`border p-2 rounded ${
                    errors.state ? "border-danger" : "border-grey-light"
                  }`}
                  placeholder="Enter your state or province"
                  value={formData.state}
                  onChange={(e) => handleChange("state", e.target.value)}
                />
                {errors.state && (
                  <span className="text-danger text-sm mt-1">
                    {errors.state}
                  </span>
                )}
              </div>

              {/* City Dropdown */}
              <div className="flex flex-col">
                <label htmlFor="city" className="mb-1 body-bold-16 text-grey">
                  City <span className="text-danger">*</span>
                </label>
                <CustomDropdown
                  id="city"
                  options={cities}
                  value={formData.city}
                  onChange={(value) => handleChange("city", value)}
                  placeholder={
                    !formData.country
                      ? "Select a country first"
                      : "Select a city"
                  }
                  disabled={!formData.country}
                  loading={loadingCities}
                  error={!!errors.city}
                />
                {errors.city && (
                  <span className="text-danger text-sm mt-1">
                    {errors.city}
                  </span>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-4">
                <Button
                  label="Go Back"
                  onClick={() => navigate("/onboardingform/step-1")}
                  variant="outlined"
                  IconLeft={<ArrowLeft size={20} />}
                />
                <Button
                  label="Next"
                  onClick={handleSubmit}
                  variant="primary"
                  IconRight={<ArrowRight size={20} />}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingStep2;
