import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { useDemoDialogStore } from "@/app/store/DemoDialogStore";
import DemoFormContent from "./DemoFormContent";

const DemoDialog = () => {
  const { isOpen, close } = useDemoDialogStore();

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && close()}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 bg-black/70 z-40"
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
                className="fixed z-50 left-1/2 top-1/2 max-h-[95vh] w-full max-w-xs md:max-w-7xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-4xl bg-white p-4 scrollbar-hide"
              >
                <DemoFormContent onClose={close} showCloseButton={true} />
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};
export default DemoDialog;
