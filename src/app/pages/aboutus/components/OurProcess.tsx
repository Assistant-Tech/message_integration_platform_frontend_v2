import { motion } from "framer-motion";
import { Badge } from "@/app/components/ui";
import { LucideIcon } from "lucide-react";

type ProcessStep = {
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
};

type OurProcessProps = {
  sectionTitle?: string;
  sectionSubtitle?: string;
  badgeTitle: string;
  steps: ProcessStep[];
};

const ProcessStepCard: React.FC<ProcessStep & { index: number }> = ({
  step,
  title,
  description,
  index,
  icon: Icon,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      whileHover={{ y: -8 }}
      className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center w-full max-w-md mx-auto z-10"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          delay: index * 0.2 + 0.3,
          type: "spring",
          stiffness: 200,
        }}
        className="absolute -top-4 left-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
      >
        <motion.div className="animate-pulse px-2 py-2 rounded-full bg-primary-inactive">
          <div className="px-4 py-2 text-white rounded-full bg-primary">
            {step}
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ rotate: -180, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ delay: index * 0.2 + 0.4, duration: 0.5 }}
        className="mb-6 pt-4 flex items-center justify-center"
      >
        <div className="w-16 h-16 text-primary mx-auto">
          <Icon className="w-12 h-12" />
        </div>
      </motion.div>

      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.2 + 0.5 }}
        className="h5-bold-16 text-grey mb-4"
      >
        {title}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.2 + 0.6 }}
        className="body-regular-16 text-grey-medium"
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

const OurProcess: React.FC<OurProcessProps> = ({ sectionSubtitle, steps }) => {
  return (
    <div className="relative bg-base-white py-16 overflow-hidden">
      {/* Decorative SVG line */}
      <svg
        className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-64 z-0 hidden lg:block pointer-events-none"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
      >
        <path
          d="M 0 150 C 300 50, 900 250, 1200 150"
          fill="none"
          stroke="#2E5E99"
          strokeWidth="2"
          strokeDasharray="5,10"
          strokeLinecap="round"
        />
      </svg>

      <div className="relative z-10 max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block mb-4"
          >
            <Badge title="OUR PROCESS" textStyle="body-italic-bold-16" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="h3-bold-32 text-base-black"
          >
            How Chatblix Works
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="body-regular-16 text-grey-medium max-w-2xl mx-auto mt-4"
          >
            {sectionSubtitle}
          </motion.p>
        </motion.div>

        <div className="flex flex-col items-center gap-10 lg:grid lg:grid-cols-3 lg:gap-4 cursor-pointer">
          {steps.map((step, index) => (
            <ProcessStepCard
              key={index}
              index={index}
              step={step.step}
              title={step.title}
              description={step.description}
              icon={step.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurProcess;
