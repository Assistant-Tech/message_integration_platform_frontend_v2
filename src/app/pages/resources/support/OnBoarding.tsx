import { motion } from "framer-motion";

import { Breadcrumb } from "@/app/components/ui";
import { APP_ROUTES } from "@/app/constants/routes";
import { NewsLetter } from "@/app/components/common";

const OnBoarding = () => {
  const SupportCrumb = [
    { label: "Resources", href: APP_ROUTES.PUBLIC.RESOURCES_OVERVIEW },
    { label: "Support", href: APP_ROUTES.PUBLIC.SUPPORT },
    { label: "Onboarding " },
  ];
  return (
    <div className="min-h-screen text-base-black pt-24">
      {/* Breadcrumb Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-4 sm:mb-6 md:mb-8"
      >
        <Breadcrumb items={SupportCrumb} />
      </motion.div>
      OnBoarding
      <NewsLetter />
    </div>
  );
};

export default OnBoarding;
