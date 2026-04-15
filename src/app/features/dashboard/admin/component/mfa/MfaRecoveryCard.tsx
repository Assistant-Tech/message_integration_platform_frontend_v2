import { motion } from "framer-motion";
import { Button } from "@/app/components/ui";

interface MfaRecoveryCardProps {
  onRegenerate: () => void;
  onDownload: () => void;
  regenerateIsPending: boolean;
  hasDownloadableCodes: boolean;
}

const MfaRecoveryCard = ({
  onRegenerate,
  onDownload,
  regenerateIsPending,
  hasDownloadableCodes,
}: MfaRecoveryCardProps) => {
  return (
    <motion.div
      className="bg-white rounded-xl border border-grey-light overflow-hidden"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <div className="px-5 py-4 sm:px-6 border-b border-grey-light bg-base-white">
        <h3 className="body-bold-16 text-grey">Recovery Codes</h3>
      </div>
      <div className="px-5 py-4 sm:px-6 space-y-4">
        <p className="body-regular-16 text-grey-medium">
          Recovery codes let you access your account if you lose your
          authenticator device. Each code can only be used once. Keep them
          somewhere safe.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <Button
            label={regenerateIsPending ? "Regenerating..." : "Generate New Codes"}
            variant="primary"
            onClick={onRegenerate}
            disabled={regenerateIsPending}
          />
          <Button
            label="Download Codes"
            variant="none"
            className="border border-grey-light text-grey hover:bg-grey-light/50"
            onClick={onDownload}
            disabled={!hasDownloadableCodes}
            aria-label="Download recovery codes as a text file"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default MfaRecoveryCard;
