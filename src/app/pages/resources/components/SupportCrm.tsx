import { motion } from "framer-motion";
import { Play } from "lucide-react";
import crm from "@/app/assets/images/crm_video.webp";
import crm1 from "@/app/assets/images/crm.webp";

const SupportCrm = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3,
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

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="py-16 lg:pb-24"
    >
      <div>
        {/* Mobile & Tablet Layout */}
        <div className="block lg:hidden space-y-8">
          {/* Title */}
          <motion.h2
            variants={itemVariants}
            className="h2-bold-40 text-grey text-center"
          >
            Streamline Customer Relations with Advanced{" "}
            <span className="text-primary">CRM Solutions</span>
          </motion.h2>

          {/* Left Image with Play Button */}
          <motion.div variants={itemVariants} className="w-full">
            <div className="relative rounded-2xl overflow-hidden w-full">
              <figure>
                <img
                  src={crm}
                  alt="CRM video preview"
                  className="w-full h-auto object-cover rounded-2xl opacity-40"
                />
              </figure>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="absolute inset-0 flex items-center justify-center z-20 cursor-pointer"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors duration-300">
                  <Play
                    className="w-6 h-6 md:w-8 md:h-8 text-emerald-600 ml-1"
                    fill="currentColor"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div variants={itemVariants} className="w-full">
            <div className="w-full rounded-2xl overflow-hidden">
              <img
                src={crm1}
                alt="CRM illustration"
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div variants={itemVariants} className="w-full">
            <motion.p
              variants={itemVariants}
              className="body-regular-16 text-grey-medium text-center md:text-left"
            >
              Fusce volutpat lectus et nisl consectetur finibus. In vitae
              scelerisque augue, in varius eros. Nunc sapien diam, euismod et
              pretium id, volutpat et tortor. In vulputate lorem quis dui
              vestibulum, vitae imperdiet diam bibendum. Maecenas scelerisque
              orci a dolor vestibulum sagittis. Etiam quis finibus arcu, vel
              efficitur diam.
            </motion.p>
          </motion.div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-12 items-start">
          {/* Left: Image & Play Button - Takes 3/5 of width */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-3 space-y-6"
          >
            <motion.h2 variants={itemVariants} className="h2-bold-40 text-grey">
              Streamline Customer Relations with Advanced{" "}
              <span className="text-primary">CRM Solutions</span>
            </motion.h2>

            <div className="relative rounded-2xl overflow-hidden w-full">
              <figure>
                <img
                  src={crm}
                  alt="CRM video preview"
                  className="w-full h-auto object-cover rounded-2xl opacity-40"
                />
              </figure>
              {/* Play Button */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="absolute inset-0 flex items-center justify-center z-20 cursor-pointer"
              >
                <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors duration-300">
                  <Play
                    className="w-8 h-8 text-emerald-600 ml-1"
                    fill="currentColor"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Info & Secondary Image - Takes 2/5 of width */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 flex flex-col h-full"
          >
            <motion.div className="w-full flex-1 rounded-2xl overflow-hidden">
              <img
                src={crm1}
                alt="CRM illustration"
                className="w-full h-full object-cover min-h-[400px]"
              />
            </motion.div>

            <div className="pt-6 flex-shrink-0">
              <motion.p
                variants={itemVariants}
                className="body-regular-16 text-grey-medium"
              >
                Fusce volutpat lectus et nisl consectetur finibus. In vitae
                scelerisque augue, in varius eros. Nunc sapien diam, euismod et
                pretium id, volutpat et tortor. In vulputate lorem quis dui
                vestibulum, vitae imperdiet diam bibendum. Maecenas scelerisque
                orci a dolor vestibulum sagittis. Etiam quis finibus arcu, vel
                efficitur diam.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default SupportCrm;
