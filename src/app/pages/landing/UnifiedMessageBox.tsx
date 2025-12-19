import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { SOCIAL_LINKS_CONFIG } from "@/app/utils/utils";
import { MessageCircle } from "lucide-react";
import { Badge } from "@/app/components/ui";

const UnifiedMessagingInbox = () => {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const [isPhoneVisible, setIsPhoneVisible] = useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsPhoneVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section>
      <div
        ref={sectionRef}
        className="relative max-w-full mx-auto bg-primary-light overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="px-4 md:px-32"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-12 gap-4 h-full">
              {Array.from({ length: 144 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="bg-gray-200 rounded"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  transition={{ delay: i * 0.01 }}
                />
              ))}
            </div>
          </div>

          <div className="relative z-10 container mx-auto px-4 py-8 lg:py-16">
            {/* Header Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center mb-8"
            >
              <Badge
                title="Unified Messaging Inbox"
                textStyle="body-italic-bold-16"
              />
            </motion.div>

            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center mb-6"
            >
              <h1 className="h2-bold-40">
                Manage all your messages into a{" "}
                <span className="bg-gradient-to-r from-primary to-primary-inactive bg-clip-text text-transparent">
                  Single Unified Inbox
                </span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center text-gray-600 text-lg lg:text-xl max-w-4xl mx-auto mb-12 leading-relaxed"
            >
              Chatblix ensures seamless connectivity, real-time synchronization,
              security and smart automation while allowing all messages to be
              managed on one single platform.
            </motion.p>

            {/* Social Icons Row */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex flex-wrap justify-center items-center gap-6 lg:gap-12 mb-16"
            >
              {SOCIAL_LINKS_CONFIG.map((social, index) => {
                const IconComponent = social.src;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.8 + index * 0.1,
                      type: "spring",
                      stiffness: 200,
                    }}
                    onMouseEnter={() => setHoveredSocial(social.name)}
                    onMouseLeave={() => setHoveredSocial(null)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div
                      className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:shadow-2xl"
                      style={{
                        backgroundColor:
                          hoveredSocial === social.name ? "" : "#ffffff",
                      }}
                    >
                      <img src={IconComponent} alt={`image/${social.name}`} />
                    </div>

                    {/* Social Name Tooltip */}
                    <AnimatePresence>
                      {hoveredSocial === social.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap"
                        >
                          {social.name}
                          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.a>
                );
              })}
            </motion.div>

            {/* Phone Mockup Section */}
            <div className="relative flex justify-center items-center">
              {/* Notification Badges */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{
                  opacity: isPhoneVisible ? 1 : 0,
                  x: isPhoneVisible ? 0 : -50,
                }}
                transition={{ duration: 0.8, delay: 1.5 }}
                className="absolute top-0 left-4 lg:left-1/4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg z-20"
              >
                1023
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{
                  opacity: isPhoneVisible ? 1 : 0,
                  x: isPhoneVisible ? 0 : 50,
                }}
                transition={{ duration: 0.8, delay: 1.7 }}
                className="absolute top-8 right-4 lg:right-1/4 bg-secondary text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg z-20"
              >
                25
              </motion.div>

              {/* Phone Container */}
              <motion.div
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                animate={{
                  opacity: isPhoneVisible ? 1 : 0,
                  y: isPhoneVisible ? 0 : 50,
                  rotateY: 0,
                }}
                transition={{
                  duration: 1,
                  delay: 1.2,
                  type: "spring",
                  stiffness: 100,
                }}
                className="relative"
              >
                {/* Phone Frame */}
                <div className="w-64 h-[500px] lg:w-80 lg:h-[600px] bg-gradient-to-br from-teal-400 to-emerald-500 rounded-[3rem] p-2 shadow-2xl">
                  <div className="w-full h-full bg-black rounded-[2.5rem] flex items-center justify-center relative overflow-hidden">
                    {/* Screen Content */}
                    <div className="w-full h-full bg-gradient-to-br from-teal-500 to-emerald-600 rounded-[2.5rem] flex flex-col items-center justify-center text-white relative">
                      {/* App Logo */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: isPhoneVisible ? 1 : 0 }}
                        transition={{ duration: 0.8, delay: 2 }}
                        className="mb-4"
                      >
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center">
                          <MessageCircle size={32} className="text-teal-500" />
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isPhoneVisible ? 1 : 0 }}
                        transition={{ duration: 0.8, delay: 2.2 }}
                        className="text-center"
                      >
                        <h3 className="text-xl font-bold mb-2">Chatblix</h3>
                        <p className="text-teal-100 text-sm">
                          Unified Messaging
                        </p>
                      </motion.div>

                      {/* Floating Elements */}
                      <motion.div
                        animate={{
                          y: [0, -10, 0],
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: 2.5,
                        }}
                        className="absolute top-20 left-8 w-8 h-8 bg-white/20 rounded-full"
                      />

                      <motion.div
                        animate={{
                          y: [0, 10, 0],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          delay: 3,
                        }}
                        className="absolute bottom-32 right-12 w-6 h-6 bg-white/15 rounded-full"
                      />
                    </div>

                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl"></div>
                  </div>
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-emerald-500/20 rounded-[3rem] blur-xl scale-110 -z-10"></div>
              </motion.div>

              {/* Orange Geometric Background */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.8, scale: 1 }}
                transition={{ duration: 1.2, delay: 1 }}
                className="absolute inset-0 -z-10"
              >
                <div className="relative w-full h-full">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 lg:w-[500px] lg:h-[500px]">
                    <div className="w-full h-full bg-gradient-to-br from-secondary to-secondary-dark opacity-80 rounded-full blur-3xl"></div>
                  </div>

                  {/* Geometric Shapes */}
                  <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-success opacity-60 rotate-45 rounded-lg"></div>
                  <div className="absolute bottom-1/3 left-1/4 w-12 h-12 bg-information-dark opacity-50 rotate-12 rounded-lg"></div>
                  <div className="absolute top-1/3 left-1/3 w-8 h-8 bg-warning opacity-70 rounded-full"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UnifiedMessagingInbox;
