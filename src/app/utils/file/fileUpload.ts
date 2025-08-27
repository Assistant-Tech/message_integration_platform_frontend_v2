export const simulateFileUpload = (
  _file: File,
  onProgress: (
    progress: number,
    status: "uploading" | "completed" | "failed",
    timeLeft?: string,
  ) => void,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress >= 100) {
        clearInterval(interval);
        onProgress(100, "completed");
        Math.random() > 0.3 ? resolve() : reject(new Error("Failed"));
      } else {
        onProgress(progress, "uploading", getTimeLeft(progress));
      }
    }, 200);
  });
};

const getTimeLeft = (progress: number): string =>
  progress < 50 ? "2 min left" : progress < 80 ? "1 min left" : "30 sec left";
