import { motion } from "framer-motion";
import { RegisterForm } from "@/app/pages/resources/components";
import support from "@/app/assets/images/support.webp";
import { Breadcrumb, SmartCard } from "@/app/components/ui";
import { APP_ROUTES } from "@/app/constants/routes";
import { smartCards } from "@/app/utils/resource/utils";
import { FAQ, Pricing, SeemlessExperience } from "@/app/pages/landing/";

const Support = () => {
  const SupportCrumb = [
    { label: "Resources", href: APP_ROUTES.PUBLIC.RESOURCES_OVERVIEW },
    { label: "Support" },
  ];
  return (
    <div className="pt-20 px-2 sm:px-4 lg:px-px">
      {/* Breadcrumb Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-4 sm:mb-6 md:mb-8"
      >
        <Breadcrumb items={SupportCrumb} />
      </motion.div>

      {/* Form Section */}
      <motion.div
        className="grid gap-[60px] lg:grid-cols-2 items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Image Section */}
        <motion.figure
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={support}
            alt="Support"
            className="w-full h-auto rounded-xl"
          />
        </motion.figure>

        {/* Form Section */}
        <motion.div className="w-full">
          <div className="space-y-2 pb-6">
            <motion.h1 className="h3-bold-32 text-grey">Get in touch</motion.h1>
            <motion.p className="h5-regular-16 text-grey-medium">
              Reach out to our team with all your queries and get answers
              immediately.
            </motion.p>
          </div>
          <RegisterForm />
        </motion.div>
      </motion.div>

      {/* How can I help you today? */}
      <motion.div className="pt-6 md:pt-20">
        <h3 className="h3-bold-32 text-grey text-start">
          How can we help you today?
        </h3>
        {/* Card Section */}
        <motion.div className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center pt-6">
          {smartCards.map((card, index) => (
            <SmartCard key={index} {...card} />
          ))}
        </motion.div>
      </motion.div>

      {/* Seemless Experience */}
      <div className="pt-20">
        <SeemlessExperience />
      </div>

      {/* Pricing Section */}
      <Pricing />

      {/* FAQ's Section  */}
      <FAQ />
    </div>
  );
};

export default Support;
