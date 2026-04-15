import { useState } from "react";
import { motion } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/app/components/ui";
import { formatSecret } from "@/app/utils/helper";
import { mapMfaErrorMessage } from "@/app/utils/mfaerrors";
import MfaVerifySection from "./MfaVerifySection";
import type { MfaData } from "@/app/types/mfa.types";
import { toast } from "sonner";

interface MfaSetupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mfaData: MfaData | null;
  isPending: boolean;
  error: Error | null;
  onVerifySuccess: (recoveryCodes: string[]) => void;
  onCancel: () => void;
}

const MfaSetupDialog = ({
  open,
  onOpenChange,
  mfaData,
  isPending,
  error,
  onVerifySuccess,
  onCancel,
}: MfaSetupDialogProps) => {
  const [isCopying, setIsCopying] = useState(false);

  const handleCopy = async () => {
    if (!mfaData?.secret) return;
    try {
      await navigator.clipboard.writeText(mfaData.secret);
      toast.success("Secret copied to clipboard");
      setIsCopying(true);
      setTimeout(() => setIsCopying(false), 2000);
    } catch {
      toast.error("Copy failed");
    }
  };

  const formattedSecret = mfaData
    ? formatSecret(mfaData.secret)
        .split(" ")
        .reduce<string[]>((lines, group, i) => {
          const lineIndex = Math.floor(i / 4);
          if (!lines[lineIndex]) lines[lineIndex] = group;
          else lines[lineIndex] += " " + group;
          return lines;
        }, [])
        .join("\n")
    : "";

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay asChild>
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        </Dialog.Overlay>
        <Dialog.Content asChild>
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            aria-modal="true"
            role="dialog"
          >
            <div
              className="w-full max-w-xl bg-white rounded-lg shadow-lg p-4 sm:p-6 relative max-h-[90vh] overflow-y-auto"
              aria-labelledby="mfa-setup-title"
            >
              <Dialog.Title
                id="mfa-setup-title"
                className="h5-bold-16 text-grey"
              >
                Multi-Factor Authentication Setup
              </Dialog.Title>
              <Dialog.Close asChild>
                <button
                  aria-label="Close multi-factor authentication setup"
                  className="absolute top-4 right-4 text-grey-medium hover:text-grey focus:outline-none focus:ring-2 rounded"
                >
                  ✕
                </button>
              </Dialog.Close>

              {isPending && (
                <div className="flex items-center justify-center py-12">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                </div>
              )}

              {mfaData && !isPending && (
                <div className="flex flex-col items-start mt-6">
                  <article className="pb-4">
                    <h2 className="body-bold-16 text-base-black mb-2 text-start">
                      Step 1: Get an Authenticator
                    </h2>
                    <p className="body-medium-16 text-grey">
                      Download Google Authenticator, Microsoft Authenticator or
                      Authy.
                    </p>
                  </article>

                  <article className="pb-px">
                    <h2 className="body-bold-16 text-base-black mb-2 text-start">
                      Step 2: Scan the QR Code
                    </h2>
                    <p className="body-medium-16 text-grey">
                      Scan the QR code below with your app or copy the key
                      manually.
                    </p>
                  </article>

                  <div className="w-full flex flex-col md:flex-row justify-between items-center px-2 sm:px-8 py-4 md:py-4 gap-4 sm:gap-6">
                    <figure className="flex-shrink-0">
                      <img
                        src={mfaData.qrCodeDataURL}
                        alt="MFA QR Code"
                        className="w-36 h-36 sm:w-48 sm:h-48 border border-[#5C5C5C] rounded-2xl p-2"
                      />
                    </figure>
                    <div className="flex flex-col items-center">
                      <div className="p-3 mt-2 rounded-lg text-center">
                        <code className="body-semi-bold-16 text-grey whitespace-pre-wrap">
                          {formattedSecret}
                        </code>
                      </div>
                      <Button
                        label={isCopying ? "Copied!" : "Copy Code"}
                        variant="none"
                        onClick={handleCopy}
                        className={`mt-4 ${isCopying ? "bg-primary text-white px-4" : ""}`}
                        aria-live="polite"
                      />
                    </div>
                  </div>

                  <article className="pb-4 w-full">
                    <h2 className="body-bold-16 text-base-black mb-2 text-start">
                      Step 3: Enter the Verification Code
                    </h2>
                    <p className="body-medium-16 text-grey mb-4">
                      Enter the 6-digit code generated by your authenticator
                      app.
                    </p>
                    <MfaVerifySection
                      onSuccess={onVerifySuccess}
                      onCancel={onCancel}
                    />
                  </article>
                </div>
              )}

              {error && !isPending && !mfaData && (
                <p
                  className="body-medium-16 text-danger my-12 text-center"
                  role="status"
                >
                  {mapMfaErrorMessage(
                    error instanceof Error
                      ? error.message
                      : String(error),
                  )}
                </p>
              )}
            </div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default MfaSetupDialog;
