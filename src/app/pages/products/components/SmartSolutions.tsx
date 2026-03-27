import { SmartCard } from "@/app/components/ui";
import { smartCardData } from "@/app/utils/product/product.config";
import { Flex } from "@radix-ui/themes";
import { motion } from "framer-motion";
import crm from "@/app/content/json/crm.json";

const SmartSolutions = () => {
  const { empowerBusiness } = crm;
  return (
    <Flex direction={"column"} justify={"center"} className="py-8 md:py-24">
      {/* Typo Section */}
      <motion.article>
        <motion.h1 className="h2-bold-40 text-base-black text-center pb-4">
          {empowerBusiness.smart.title}
        </motion.h1>
        <motion.p className="body-regular-16 text-grey text-center pb-6">
          {empowerBusiness.smart.description}
        </motion.p>
      </motion.article>
      {/* Grided Cards Section */}
      <motion.div className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center pt-6">
        {smartCardData.map((card, index) => (
          <SmartCard key={index} {...card} />
        ))}
      </motion.div>
    </Flex>
  );
};

export default SmartSolutions;
