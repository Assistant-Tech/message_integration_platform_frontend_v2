import { useDemoDialogStore } from "@/app/store/demo-dialog.store";
import { motion } from "framer-motion";

import { X, CircleCheckBig } from "lucide-react";
import logo from "@/app/assets/icons/logo-white.svg";

const DemoTextArea = () => {
  const { close } = useDemoDialogStore();

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.3,
      },
    }),
  };

  return (
    <div className="bg-gradient-to-br from-primary to-primary-dark rounded-3xl overflow-hidden w-full xl:w-1/2 max-w-full">
      {/* Header */}
      <div className="p-4 sm:p-6 pb-4 relative">
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          custom={0}
          className="flex items-center gap-3 mb-4 relative"
        >
          <button
            onClick={() => {
              close();
            }}
            className="text-white absolute top-3 right-0 block sm:hidden"
          >
            <X size={24} />
          </button>
          <figure className="flex justify-center items-center gap-2">
            <img
              src={logo}
              className="h-12 w-12 text-primary"
              alt="Chatblix Logo"
            />
            <h1 className="body-bold-16 tex-grey text-white">CHATBLIX</h1>
          </figure>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          custom={1}
          className="text-white h4-bold-24 lg:text-3xl mb-4"
        >
          Want to make Customer Conversations Simple? We're here to help!
        </motion.h1>

        <motion.p
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          custom={2}
          className="text-white body-bold-16"
        >
          Talk with an expert to see how we can help your team. Just fill out
          the form to book a time that works for you.
        </motion.p>
      </div>

      {/* Features */}
      <div className="px-4 sm:px-6 space-y-3 mb-4 sm:mb-6">
        {[
          "Find the best plan that suits your goal and budget.",
          "Get expert tips and insights tailored to your company.",
          "Ask questions and explore how our product fits your business.",
        ].map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            custom={index + 3}
            className="flex items-start gap-3"
          >
            <div className="p-1 flex-shrink-0">
              <CircleCheckBig size={24} className="text-white" />
            </div>
            <p className="text-white body-semi-bold-16">{feature}</p>
          </motion.div>
        ))}
        <figure className="flex justify-center pt-12">
          <img
            src={
              "https://res.cloudinary.com/dtoqwn0gx/image/upload/v1753920904/demo_snjh0d.webp"
            }
            alt="feature/image.webp"
            width={620}
            height={142}
            className="w-full h-auto object-contain rounded-2xl"
          />
        </figure>
      </div>
    </div>
  );
};

export default DemoTextArea;
