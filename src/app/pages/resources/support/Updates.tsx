import { motion } from "framer-motion";
import { toast } from "sonner";
import { useState } from "react";
import { MessageSquare } from "lucide-react";

import clock from "@/app/assets/greenIcons/clock.svg";

import { Agreement, Breadcrumb, Button, Input } from "@/app/components/ui";
import { APP_ROUTES } from "@/app/constants/routes";
import essentials from "@/app/assets/greenIcons/essentials.svg";
import { GetStarted } from "@/app/pages/landing/";
import { NewsLetter } from "@/app/components/common";
import { BlogCard, SupportCrm } from "@/app/pages/resources/components";

const Updates = () => {
  const SupportCrumb = [
    { label: "Resources", href: APP_ROUTES.PUBLIC.RESOURCES_OVERVIEW },
    { label: "Support", href: APP_ROUTES.PUBLIC.SUPPORT },
    { label: "Updates" },
  ];

  const [email, setEmail] = useState("");

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      toast.success("Email Sent! We'll get back to you soon!");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };
  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };
  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  return (
    <div className="min-h-screen my-20 ">
      {/* CUSTOMIZABLE OWN CHATBOT */}
      <div className="relative z-10 text-base-black pt-4 px-4 md:px-px py-14">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 sm:mb-6 md:mb-8"
        >
          <Breadcrumb items={SupportCrumb} />
        </motion.div>

        {/* CREATE CHATBOT  */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="pt-2 lg:py-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-start">
            {/* Left Content */}
            <motion.div variants={itemVariants} className="space-y-8 max-w-2xl">
              <div className="space-y-4 w-full">
                <motion.h1
                  className="text-grey h2-bold-40"
                  variants={itemVariants}
                >
                  Create and Customize Your Own{"  "}
                  <span className="text-primary">Chatbot</span>
                </motion.h1>

                <motion.p
                  className="text-base md:text-lg text-grey-medium"
                  variants={itemVariants}
                >
                  All Assistant Tech's users can now create and customize their
                  own AI-powered chatbots.
                </motion.p>

                <motion.p
                  className="body-regular-16 text-grey"
                  variants={itemVariants}
                >
                  Start your 14-days free trial today!
                </motion.p>
              </div>

              {/* Email Form */}
              <motion.form
                onSubmit={handleEmailSubmit}
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-3 sm:gap-2 w-full"
              >
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3 py-3"
                  required
                />
                <Button
                  label="Get Started"
                  type="submit"
                  className="w-full sm:w-36 px-4 py-3"
                />
              </motion.form>

              <p className="body-regular-16 text-grey-medium">
                No credit card needed.
                <Agreement />
              </p>

              {/* Features */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col justify-between sm:flex-row gap-4 sm:gap-8"
              >
                <div className="flex items-center gap-3 cursor-pointer">
                  <img src={clock} alt="round_clock.svg" className="w-8 h-8" />
                  <span className="text-primary h5-bold-16">
                    Round the Clock Reliability
                  </span>
                </div>
                <div className="flex items-center gap-3 cursor-pointer">
                  <img
                    src={essentials}
                    alt="essentials.svg"
                    className="w-8 h-8"
                  />
                  <span className="text-primary h5-bold-16">
                    All Essential Solutions
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Visual Content */}
            <motion.div variants={itemVariants} className="relative w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 px-4">
                {/* Chat Icon Card */}
                <motion.div
                  variants={floatingVariants}
                  animate="animate"
                  className="bg-gradient-to-br from-warning to-danger rounded-3xl p-6 sm:p-8 shadow-2xl"
                >
                  <div className="relative">
                    <div className="bg-white rounded-2xl p-6 shadow-lg relative">
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white font-bold">1</span>
                      </div>
                      <div className="w-full h-20 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg mb-4"></div>
                      <div className="space-y-2">
                        <div className="w-3/4 h-3 bg-gray-200 rounded"></div>
                        <div className="w-1/2 h-3 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Mobile Phone */}
                <motion.div
                  variants={pulseVariants}
                  animate="animate"
                  className="bg-gradient-to-br from-gray-800 to-grey rounded-3xl p-4 shadow-2xl self-end"
                >
                  <div className="bg-base-white rounded-2xl p-6 h-48 sm:h-56 relative overflow-hidden">
                    <div className="absolute top-4 right-4">
                      <MessageSquare className="w-6 h-6 text-gray-400" />
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 space-y-2">
                      <div className="bg-blue-500 rounded-lg p-2 max-w-[70%]">
                        <div className="w-16 h-2 bg-blue-300 rounded"></div>
                      </div>
                      <div className="bg-grey-light rounded-lg p-2 max-w-[60%] ml-auto">
                        <div className="w-12 h-2 bg-grey-medium rounded"></div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Desktop/Laptop */}
                <motion.div
                  variants={floatingVariants}
                  animate="animate"
                  style={{ animationDelay: "1s" }}
                  className="col-span-1 sm:col-span-2 bg-white rounded-3xl p-6 lg:p-8 shadow-2xl"
                >
                  <div className="bg-gradient-to-br from-base-white to-base-white rounded-2xl p-4 lg:p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 bg-danger rounded-full"></div>
                      <div className="w-3 h-3 bg-warning rounded-full"></div>
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                    </div>
                    <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-warning rounded-full flex items-center justify-center">
                          <MessageSquare className="w-4 h-4 text-white" />
                        </div>
                        <div className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800">
                          MESSAGE
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="w-full h-2 bg-yellow-200 rounded"></div>
                        <div className="w-4/5 h-2 bg-gray-200 rounded"></div>
                        <div className="w-3/5 h-2 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Orbs */}
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br to-danger rounded-full shadow-lg"
                  />
                  <motion.div
                    animate={{ rotate: [360, 0] }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-blue-400 to-primary rounded-full shadow-lg"
                  />
                </motion.div>
              </div>

              {/* Floating Particles */}
              <motion.div
                animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-8 -left-8 w-4 h-4 bg-gradient-to-br from-warning via-primary to-danger rounded-full opacity-60"
              />
              <motion.div
                animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-4 -right-8 w-3 h-3 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-60"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* CRM section */}
      <SupportCrm />

      {/* Blog Card Section */}
      <BlogCard />

      {/* GET STARTED */}
      <div className="relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] w-screen">
        <GetStarted />
      </div>

      {/* NEWSLETTER */}
      <div className="pt-20">
        <NewsLetter />
      </div>
    </div>
  );
};

export default Updates;
