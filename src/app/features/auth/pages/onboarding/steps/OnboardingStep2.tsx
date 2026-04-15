import React, { useMemo, useState, useEffect } from "react";
import { Button } from "@/app/components/ui/";
import { useOnboardingStore } from "@/app/features/auth/pages/onboarding/hooks/useOnboardingStore";
import {
  OnboardingStep2FormData,
  onboardingStep2Schema,
} from "@/app/features/auth/pages/onboarding/schemas/Onboarding.schema";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Select from "react-select/creatable";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Dynamically import the heavy geo data (~7.7MB) only when this step mounts
type CountryData = { name: string; isoCode: string };
type StateData = { name: string; isoCode: string };
type CityData = { name: string };

interface GeoModule {
  Country: {
    getAllCountries: () => CountryData[];
  };
  State: {
    getStatesOfCountry: (countryCode: string) => StateData[];
  };
  City: {
    getCitiesOfState: (countryCode: string, stateCode: string) => CityData[];
  };
}

const useGeoData = () => {
  const [geo, setGeo] = useState<GeoModule | null>(null);

  useEffect(() => {
    let cancelled = false;
    import("country-state-city").then((mod) => {
      if (!cancelled) setGeo(mod as unknown as GeoModule);
    });
    return () => { cancelled = true; };
  }, []);

  return geo;
};

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
  const geo = useGeoData();

  const [customOptions, setCustomOptions] = useState<{
    states: string[];
    cities: string[];
  }>({ states: [], cities: [] });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<OnboardingStep2FormData>({
    resolver: zodResolver(onboardingStep2Schema),
    defaultValues: {
      country: data.step2?.country ?? "",
      state: data.step2?.state ?? "",
      city: data.step2?.city ?? "",
      address: data.step2?.address ?? "",
    },
  });

  const watchCountry = watch("country");
  const watchState = watch("state");
  const watchCity = watch("city");
  const watchAddress = watch("address");

  const countries = useMemo(
    () =>
      geo
        ? geo.Country.getAllCountries().map(({ name, isoCode }) => ({
            label: name,
            value: isoCode,
          }))
        : [],
    [geo],
  );

  const selectedCountry = useMemo(
    () => countries.find((c) => c.label === watchCountry),
    [countries, watchCountry],
  );

  const states = useMemo(() => {
    if (!selectedCountry || !geo) return [];

    const libraryStates = geo.State.getStatesOfCountry(
      selectedCountry.value,
    ).map(({ name, isoCode }) => ({
      label: name,
      value: isoCode,
    }));

    const customStates = customOptions.states.map((state) => ({
      label: state,
      value: state,
    }));

    return [...libraryStates, ...customStates];
  }, [geo, selectedCountry, customOptions.states]);

  const selectedState = useMemo(
    () => states.find((s) => s.label === watchState),
    [states, watchState],
  );

  const cities = useMemo(() => {
    if (!selectedCountry || !selectedState || !geo) return [];

    const libraryCities = geo.City.getCitiesOfState(
      selectedCountry.value,
      selectedState.value,
    ).map(({ name }) => ({
      label: name,
      value: name,
    }));

    const customCities = customOptions.cities.map((city) => ({
      label: city,
      value: city,
    }));

    return [...libraryCities, ...customCities];
  }, [geo, selectedCountry, selectedState, customOptions.cities]);

  const recomputeAddress = (overrides?: {
    country?: string;
    state?: string;
    city?: string;
  }) => {
    const country = overrides?.country ?? watchCountry;
    const state = overrides?.state ?? watchState;
    const city = overrides?.city ?? watchCity;

    const address = [city, state, country].filter(Boolean).join(", ");
    setValue("address", address, { shouldDirty: true });
  };

  const handleAddNew = (field: "state" | "city", value: string) => {
    setCustomOptions((prev) => ({
      ...prev,
      [field === "state" ? "states" : "cities"]: [
        ...prev[field === "state" ? "states" : "cities"],
        value,
      ],
    }));

    setValue(field, value, { shouldDirty: true });
    if (field === "state") {
      setValue("city", "", { shouldDirty: true });
      recomputeAddress({ state: value, city: "" });
    } else {
      recomputeAddress({ city: value });
    }
  };

  const onSubmit: SubmitHandler<OnboardingStep2FormData> = (values) => {
    const address = [values.city, values.state, values.country]
      .filter(Boolean)
      .join(", ");

    onNext({ ...values, address });
  };

  // Show a lightweight loading state while geo data loads
  if (!geo) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-32 bg-grey-light rounded animate-pulse" />
            <div className="h-10 w-full bg-grey-light rounded animate-pulse" />
          </div>
        ))}
        <p className="text-sm text-grey-medium">Loading location data...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Country Dropdown */}
      <div className="flex flex-col">
        <label htmlFor="country" className="mb-1 body-bold-16 text-grey-medium">
          Country <span className="text-danger">*</span>
        </label>
        <Controller
          control={control}
          name="country"
          render={({ field }) => {
            const selected =
              countries.find((c) => c.label === field.value) || null;
            return (
              <Select
                id="country"
                options={countries}
                value={selected}
                onChange={(option) => {
                  const label = option ? option.label : "";
                  field.onChange(label);
                  setValue("state", "", { shouldDirty: true });
                  setValue("city", "", { shouldDirty: true });
                  recomputeAddress({ country: label, state: "", city: "" });
                }}
                placeholder="Select a country"
                isSearchable
                className="text-grey-medium"
              />
            );
          }}
        />
        {errors.country && (
          <span className="text-danger text-sm mt-1 animate-in fade-in duration-200">
            {errors.country.message}
          </span>
        )}
      </div>

      {/* State Dropdown */}
      <div className="flex flex-col">
        <label htmlFor="state" className="mb-1 body-bold-16 text-grey-medium">
          State/Province <span className="text-danger">*</span>
        </label>
        <Controller
          control={control}
          name="state"
          render={({ field }) => {
            const selected =
              states.find((s) => s.label === field.value) || null;
            return (
              <Select
                id="state"
                options={states}
                value={selected}
                onChange={(option) => {
                  const label = option ? option.label : "";
                  field.onChange(label);
                  setValue("city", "", { shouldDirty: true });
                  recomputeAddress({ state: label, city: "" });
                }}
                placeholder="Select a state"
                isSearchable
                isDisabled={!watchCountry}
                isClearable
                onCreateOption={(inputValue) =>
                  handleAddNew("state", inputValue)
                }
                className="text-grey-medium"
              />
            );
          }}
        />
        {errors.state && (
          <span className="text-danger text-sm mt-1 animate-in fade-in duration-200">
            {errors.state.message}
          </span>
        )}
      </div>

      {/* City Dropdown */}
      <div className="flex flex-col">
        <label htmlFor="city" className="mb-1 body-bold-16 text-grey-medium">
          City <span className="text-danger">*</span>
        </label>
        <Controller
          control={control}
          name="city"
          render={({ field }) => {
            const selected =
              cities.find((c) => c.label === field.value) || null;
            return (
              <Select
                id="city"
                options={cities}
                value={selected}
                onChange={(option) => {
                  const label = option ? option.label : "";
                  field.onChange(label);
                  recomputeAddress({ city: label });
                }}
                placeholder="Select a city"
                isSearchable
                isDisabled={!watchState}
                isClearable
                onCreateOption={(inputValue) =>
                  handleAddNew("city", inputValue)
                }
                className="text-grey-medium"
              />
            );
          }}
        />
        {errors.city && (
          <span className="text-danger text-sm mt-1 animate-in fade-in duration-200">
            {errors.city.message}
          </span>
        )}
      </div>

      {/* Address Preview */}
      {watchAddress && (
        <div className="p-2 bg-base-white border rounded text-sm text-grey-medium">
          Selected address: <strong>{watchAddress}</strong>
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
          type="submit"
          variant="primary"
          IconRight={<ArrowRight size={20} />}
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
};

export default OnboardingStep2;
