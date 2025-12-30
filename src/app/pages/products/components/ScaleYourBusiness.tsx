import { motion } from "framer-motion";
import { Circle, Check } from "lucide-react";

import { Button } from "@/app/components/ui";
import { SCALE_IMAGE_URL } from "@/app/constants/image-cloudinary";
import crm from "@/app/content/json/crm.json";

const ScaleYourBusiness = () => {
  const { empowerBusiness } = crm;
  return (
    <div className="flex flex-col md:flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 px-4 sm:px-6 lg:px-px py-6 sm:py-20 lg:py-24">
      {/* Image Section */}
      <motion.div className="relative w-full md:w-full lg:w-1/2 max-w-4xl">
        {/* Background decoration */}
        <div className="absolute -left-6 sm:-left-10 md:-left-16 bottom-0 -z-10">
          <Circle
            size={80}
            className="opacity-65 sm:w-[100px] sm:h-[100px] md:w-[150px] md:h-[150px] text-secondary"
          />
        </div>

        {/* Main image */}
        <motion.figure className="rounded-2xl overflow-hidden">
          <img
            src={SCALE_IMAGE_URL}
            alt="Online business dashboard"
            className="w-full h-auto object-cover rounded-2xl"
          />
        </motion.figure>

        {/* Overlapping image */}
        <motion.figure className="absolute -bottom-6 sm:-bottom-10 md:-bottom-14 right-4 sm:right-8 md:right-12 w-36 sm:w-48 md:w-64 lg:w-72 rounded-2xl overflow-hidden border-4 border-white shadow-xl">
          <img
            src={SCALE_IMAGE_URL}
            alt="Purchase analytics"
            className="w-full h-auto object-cover"
          />
        </motion.figure>
      </motion.div>
      {/* Text Content Section */}
      <motion.div className="w-full md:w-full lg:w-1/2 lg:max-w-xl space-y-6 md:space-y-8">
        <h2 className="h2-bold-40 text-base-black text-center md:text-center lg:text-start">
          {empowerBusiness.scale.title}
        </h2>
        <p className="lg:max-w-5xl flex justify-start items-center text-center md:text-center lg:text-start md:max-w-none">
          {empowerBusiness.scale.description}
        </p>

        {/* Features List */}
        <ul className="space-y-4 md:space-y-5">
          {empowerBusiness.scale.features.map(({ title }, index) => (
            <li key={index} className="flex items-start gap-4">
              <div className="flex-shrink-0 p-2 bg-primary-light rounded-full mt-1">
                <Check className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              </div>
              <span className="text-grey-medium text-base md:text-lg leading-relaxed">
                {title}
              </span>
            </li>
          ))}
        </ul>

        <div className="flex justify-center md:justify-center lg:justify-start">
          <Button
            label="Book a Demo"
            variant="primary"
            redirectTo="/demo"
            className="w-full sm:w-auto px-6 sm:px-8 md:px-10 h-12 sm:h-14 text-base font-medium mt-8"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default ScaleYourBusiness;
