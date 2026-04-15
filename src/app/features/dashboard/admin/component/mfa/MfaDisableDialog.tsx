import { motion } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import { Button, Input } from "@/app/components/ui";

interface MfaDisableDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  password: string;
  onPasswordChange: (password: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
  isPending: boolean;
}

const MfaDisableDialog = ({
  open,
  onOpenChange,
  password,
  onPasswordChange,
  onConfirm,
  onCancel,
  isPending,
}: MfaDisableDialogProps) => {
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
              className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 relative"
              aria-labelledby="confirm-disable-title"
            >
              <Dialog.Title
                id="confirm-disable-title"
                className="h5-bold-16 text-grey"
              >
                Disable MFA
              </Dialog.Title>
              <p className="body-medium-16 text-grey mt-4">
                To disable MFA, please confirm your account password:
              </p>

              <Input
                type="password"
                placeholder="Enter your password"
                className="w-full border rounded px-3 py-2 mt-4"
                value={password}
                onChange={(e) => onPasswordChange(e.target.value)}
              />

              <div className="flex justify-end gap-3 mt-6 w-full">
                <Button
                  label="Cancel"
                  variant="danger"
                  onClick={onCancel}
                  className="w-full"
                  aria-label="Cancel disabling multi-factor authentication"
                />
                <Button
                  label={isPending ? "Disabling..." : "Yes, Disable"}
                  variant="primary"
                  onClick={onConfirm}
                  disabled={isPending}
                  className="w-full"
                  aria-label="Confirm disable multi-factor authentication"
                />
              </div>
            </div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default MfaDisableDialog;
