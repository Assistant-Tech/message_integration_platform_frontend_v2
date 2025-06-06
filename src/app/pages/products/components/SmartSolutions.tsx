import { SmartCard } from "@/app/components/ui";
import { smartCardData } from "@/app/utils/product/utils";
import { Flex } from "@radix-ui/themes";
import { motion} from "framer-motion"

const SmartSolutions = () => {
  return (
    <Flex direction={"column"} justify={"center"} className="py-8 md:py-24">
      {/* Typo Section */}
      <motion.article>
        <motion.h1 className="h2-bold-40 text-base-black text-center pb-4">
          Smart Solutions for Businesses of All Sizes
        </motion.h1>
        <motion.p className="body-regular-16 text-grey text-center pb-6">
          Our AI-enabled CRM software focuses on providing smart solutions like
          sales, marketing and customer support, for businesses of all sizes and
          supports a sustainable business model.
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
