import React from "react";
import { Trash2, RotateCcw } from "lucide-react";

interface FileUploadProgress {
  file: File;
  progress: number;
  status: "uploading" | "completed" | "failed";
  timeLeft?: string;
}

const FileUploadProgress: React.FC<{
  uploads?: FileUploadProgress[];
  onRemove: (index: number) => void;
  onRetry: (index: number) => void;
}> = ({ uploads, onRemove, onRetry }) => {
  if (uploads?.length === 0) return null;

  return (
    <div className="mt-4 space-y-3">
      {uploads?.map((upload, index) => (
        <div
          key={index}
          className="bg-white border border-grey-light rounded-lg p-4"
        >
          {/* File Info Header */}
          <div className="flex items-center justify-between text-start">
            <div className="flex-1">
              <p className="body-regular-16 text-grey">
                {upload.file.name} (
                {(upload.file.size / (1024 * 1024)).toFixed(1)} MB)
              </p>
              {upload.status === "uploading" && upload.timeLeft && (
                <p className="body-regular-16 text-information-dark">
                  {upload.timeLeft} left
                </p>
              )}
              {upload.status === "failed" && (
                <p className="body-regular-16 text-red-600">Upload failed.</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {upload.status === "failed" && (
                <button
                  onClick={() => onRetry(index)}
                  className="p-1 body-regular-16 text-grey-medium hover:text-grey-medium"
                  title="Retry upload"
                >
                  <RotateCcw size={16} />
                </button>
              )}
              <button
                onClick={() => onRemove(index)}
                className="p-1 text-grey-medium hover:text-danger"
                title="Remove file"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>

          {/* Progress Bar and Percentage (Conditionally Rendered) */}
          {upload.status !== "completed" && (
            <>
              <div className="w-full bg-grey-light rounded-full h-2 mb-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    upload.status === "uploading"
                      ? "bg-[#007BE5]"
                      : "bg-danger"
                  }`}
                  style={{ width: `${upload.progress}%` }}
                />
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs text-grey-medium">
                  {upload.status === "failed"
                    ? "Failed"
                    : `${upload.progress}%`}
                </span>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default FileUploadProgress;
