import React, { useRef, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  FileUp,
  Info,
  Trash2,
} from "lucide-react";
import { z } from "zod";
import { FileUploadProgress } from "@/app/features/auth/pages/onboarding/components";
import { Button, Input } from "@/app/components/ui/";
import { GenericDialog } from "@/app/components/common";
import { useOnboardingStore } from "@/app/features/auth/pages/onboarding/hooks/useOnboardingStore";
import { onboardingStep4Schema } from "@/app/features/auth/pages/onboarding/schemas/Onboarding.schema";

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

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "application/pdf"];
const MAX_SIZE_BYTES = 10 * 1024 * 1024;

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
  const [isDragging, setIsDragging] = useState(false);
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

  const validateAndUpload = async (file: File) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        panCardImage: "Please upload a JPEG, PNG, or PDF file.",
      }));
      return;
    }

    if (file.size > MAX_SIZE_BYTES) {
      setErrors((prev) => ({
        ...prev,
        panCardImage: "File is larger than 10MB.",
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, panCardImage: file }));
    setErrors((prev) => ({ ...prev, panCardImage: "" }));

    try {
      await simulateFileUpload(file);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (!file) return;
    await validateAndUpload(file);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    await validateAndUpload(file);
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
        result.uploadProgress?.filter((u) => u.status === "completed").length ===
          0
      ) {
        setErrors({
          panCardImage:
            "Please upload and complete at least one supporting document.",
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
    if (validateForm()) onNext(formData);
  };

  const handleSkipStep = () => onSkip?.();

  return (
    <div className="space-y-6">
      {isOptional && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-information-light/40 border border-information-light">
          <Info
            size={18}
            strokeWidth={1.8}
            className="text-information shrink-0 mt-0.5"
          />
          <p className="body-regular-16 text-grey-dark/80">
            This step is optional. You can skip it and add documents later from
            your dashboard.
          </p>
        </div>
      )}

      <Input
        id="pan"
        label="Registration number"
        placeholder="e.g. ABCDE1234F"
        value={formData.panNumber}
        onChange={(e) => {
          const value = e.target.value.toUpperCase();
          setFormData((prev) => ({ ...prev, panNumber: value }));
          if (errors.panNumber)
            setErrors((prev) => ({ ...prev, panNumber: "" }));
        }}
        error={errors.panNumber}
        maxLength={10}
      />

      <div>
        <label className="body-bold-16 text-grey mb-2 block">
          Registration document
        </label>

        {formData.uploadProgress.length === 0 && (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`rounded-2xl p-8 text-center border-2 border-dashed transition-colors ${
              isDragging
                ? "border-primary bg-primary/5"
                : "border-grey-light bg-grey-light/30"
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="h-10 w-10 rounded-full bg-base-white border border-grey-light/60 flex items-center justify-center text-primary">
                <FileUp size={20} strokeWidth={1.8} />
              </span>
              <p className="label-semi-bold-14 text-grey-dark">
                Drag &amp; drop your file here
              </p>
              <p className="caption-medium-12 text-grey-medium">
                or click below to browse
              </p>

              <label
                htmlFor="panUpload"
                className="mt-2 inline-flex items-center gap-1 bg-primary text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-primary-dark transition-colors label-semi-bold-14"
              >
                + Choose file
              </label>
              <input
                ref={fileInputRef}
                id="panUpload"
                type="file"
                accept=".jpeg,.jpg,.png,.pdf"
                className="hidden"
                onChange={handleFileChange}
              />
              <p className="caption-medium-12 text-grey-medium mt-2">
                JPEG, PNG, or PDF · up to 10 MB
              </p>
            </div>
            {errors.panCardImage && (
              <p className="text-sm text-danger mt-3">{errors.panCardImage}</p>
            )}
          </div>
        )}

        <FileUploadProgress
          uploads={formData.uploadProgress}
          onRemove={handleRemoveUpload}
          onRetry={handleRetryUpload}
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
        <Button
          label="Back"
          onClick={onPrevious}
          variant="outlined"
          IconLeft={<ArrowLeft size={18} />}
          disabled={isSubmitting}
        />

        <div className="flex flex-col-reverse sm:flex-row gap-3">
          {isOptional && onSkip && (
            <Button
              label="Skip for now"
              onClick={handleSkipStep}
              variant="none"
              className="underline text-grey-dark"
              disabled={
                isSubmitting ||
                formData.uploadProgress.some((u) => u.status === "uploading")
              }
            />
          )}
          <Button
            label="Continue"
            onClick={handleSubmit}
            variant="primary"
            IconRight={<ArrowRight size={18} />}
            disabled={isSubmitting}
          />
        </div>
      </div>

      <GenericDialog
        open={showConfirmDialog}
        onClose={cancelRemoveUpload}
        width="w-[90vw]"
        maxWidth="max-w-md"
      >
        <div className="text-center">
          <span className="inline-flex h-12 w-12 rounded-full bg-danger-light/40 text-danger items-center justify-center mx-auto mb-4">
            <Trash2 size={22} strokeWidth={1.8} />
          </span>
          <h3 className="h5-bold-16 text-grey-dark mb-2">Delete document?</h3>
          <p className="body-regular-16 text-grey-medium mb-6">
            Once deleted, this action can't be reversed.
          </p>
          <div className="flex flex-col-reverse sm:flex-row gap-3 w-full">
            <Button
              label="Cancel"
              onClick={cancelRemoveUpload}
              variant="outlined"
              className="flex-1"
            />
            <Button
              label="Delete"
              onClick={confirmRemoveUpload}
              variant="danger"
              IconLeft={<AlertTriangle size={18} />}
              className="flex-1"
            />
          </div>
        </div>
      </GenericDialog>
    </div>
  );
};

export default OnboardingStep4;
