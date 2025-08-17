import React, { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { z } from "zod";
import { FileUploadProgress } from "@/app/features/auth/pages/onboarding/components";
import { Button, Input } from "@/app/components/ui/";
import { useOnboardingStore } from "@/app/features/auth/pages/onboarding/hooks/useOnboardingStore";
import { onboardingStep4Schema } from "@/app/features/auth/pages/onboarding/schemas/Onboarding.schema";
import Delete_icon_large from "@/app/assets/icons/warning_fill.svg";

interface FileUploadProgressData {
  file: File;
  progress: number;
  status: "uploading" | "completed" | "failed";
  timeLeft?: string;
}

interface LegalDocsData {
  panNumber: string;
  panCardImage: File | null;
  uploadProgress: FileUploadProgressData[];
}

interface LegalDocsErrors {
  panNumber?: string;
  panCardImage?: string;
}

interface OnboardingStep4Props {
  onNext: (stepData: LegalDocsData) => void;
  onPrevious: () => void;
  onSkip?: () => void;
  isSubmitting: boolean;
  isOptional?: boolean;
}

const OnboardingStep4: React.FC<OnboardingStep4Props> = ({
  onNext,
  onPrevious,
  onSkip,
  isSubmitting,
  isOptional,
}) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [fileToRemoveIndex, setFileToRemoveIndex] = useState<number | null>(
    null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data } = useOnboardingStore();

  const [formData, setFormData] = useState<LegalDocsData>(
    data.step4 || {
      panNumber: "",
      panCardImage: null,
      uploadProgress: [],
    },
  );

  const [errors, setErrors] = useState<LegalDocsErrors>({});

  const simulateFileUpload = (file: File): Promise<void> => {
    return new Promise((resolve, reject) => {
      let progress = 0;

      const newUpload: FileUploadProgressData = {
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

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        panCardImage: "Please upload only .jpeg, .png or .pdf files",
      }));
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        panCardImage: "File size must be less than 10MB",
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, panCardImage: file }));
    if (errors.panCardImage)
      setErrors((prev) => ({ ...prev, panCardImage: "" }));

    try {
      await simulateFileUpload(file);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleRemoveUpload = (index: number) => {
    setFileToRemoveIndex(index);
    setShowConfirmDialog(true);
  };

  const confirmRemoveUpload = () => {
    if (fileToRemoveIndex === null) return;

    const fileNameToRemove =
      formData.uploadProgress[fileToRemoveIndex]?.file.name;

    setFormData((prev) => ({
      ...prev,
      uploadProgress: prev.uploadProgress.filter(
        (_, i) => i !== fileToRemoveIndex,
      ),
      panCardImage:
        prev.panCardImage?.name === fileNameToRemove ? null : prev.panCardImage,
    }));

    setFileToRemoveIndex(null);
    setShowConfirmDialog(false);
  };

  const cancelRemoveUpload = () => {
    setFileToRemoveIndex(null);
    setShowConfirmDialog(false);
  };

  const handleRetryUpload = async (index: number) => {
    const upload = formData.uploadProgress[index];
    if (!upload) return;

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
    try {
      const result = onboardingStep4Schema.parse(formData);

      if (
        result.panNumber &&
        result.uploadProgress?.filter((u) => u.status === "completed")
          .length === 0
      ) {
        setErrors({
          panCardImage: "Please upload and complete at least one PAN document.",
        });
        return false;
      }

      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: LegalDocsErrors = {};
        err.errors.forEach((e) => {
          const field = e.path[0] as keyof LegalDocsErrors;
          fieldErrors[field] = e.message;
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validateForm()) {
      onNext(formData);
    }
  };

  const handleSkipStep = () => {
    if (onSkip) {
      onSkip();
    }
  };

  return (
    <div className="space-y-6">
      {/* Optional step notification */}
      {isOptional && (
        <div className="bg-information-light rounded-lg p-4 mb-6">
          <p className="text-information text-sm">
            📄 This step is optional. You can skip it and complete it later from
            your dashboard.
          </p>
        </div>
      )}

      {/* PAN Input */}
      <div>
        <label htmlFor="pan" className="block mb-2 body-bold-16 text-grey">
          Enter Your PAN
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
          Upload Company's PAN Card
        </label>

        {/* Deletion Confirmation Modal */}
        {showConfirmDialog && fileToRemoveIndex !== null && (
          <div className="fixed inset-0 z-50 bg-black/65 flex items-center justify-center">
            <div className="bg-white rounded-lg text-center shadow-lg p-6 max-w-md w-full relative">
              <div
                className="absolute top-0 right-2 p-4 cursor-pointer"
                onClick={cancelRemoveUpload}
              >
                <X size={24} color="grey" />
              </div>

              <figure className="flex justify-center items-center pb-4">
                <img
                  src={Delete_icon_large}
                  alt="delete_icon.svg"
                  width="48"
                  height="48"
                />
              </figure>
              <h2 className="h5-bold-16 text-base-black mb-4">
                Delete Document?
              </h2>
              <p className="h5-regular-16 text-grey-medium mb-6">
                Are you sure you want to delete this document? Once deleted,
                this action cannot be reversed.
              </p>
              <div className="flex justify-center gap-4 w-full">
                <Button
                  label="Cancel"
                  onClick={cancelRemoveUpload}
                  variant="neutral"
                  className="w-full bg-grey text-white hover:bg-base-black"
                />
                <Button
                  label="Delete"
                  onClick={confirmRemoveUpload}
                  variant="danger"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        )}

        {/* Upload Area */}
        {formData.uploadProgress.length === 0 && (
          <div className="border border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 text-center">
            <p className="text-sm text-grey-medium">
              Drag & drop attachment here
            </p>
            <p className="text-sm text-grey-medium my-2">Or</p>
            <label
              htmlFor="panUpload"
              className="inline-block bg-primary text-white px-6 py-2 rounded-md cursor-pointer hover:bg-primary-dark transition-colors"
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
            {errors.panCardImage && (
              <p className="text-danger text-sm mt-2">{errors.panCardImage}</p>
            )}
          </div>
        )}

        {/* File Upload Progress */}
        <FileUploadProgress
          uploads={formData.uploadProgress}
          onRemove={handleRemoveUpload}
          onRetry={handleRetryUpload}
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4">
        <Button
          label="Go Back"
          onClick={onPrevious}
          variant="outlined"
          IconLeft={<ArrowLeft size={20} />}
          disabled={isSubmitting}
        />

        <div className="flex gap-3">
          {isOptional && onSkip && (
            <Button
              label="Skip"
              onClick={handleSkipStep}
              variant="outlined"
              disabled={
                isSubmitting ||
                formData.uploadProgress.some((u) => u.status === "uploading")
              }
            />
          )}
          <Button
            label="Next"
            onClick={handleSubmit}
            variant="primary"
            IconRight={<ArrowRight size={20} />}
            disabled={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
};

export default OnboardingStep4;
