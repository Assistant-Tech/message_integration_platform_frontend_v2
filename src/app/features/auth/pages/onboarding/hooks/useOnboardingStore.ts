import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FileUploadProgress {
  file: File;
  progress: number;
  status: "uploading" | "completed" | "failed";
  timeLeft?: string;
}

type OnboardingData = {
  step1: {
    organizationName: string;
    email: string;
    contactNumber: string;
    website: string;
  };
  step2: {
    country: string;
    state: string;
    city: string;
    address: string;
  };
  step3: {
    industry: string;
    isOther?: boolean;
  };
  step4: {
    panNumber: string;
    panCardImage: File | null;
    uploadProgress: FileUploadProgress[];
  };
  step5: {
    members: {
      name: string;
      role: string;
      email: string;
    }[];
  };
};

type Store = {
  data: Partial<OnboardingData>;
  completedSteps: number;
  setStepData: (
    step: keyof OnboardingData,
    values: OnboardingData[keyof OnboardingData],
  ) => void;
  setCompletedSteps: (step: number) => void;
  reset: () => void;
};

export const useOnboardingStore = create<Store>()(
  persist(
    (set) => ({
      data: {},
      completedSteps: 0,
      setStepData: (step, values) =>
        set((state) => ({
          data: { ...state.data, [step]: values },
          completedSteps: Math.max(
            state.completedSteps,
            parseInt(step.replace("step", "")),
          ),
        })),
      setCompletedSteps: (step) =>
        set((state) => ({
          completedSteps: Math.max(state.completedSteps, step),
        })),
      reset: () => set({ data: {}, completedSteps: 0 }),
    }),
    {
      name: "onboarding-data",
      // Note: File objects cannot be serialized to localStorage
      // You may want to consider storing only file metadata
      partialize: (state) => ({
        ...state,
        data: {
          ...state.data,
          step4: state.data.step4
            ? {
                ...state.data.step4,
                panFile: null,
                uploadProgress: [],
              }
            : undefined,
        },
      }),
    },
  ),
);
