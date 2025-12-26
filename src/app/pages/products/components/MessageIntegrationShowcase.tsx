import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useAnimation,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  MessageCircle,
  Facebook,
  Phone,
  Instagram,
  ArrowRight,
  CheckCircle,
  MonitorCheck,
} from "lucide-react";
import { Button } from "@/app/components/ui";
import logo from "@/app/assets/logo.svg";

const MessageIntegrationShowcase: React.FC = () => {
  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeDemo, setActiveDemo] = useState(0);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDemo((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const messagePlatforms = [
    {
      icon: MessageCircle,
      name: "WhatsApp",
      color: "bg-primary",
      message: "Customer inquiry about pricing",
    },
    {
      icon: Facebook,
      name: "Email",
      color: "bg-blue-500",
      message: "Support ticket #12345",
    },
    {
      icon: Phone,
      name: "SMS",
      color: "bg-purple-500",
      message: "Order confirmation needed",
    },
    {
      icon: Instagram,
      name: "Instagram",
      color: "bg-pink-500",
      message: "Team collaboration update",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <section className="relative overflow-hidden py-24 px-6 md:px-12 lg:px-2 bg-base-white rounded-lg">
      <div ref={ref}>
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="h3-bold-32 font-bold text-grey mb-6"
          >
            All Your Messages,{" "}
            <span className="text-primary">One Platform</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="h5-regular-16 text-grey-medium max-w-3xl mx-auto"
          >
            Watch how Unified Message seamlessly integrates all your
            communication channels into a single, powerful dashboard that your
            team can manage effortlessly.
          </motion.p>
        </motion.div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Circle Animation */}
          <motion.div
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="relative h-96 w-full flex items-center justify-center"
          >
            {/* Circular border ring */}
            <div className="absolute top-0 w-[350px] h-[350px] rounded-full border-2 border-dashed border-primary-inactive" />

            {/* Central Hub with Logo */}
            <motion.div
              variants={itemVariants}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
              }}
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-24 flex items-center justify-center"
            >
              <img src={logo} alt="chatblix.svg" className="w-20" />
            </motion.div>

            {/* Icons + Tooltip in Circular Layout */}
            <div className="absolute top-36 left-92">
              {messagePlatforms.map((platform, index) => {
                const total = messagePlatforms.length;
                const angle = (index * 360) / total;
                const radius = 172;
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;

                return (
                  <motion.div
                    key={platform.name}
                    className="absolute"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: "translate(-50%, -50%)",
                      zIndex: activeDemo === index ? 30 : 10,
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      scale: activeDemo === index ? 1.1 : 0.95,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Icon Bubble */}
                    <div
                      className={`w-14 h-14 rounded-full ${platform.color} flex items-center justify-center shadow-lg ring-2 ring-white/30 relative`}
                    >
                      <platform.icon className="w-7 h-7 text-white" />
                      {activeDemo === index && (
                        <motion.div
                          className="absolute -inset-1 rounded-full bg-white/20 blur-md"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.4, 0.1, 0.4],
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 2,
                            ease: "easeInOut",
                          }}
                        />
                      )}
                    </div>

                    {/* Tooltip (Always on top center) */}
                    <AnimatePresence>
                      {activeDemo === index && (
                        <motion.div
                          key={platform.name}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 10,
                          }}
                          className="absolute -top-24 left-1/2 transform -translate-x-1/2 z-40"
                        >
                          <div className="relative bg-white p-4 rounded-lg shadow-lg border border-slate-200 w-44 text-sm text-left">
                            <div className="font-semibold text-slate-800 mb-1">
                              {platform.name}
                            </div>
                            <div className="text-slate-600">
                              {platform.message}
                            </div>
                            <div className="absolute left-1/2 top-full transform -translate-x-1/2 w-3 h-3 bg-white border-l border-b border-slate-200 rotate-45 -mt-1" />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Features */}
          <motion.div
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <h3 className="h5-bold-16 text-grey mb-2">
                Streamline Your Communication Workflow
              </h3>
              <p className="text-grey-medium h5-regular-16">
                No more switching between apps or missing important messages.
                Our unified dashboard brings everything together in one place.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              {[
                "Real-time message synchronization across all platforms",
                "Smart prioritization and routing of urgent messages",
                "Team collaboration tools with shared inbox management",
                "Advanced analytics and response time tracking",
                "Automated responses and AI-powered suggestions",
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-grey-medium body-regular-16">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-4">
              <Button
                label="Book a Demo"
                variant="primary"
                IconRight={<MonitorCheck className="w-4 h-4" />}
              />
              <Button
                label="Learn More"
                variant="outlined"
                IconRight={<ArrowRight className="w-4 h-4" />}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MessageIntegrationShowcase;
