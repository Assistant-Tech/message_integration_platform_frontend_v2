import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { Agreement, Button } from "@/app/components/ui/";
import { cn } from "@/app/utils/cn";
import newsletter from "@/app/assets/images/newsletter.webp";
const PopupModal = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/70 z-40" />

        <Dialog.Content aria-describedby={undefined}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
              "w-[90%] sm:w-full sm:max-w-lg xl:max-w-xl",
              "rounded-4xl bg-white shadow-xl",
            )}
          >
            <figure
              className="h-48 sm:h-60 md:h-72 rounded-t-3xl relative"
              style={{
                background:
                  "linear-gradient(159deg, #1CB496 8.78%, #0C4E41 81.41%)",
              }}
            >
              <Dialog.Close asChild>
                <button className="absolute top-4 right-4 text-base-black bg-white rounded-full p-4 cursor-pointer focus:outline-none">
                  <X className="w-6 h-6  absolute right-1 top-1" />
                </button>
              </Dialog.Close>
              <img
                src={newsletter}
                alt="newsletter.png"
                className="w-full h-full object-cover rounded-t-3xl"
              />
            </figure>
            <div className="p-4 sm:p-6 md:p-8">
              <div className="flex items-center justify-between">
                <Dialog.Title className="h3-bold-32 text-center p-2 text-grey">
                  Unlock Exclusive Offers and Stay Updated
                </Dialog.Title>
              </div>
              <div className="text-grey body-medium-16 mb-2 text-center">
                Subscribe to Assistant Tech’s monthly newsletter to stay updated
                on new features and services and get a chance to unlock
                exclusive offers as a gift
              </div>
              <div className="relative py-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 body-regular-14 sm:body-regular-16 text-base-black bg-white"
                />
              </div>

              <div className="flex justify-center gap-2 pb-4">
                <Dialog.Close asChild>
                  <Button
                    label="Subscribe"
                    variant="primary"
                    className="w-full px-2 py-3"
                    name="close"
                  />
                </Dialog.Close>
              </div>
              {/* Agreement Addition */}
              <Agreement />
            </div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default PopupModal;
