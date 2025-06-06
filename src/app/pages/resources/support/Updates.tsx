import { motion } from "framer-motion";
import { toast } from "sonner";
import { useState } from "react";

import { APP_ROUTES } from "@/app/constants/routes";
import { Agreement, Breadcrumb, Button } from "@/app/components/ui";
import { CheckCircle, Clock, MessageSquare, Zap } from "lucide-react";

const Updates = () => {
  const SupportCrumb = [
    { label: "Resources", href: APP_ROUTES.PUBLIC.RESOURCES_OVERVIEW },
    { label: "Updates" },
  ];

  const [email, setEmail] = useState("");

  // SENT EMAIL for further details
  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      toast.success("Email Sent! We'll get back to you soon!");
    }
  };


  // VARIANTS FOR ANIMATION
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
    <div className="min-h-screen bg-base-white my-20 relative overflow-hidden rounded-4xl">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-yellow-200/30 to-orange-300/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-purple-300/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-green-200/20 to-teal-300/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 text-base-black pt-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 sm:mb-6 md:mb-8 container mx-auto px-4 sm:px-6 lg:px-px"
        >
          <Breadcrumb items={SupportCrumb} />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container mx-auto px-4 sm:px-6 lg:px-px pt-12 lg:py-8"
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="space-y-6">
                <motion.h1
                  className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-grey leading-tight"
                  variants={itemVariants}
                >
                  Create and{" "}
                  <span className="bg-gradient-to-r from-primary via-warning to-danger bg-clip-text text-transparent">
                    Customize
                  </span>
                  <br />
                  Your Own Chatbot
                </motion.h1>

                <motion.p
                  className="text-lg sm:text-xl text-gray-600 max-w-xl leading-relaxed"
                  variants={itemVariants}
                >
                  All Assistant Tech's users can now create and customize their
                  own AI-powered chatbots.
                </motion.p>

                <motion.p
                  className="text-base sm:text-lg text-grey-meplaceholder-grey-medium font-medium"
                  variants={itemVariants}
                >
                  Start your 14-days free trial today!
                </motion.p>
              </div>

              {/* Email Form */}
              <motion.form
                onSubmit={handleEmailSubmit}
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 max-w-md"
              >
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-grey-light rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200 text-grey placeholder-grey-medium"
                    required
                  />
                </div>

                <Button
                  label="Get Started"
                  IconRight={<CheckCircle />}
                  type="submit"
                />
              </motion.form>

              {/* Agreement */}
              <Agreement />

              {/* Features */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-6 sm:gap-12"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary-light rounded-full">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-grey-medium font-medium">
                    Round the Clock Reliability
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Zap className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-grey-medium font-medium">
                    All Essential Solutions
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Visual Content */}
            <motion.div variants={itemVariants} className="relative">
              <div className="grid grid-cols-2 gap-6 lg:gap-8">
                {/* Chat Icon Card */}
                <motion.div
                  variants={floatingVariants}
                  animate="animate"
                  className="bg-gradient-to-br from-warning at- to-danger rounded-3xl p-8 lg:p-12 shadow-2xl"
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
                  <div className="bg-base-white rounded-2xl p-6 h-48 lg:h-56 relative overflow-hidden">
                    <div className="absolute top-4 right-4">
                      <MessageSquare className="w-6 h-6 text-gray-400" />
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 space-y-2">
                      <div className="bg-blue-500 rounded-lg p-2 max-w-[70%]">
                        <div className="w-16 h-2 bg-blue-300 rounded"></div>
                      </div>
                      <div className="bg-grey-light rounded-lg p-2 max-w-[60%] ml-auto">
                        <div className="w-12 h-2 bg-grey-meplaceholder-grey-medium rounded"></div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Desktop/Laptop */}
                <motion.div
                  variants={floatingVariants}
                  animate="animate"
                  style={{ animationDelay: "1s" }}
                  className="col-span-2 bg-white rounded-3xl p-6 lg:p-8 shadow-2xl"
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
                        <div className="text-xl lg:text-2xl font-bold text-gray-800">
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

                  {/* Floating Elements */}
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br  to-danger rounded-full shadow-lg"
                  ></motion.div>
                  <motion.div
                    animate={{ rotate: [360, 0] }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-blue-400 to-primary rounded-full shadow-lg"
                  ></motion.div>
                </motion.div>
              </div>

              {/* Floating particles */}
              <motion.div
                animate={{
                  y: [-20, 20, -20],
                  x: [-10, 10, -10],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-8 -left-8 w-4 h-4 bg-gradient-to-br from-warning via-primary to-danger rounded-full opacity-60"
              ></motion.div>
              <motion.div
                animate={{
                  y: [20, -20, 20],
                  x: [10, -10, 10],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-4 -right-8 w-3 h-3 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-60"
              ></motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Updates;
