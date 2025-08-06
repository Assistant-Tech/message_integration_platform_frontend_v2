export interface FileUploadProgress {
  file: File;
  progress: number;
  status: "uploading" | "completed" | "failed";
  timeLeft?: string;
}

export interface LegalDocsData {
  panNumber: string;
  panFile: File | null;
  uploadProgress: FileUploadProgress[];
}
