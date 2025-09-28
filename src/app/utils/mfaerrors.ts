export const mapMfaErrorMessage = (message?: string) => {
  if (!message) return "Verification failed";

  const msg = message.toLowerCase();

  if (msg.includes("invalid")) return "Invalid verification code.";
  if (msg.includes("expired")) return "Session expired. Please log in again.";
  if (msg.includes("already enabled") || msg.includes("failed"))
    return "MFA is already enabled.";
  if (msg.includes("request")) return "Failed to request MFA.";

  return message;
};
