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
      <h3 className="text-sm font-medium text-gray-700">
        Upload Company's PAN Card
      </h3>
      {uploads?.map((upload, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-lg p-4"
        >
          {/* File Info Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                {upload.file.name} (
                {(upload.file.size / (1024 * 1024)).toFixed(1)} MB)
              </p>
              {upload.status === "uploading" && upload.timeLeft && (
                <p className="text-xs text-blue-600">{upload.timeLeft} left</p>
              )}
              {upload.status === "completed" && (
                <p className="text-xs text-green-600">0 min left</p>
              )}
              {upload.status === "failed" && (
                <p className="text-xs text-red-600">Upload failed.</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {upload.status === "failed" && (
                <button
                  onClick={() => onRetry(index)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                  title="Retry upload"
                >
                  <RotateCcw size={16} />
                </button>
              )}
              <button
                onClick={() => onRemove(index)}
                className="p-1 text-gray-400 hover:text-red-600"
                title="Remove file"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                upload.status === "uploading"
                  ? "bg-blue-500"
                  : upload.status === "completed"
                    ? "bg-green-500"
                    : "bg-red-500"
              }`}
              style={{ width: `${upload.progress}%` }}
            />
          </div>

          {/* Progress Percentage */}
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">
              {upload.status === "failed" ? "Failed" : `${upload.progress}%`}
            </span>
            {upload.status === "completed" && (
              <span className="text-xs text-green-600 font-medium">100%</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FileUploadProgress;
