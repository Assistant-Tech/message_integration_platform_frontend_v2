import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileUploadProgress,
  StepSidebar,
} from "@/app/features/auth/pages/onboarding/components";
import { Button, Input, Logo } from "@/app/components/ui/";
import { useOnboardingStore } from "@/app/features/auth/pages/onboarding/store/useOnboardingStore";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface LegalDocsData {
  panNumber: string;
  panFile: File | null;
  uploadProgress: FileUploadProgress[];
}

interface LegalDocsErrors {
  panNumber?: string;
  panFile?: string;
}

const OnboardingStep4: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data, setStepData, setCompletedSteps } = useOnboardingStore();

  const currentStep = 4;

  const [formData, setFormData] = useState<LegalDocsData>(
    data.step4 || {
      panNumber: "",
      panFile: null,
      uploadProgress: [],
    },
  );

  const [errors, setErrors] = useState<LegalDocsErrors>({});

  const simulateFileUpload = (file: File): Promise<void> => {
    return new Promise((resolve, reject) => {
      let progress = 0;

      const newUpload: FileUploadProgress = {
        file,
        progress: 0,
        status: "uploading",
        timeLeft: "2 min left",
      };

      setFormData((prev) => ({
        ...prev,
        uploadProgress: [...prev.uploadProgress, newUpload],
      }));

      const interval = setInterval(() => {
        progress += Math.random() * 15 + 5;

        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);

          setFormData((prev) => ({
            ...prev,
            uploadProgress: prev.uploadProgress.map((upload, index) =>
              index === prev.uploadProgress.length - 1
                ? {
                    ...upload,
                    progress: 100,
                    status: "completed",
                    timeLeft: undefined,
                  }
                : upload,
            ),
          }));

          if (Math.random() > 0.3) {
            resolve();
          } else {
            setTimeout(() => {
              setFormData((prev) => ({
                ...prev,
                uploadProgress: prev.uploadProgress.map((upload, index) =>
                  index === prev.uploadProgress.length - 1
                    ? { ...upload, status: "failed", progress: 80 }
                    : upload,
                ),
              }));
              reject(new Error("Upload failed"));
            }, 500);
          }
        } else {
          const timeLeft =
            progress < 50
              ? "2 min left"
              : progress < 80
                ? "1 min left"
                : "30 sec left";

          setFormData((prev) => ({
            ...prev,
            uploadProgress: prev.uploadProgress.map((upload, index) =>
              index === prev.uploadProgress.length - 1
                ? { ...upload, progress: Math.floor(progress), timeLeft }
                : upload,
            ),
          }));
        }
      }, 200);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        panFile: "Please upload only .jpeg, .png or .pdf files",
      }));
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        panFile: "File size must be less than 10MB",
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, panFile: file }));
    if (errors.panFile) setErrors((prev) => ({ ...prev, panFile: "" }));

    try {
      await simulateFileUpload(file);
    } catch (error) {
      console.error("Upload failed:", error);
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveUpload = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      uploadProgress: prev.uploadProgress.filter((_, i) => i !== index),
    }));

    // If this was the current panFile, clear it
    if (
      formData.uploadProgress[index] &&
      formData.panFile?.name === formData.uploadProgress[index].file.name
    ) {
      setFormData((prev) => ({ ...prev, panFile: null }));
    }
  };

  const handleRetryUpload = async (index: number) => {
    const upload = formData.uploadProgress[index];
    if (!upload) return;

    // Reset upload status
    setFormData((prev) => ({
      ...prev,
      uploadProgress: prev.uploadProgress.map((u, i) =>
        i === index ? { ...u, progress: 0, status: "uploading" as const } : u,
      ),
    }));

    try {
      await simulateFileUpload(upload.file);
    } catch (error) {
      console.error("Retry upload failed:", error);
    }
  };

  const validateForm = () => {
    const newErrors: LegalDocsErrors = {};
    if (!formData.panNumber.trim()) {
      newErrors.panNumber = "PAN number is required.";
    } else if (
      !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber.toUpperCase())
    ) {
      newErrors.panNumber =
        "Please enter a valid PAN number (e.g., ABCDE1234F).";
    }

    const completedUploads = formData.uploadProgress.filter(
      (u) => u.status === "completed",
    );
    if (completedUploads.length === 0) {
      newErrors.panFile =
        "Please upload and complete at least one PAN document.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setStepData("step4", formData);
      setCompletedSteps(4);
      navigate("/onboardingform/step-5");
    }
  };

  const handleSkip = () => {
    // Set step as completed but with minimal data
    setStepData("step4", { panNumber: "", panFile: null, uploadProgress: [] });
    setCompletedSteps(4);
    navigate("/onboardingform/step-5");
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto flex flex-col justify-center">
        <article className="pb-12">
          <Logo />
        </article>

        <div className="mb-10">
          <h1 className="h2-bold-40 text-black mb-2">
            Welcome to Chatblix, Jane!
          </h1>
          <p className="text-grey-medium body-regular-16 max-w-2xl">
            Complete your onboarding process by setting up your workplace. The
            next few steps will contain all the necessary information you will
            need to enter to personalize your Chatblix account.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Step Sidebar */}
          <StepSidebar
            currentStep={currentStep}
            previousStep={currentStep - 1}
          />

          {/* Right Content */}
          <div className="w-full lg:flex-1">
            <h2 className="h4-bold-24 text-grey mb-8">
              Your Legal Documentation
            </h2>

            {/* INPUT SECTION */}
            <div className="space-y-6">
              {/* PAN Input */}
              <div>
                <label
                  htmlFor="pan"
                  className="block mb-2 body-bold-16 text-grey"
                >
                  Enter Your PAN <span className="text-danger">*</span>
                </label>
                <Input
                  id="pan"
                  placeholder="Enter your PAN (e.g., ABCDE1234F)"
                  value={formData.panNumber}
                  onChange={(e) => {
                    const value = e.target.value.toUpperCase();
                    setFormData((prev) => ({
                      ...prev,
                      panNumber: value,
                    }));
                    if (errors.panNumber)
                      setErrors((prev) => ({ ...prev, panNumber: "" }));
                  }}
                  error={errors.panNumber}
                  maxLength={10}
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block mb-2 body-bold-16 text-grey">
                  Upload Company's PAN Card{" "}
                  <span className="text-danger">*</span>
                </label>
                <div className="border border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 text-center">
                  <p className="text-sm text-gray-500">
                    Drag & drop attachment here
                  </p>
                  <p className="text-sm text-gray-500 my-2">Or</p>
                  <label
                    htmlFor="panUpload"
                    className="inline-block bg-black text-white px-6 py-2 rounded-md cursor-pointer hover:bg-gray-800 transition-colors"
                  >
                    + Add Attachment
                  </label>
                  <input
                    ref={fileInputRef}
                    id="panUpload"
                    type="file"
                    accept=".jpeg,.jpg,.png,.pdf"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <p className="text-xs text-gray-400 mt-2">
                    You can attach .jpeg, .png or .pdf files (Max 10MB)
                  </p>
                  {errors.panFile && (
                    <p className="text-danger text-sm mt-2">{errors.panFile}</p>
                  )}
                </div>

                {/* File Upload Progress */}
                <FileUploadProgress
                  uploads={formData.uploadProgress}
                  onRemove={handleRemoveUpload}
                  onRetry={handleRetryUpload}
                />
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8">
                <Button
                  label="Go Back"
                  onClick={() => navigate("/onboardingform/step-3")}
                  variant="outlined"
                  IconLeft={<ArrowLeft size={24} />}
                />
                <div className="flex items-center gap-4">
                  <Button
                    label="Skip this step"
                    onClick={handleSkip}
                    className="bg-white text-primary hover:bg-white underline body-regular-underline-16"
                  />
                  <Button
                    label="Next"
                    onClick={handleSubmit}
                    variant="primary"
                    IconRight={<ArrowRight size={24} />}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingStep4;
