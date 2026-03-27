import React, { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { ArrowRight, CheckCircle, MonitorCheck } from "lucide-react";
import { Button } from "@/app/components/ui";

const MessageIntegrationShowcase: React.FC = () => {
  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

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
    <section className="w-full relative overflow-hidden py-24 px-6 md:px-2 lg:px-2 bg-white rounded-lg">
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
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          {/* Left Circle Animation */}
          <motion.div
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="relative h-96 w-full flex items-center justify-center"
          >
            <img
              src={
                "https://res.cloudinary.com/dtoqwn0gx/image/upload/v1767512686/for-whom-message_iur6iu.png"
              }
              alt="chatblix.svg"
              className="w-xl pt-6"
            />
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
