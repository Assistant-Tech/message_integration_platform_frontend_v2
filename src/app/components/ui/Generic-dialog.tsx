import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import React from "react";

interface GenericDialogProps {
  open: boolean;
  onClose?: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

const GenericDialog = ({
  open,
  onClose,
  title,
  children,
  maxWidth = "max-w-5xl",
}: GenericDialogProps) => {
  // Back-compat: some callers pass "7xl" instead of "max-w-7xl". Prefix if missing.
  const resolvedMaxWidth = maxWidth.startsWith("max-w-")
    ? maxWidth
    : `max-w-${maxWidth}`;
  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose?.()}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 bg-black/50 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </Dialog.Overlay>

            <Dialog.Content asChild aria-describedby={undefined}>
              <motion.div
                initial={{ y: "-10%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-10%", opacity: 0 }}
                className={`fixed z-50 top-1/2 left-1/2 w-[95vw] ${resolvedMaxWidth} max-h-[90vh] overflow-auto -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white shadow-lg`}
              >
                {/* Consolidate the title and close button into a single header for flexbox alignment */}
                {(title || onClose) && (
                  <div className="flex items-center justify-between p-6 border-b border-grey-light">
                    <Dialog.Title asChild>
                      {title && (
                        <h1 className="h4-bold-24 text-grey">{title}</h1>
                      )}
                    </Dialog.Title>
                    {onClose && (
                      <Dialog.Close asChild>
                        <button
                          className="p-2 rounded-lg bg-grey-light"
                          aria-label="Close"
                        >
                          <X
                            size={20}
                            className="cursor-pointer"
                            color="grey"
                          />
                        </button>
                      </Dialog.Close>
                    )}
                  </div>
                )}
                <Dialog.Title asChild>
                  {title ? (
                    <VisuallyHidden.Root>
                      <h1 className="h4-bold-24 text-grey">{title}</h1>
                    </VisuallyHidden.Root>
                  ) : (
                    <VisuallyHidden.Root>
                      <h1>Dialog</h1>{" "}
                      {/* Provide a generic title for screen readers */}
                    </VisuallyHidden.Root>
                  )}
                </Dialog.Title>

                {/* Content */}
                <div className="p-6">{children}</div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};

export default GenericDialog;
