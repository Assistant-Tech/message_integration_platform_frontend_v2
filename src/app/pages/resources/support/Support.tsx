import { motion } from "framer-motion";
import { Flex } from "@radix-ui/themes";
import { Headset, Mail, MapPin, MapPinHouse, PhoneCall } from "lucide-react";

import { RegisterForm } from "@/app/pages/resources/components";
import { Breadcrumb, SmartCard } from "@/app/components/ui";
import { APP_ROUTES } from "@/app/constants/routes";
import { smartCards } from "@/app/utils/resource/utils";
import { GetStarted } from "@/app/pages/landing/";
import support from "@/app/assets/images/support.webp";
import { FrequentlyAskedQuestion, NewsLetter } from "@/app/components/common";

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
      <motion.div className="pt-6 md:py-20">
        <h3 className="h3-bold-32 text-grey text-start">
          How can we help you today?
        </h3>
        {/* Card Section */}
        <motion.div className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center py-6">
          {smartCards.map((card, index) => (
            <SmartCard key={index} {...card} />
          ))}
        </motion.div>
      </motion.div>

      {/* GET STARTED */}
      <div className="relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] w-screen">
        <GetStarted />
      </div>

      {/* Contact Us */}
      <motion.div className="pt-20">
        <h1 className="h3-bold-32 text-grey text-start mb-8">Contact Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <Flex
            direction="column"
            align="start"
            className="bg-base-white hover:bg-grey-light p-6 rounded-lg"
          >
            <figure className="p-2 bg-primary-light rounded-lg">
              <Headset size="36" color="teal" />
            </figure>
            <h5 className="h5-bold-16 text-base-black text-start pt-3">
              Customer Service
            </h5>
            <div className="flex justify-between items-center pt-2 w-full flex-wrap gap-y-2">
              <div className="flex text-grey-medium gap-2">
                <Mail size="24" />
                <h5 className="h5-regular-underline-16">assistant@gmail.com</h5>
              </div>
              <div className="flex text-grey-medium gap-2">
                <PhoneCall size="20" />
                <h5 className="h5-regular-underline-16">+977-9810000000</h5>
              </div>
            </div>
          </Flex>

          {/* Card 2 */}
          <Flex
            direction="column"
            align="start"
            className="bg-base-white hover:bg-grey-light p-6 rounded-lg"
          >
            <figure className="p-2 bg-primary-light rounded-lg">
              <MapPin size="36" color="teal" />
            </figure>
            <h5 className="h5-bold-16 text-base-black text-start pt-3">
              Visit Us
            </h5>
            <div className="flex justify-between items-center pt-2 w-full flex-wrap gap-y-2">
              <div className="flex text-grey-medium gap-2">
                <MapPinHouse size="24" />
                <h5 className="h5-regular-underline-16">
                  123 Main Street, Anytown
                </h5>
              </div>
            </div>
          </Flex>
        </div>
      </motion.div>

      {/* FAQ's Section  */}
      <FrequentlyAskedQuestion />
      {/* Newsletter */}
      <div className="pb-12">
        <NewsLetter />
      </div>
    </div>
  );
};

export default Support;
