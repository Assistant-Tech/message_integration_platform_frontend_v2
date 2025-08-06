import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";

import test from "@/app/assets/video/test_clip.mp4";
import crmIntro from "@/app/assets/images/crm_video.webp";

const LearnMoreCRM = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="py-10 sm:py-16 md:py-20 lg:py-24">
      {/* Heading & Text */}
      <div className="flex flex-col lg:flex-row lg:justify-between gap-6 sm:gap-8 md:gap-12 lg:gap-16 mb-8 sm:mb-12 md:mb-16">
        <motion.h2 className="h2-bold-40 text-base-black lg:max-w-lg">
          Learn More About Our CRM Software
        </motion.h2>
        <motion.div className="lg:max-w-5xl flex justify-start items-center">
          <p className="body-regular-16 text-grey-medium ">
            Curious about how our software works? Watch this introductory video
            and learn how it's the best solution for your business. Explore more
            videos about our services{" "}
            <span className="text-primary underline cursor-pointer hover:text-primary-dark">
              here
            </span>
            .
          </p>
        </motion.div>
      </div>

      {/* Video Thumbnail with Play Button */}
      <div className="relative w-full max-w-6xl mx-auto aspect-video rounded-3xl overflow-hidden">
        <img
          src={crmIntro}
          alt="CRM Intro"
          className="w-full h-full object-full"
        />
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <button
              className="absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-black/40 transition"
              aria-label="Open video"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 bg-white/90 rounded-full flex items-center justify-center group hover:scale-110 transition-transform duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 md:w-12 md:h-12 text-primary ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/60 z-40" />
            <Dialog.Content asChild>
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <div className="w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden relative">
                  <Dialog.Close asChild>
                    <button className="absolute top-3 right-3 text-white hover:text-red-400 z-50">
                      <X className="w-6 h-6" />
                    </button>
                  </Dialog.Close>
                  <video
                    src={test}
                    autoPlay
                    controls
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  );
};

export default LearnMoreCRM;
