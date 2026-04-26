import React, { useMemo, useState, useEffect } from "react";
import { Button } from "@/app/components/ui/";
import { useOnboardingStore } from "@/app/features/auth/pages/onboarding/hooks/useOnboardingStore";
import {
  OnboardingStep2FormData,
  onboardingStep2Schema,
} from "@/app/features/auth/pages/onboarding/schemas/Onboarding.schema";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import Select from "react-select/creatable";
import type { StylesConfig, GroupBase } from "react-select";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Dynamically import the heavy geo data (~7.7MB) only when this step mounts
type CountryData = { name: string; isoCode: string };
type StateData = { name: string; isoCode: string };
type CityData = { name: string };

interface GeoModule {
  Country: { getAllCountries: () => CountryData[] };
  State: { getStatesOfCountry: (countryCode: string) => StateData[] };
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
    return () => {
      cancelled = true;
    };
  }, []);

  return geo;
};

type OptionType = { label: string; value: string };

// Align react-select visuals with the project's Input component
const selectStyles: StylesConfig<
  OptionType,
  false,
  GroupBase<OptionType>
> = {
  control: (base, state) => ({
    ...base,
    minHeight: 48,
    borderRadius: 8,
    borderColor: state.isFocused
      ? "rgba(var(--color-primary-rgb, 16 103 217) / 0.6)"
      : "var(--color-grey-light, #E2E4E8)",
    boxShadow: state.isFocused
      ? "0 0 0 2px rgba(16,103,217,0.25)"
      : "none",
    backgroundColor: state.isDisabled ? "rgba(229,231,235,0.4)" : "white",
    ":hover": {
      borderColor: state.isFocused
        ? "rgba(16,103,217,0.6)"
        : "var(--color-grey-medium, #9AA1AB)",
    },
    paddingLeft: 6,
    paddingRight: 6,
  }),
  placeholder: (base) => ({
    ...base,
    color: "#9AA1AB",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#1F2937",
  }),
  menu: (base) => ({
    ...base,
    borderRadius: 12,
    overflow: "hidden",
    zIndex: 30,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "rgba(16,103,217,0.12)"
      : state.isFocused
        ? "rgba(16,103,217,0.06)"
        : "white",
    color: "#1F2937",
    cursor: "pointer",
  }),
  indicatorSeparator: () => ({ display: "none" }),
};

interface FieldShellProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}

const FieldShell: React.FC<FieldShellProps> = ({
  id,
  label,
  required,
  error,
  hint,
  children,
}) => (
  <div className="flex flex-col gap-1 w-full">
    <label htmlFor={id} className="body-bold-16 text-grey">
      {label}
      {required && <span className="text-danger"> *</span>}
    </label>
    {children}
    {error ? (
      <p className="text-sm text-danger mt-1">{error}</p>
    ) : hint ? (
      <p className="caption-medium-12 text-grey-medium mt-1">{hint}</p>
    ) : null}
  </div>
);

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
    ).map(({ name, isoCode }) => ({ label: name, value: isoCode }));

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
    ).map(({ name }) => ({ label: name, value: name }));

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

  if (!geo) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-32 bg-grey-light rounded animate-pulse" />
            <div className="h-12 w-full bg-grey-light rounded-lg animate-pulse" />
          </div>
        ))}
        <p className="caption-medium-12 text-grey-medium">
          Loading location data…
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FieldShell
          id="country"
          label="Country"
          required
          error={errors.country?.message}
        >
          <Controller
            control={control}
            name="country"
            render={({ field }) => {
              const selected =
                countries.find((c) => c.label === field.value) || null;
              return (
                <Select
                  inputId="country"
                  options={countries}
                  value={selected}
                  onChange={(option) => {
                    const label = option ? option.label : "";
                    field.onChange(label);
                    setValue("state", "", { shouldDirty: true });
                    setValue("city", "", { shouldDirty: true });
                    recomputeAddress({
                      country: label,
                      state: "",
                      city: "",
                    });
                  }}
                  placeholder="Select a country"
                  isSearchable
                  styles={selectStyles}
                />
              );
            }}
          />
        </FieldShell>

        <FieldShell
          id="state"
          label="State / Province"
          required
          error={errors.state?.message}
          hint={!watchCountry ? "Pick a country first" : undefined}
        >
          <Controller
            control={control}
            name="state"
            render={({ field }) => {
              const selected =
                states.find((s) => s.label === field.value) || null;
              return (
                <Select
                  inputId="state"
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
                  styles={selectStyles}
                />
              );
            }}
          />
        </FieldShell>
      </div>

      <FieldShell
        id="city"
        label="City"
        required
        error={errors.city?.message}
        hint={!watchState ? "Pick a state first" : undefined}
      >
        <Controller
          control={control}
          name="city"
          render={({ field }) => {
            const selected =
              cities.find((c) => c.label === field.value) || null;
            return (
              <Select
                inputId="city"
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
                onCreateOption={(inputValue) => handleAddNew("city", inputValue)}
                styles={selectStyles}
              />
            );
          }}
        />
      </FieldShell>

      {watchAddress && (
        <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-grey-light/30 border border-grey-light/60">
          <MapPin
            size={18}
            strokeWidth={1.8}
            className="text-primary shrink-0 mt-0.5"
          />
          <div className="min-w-0">
            <p className="caption-medium-12 text-grey-medium uppercase tracking-wide">
              Your address
            </p>
            <p className="body-regular-16 text-grey-dark truncate">
              {watchAddress}
            </p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-2">
        <Button
          label="Back"
          onClick={onPrevious}
          variant="outlined"
          IconLeft={<ArrowLeft size={18} />}
          disabled={isSubmitting}
        />
        <Button
          label="Continue"
          type="submit"
          variant="primary"
          IconRight={<ArrowRight size={18} />}
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
};

export default OnboardingStep2;
