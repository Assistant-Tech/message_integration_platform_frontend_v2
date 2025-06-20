import { motion } from "framer-motion";
import { Circle, Check } from "lucide-react";

// Images
import business from "@/app/assets/images/CRM1.webp";
import purchase from "@/app/assets/images/CRM2.webp";
import { Button } from "@/app/components/ui";

const ScaleYourBusiness = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 px-4 sm:px-6 lg:px-px py-16 sm:py-20 lg:py-24">
      {/* Image Section */}
      <motion.div className="relative w-full lg:w-1/2 max-w-4xl">
        {/* Background decoration */}
        <div className="absolute -left-6 sm:-left-10 md:-left-16 bottom-0 -z-10">
          <Circle
            size={80}
            className="opacity-65 sm:w-[100px] sm:h-[100px] md:w-[150px] md:h-[150px] text-orange-400"
          />
        </div>

        {/* Main image */}
        <motion.figure className="rounded-2xl overflow-hidden">
          <img
            src={business}
            alt="Online business dashboard"
            className="w-full h-auto object-cover rounded-2xl"
          />
        </motion.figure>

        {/* Overlapping image */}
        <motion.figure className="absolute -bottom-6 sm:-bottom-10 md:-bottom-14 right-4 sm:right-8 md:right-12 w-36 sm:w-48 md:w-64 lg:w-72 rounded-2xl overflow-hidden border-4 border-white shadow-xl">
          <img
            src={purchase}
            alt="Purchase analytics"
            className="w-full h-auto object-cover"
          />
        </motion.figure>
      </motion.div>
      {/* Text Content Section */}
      <motion.div className="w-full lg:w-1/2 lg:max-w-xl space-y-6 md:space-y-8">
        <h2 className="h2-bold-40 text-base-black">Scale Your Business</h2>
        <p className="lg:max-w-5xl flex justify-start items-center">
          Whether you're a startup or an enterprise, our AI-enabled CRM helps
          take your business to the next level with intelligent automation and
          insights.
        </p>

        {/* Features List */}
        <ul className="space-y-4 md:space-y-5">
          {[
            "Online store owners who want to reply fast on social media",
            "Small businesses that want to support customers better",
            "Big enterprises looking for efficiency, control and long-term value",
          ].map((text, idx) => (
            <li key={idx} className="flex items-start gap-4">
              <div className="flex-shrink-0 p-2 bg-primary-light rounded-full mt-1">
                <Check className="w-4 h-4 md:w-5 md:h-5 text-teal-600" />
              </div>
              <span className="text-grey-medium text-base md:text-lg leading-relaxed">
                {text}
              </span>
            </li>
          ))}
        </ul>

        <Button
          label="Book a Demo"
          variant="primary"
          redirectTo="/demo"
          className="w-full sm:w-auto px-6 sm:px-8 md:px-10 h-12 sm:h-14 text-base font-medium mt-8"
        />
      </motion.div>
    </div>
  );
};

export default ScaleYourBusiness;
