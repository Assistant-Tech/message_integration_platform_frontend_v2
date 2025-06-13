import { Box, Flex, Text } from "@radix-ui/themes";
import { Button } from "@/app/components/ui";
import { motion } from "framer-motion";
import computerMockup from "@/app/assets/images/getstarted.png";
import logo from "@/app/assets/logo.svg";
import { Circle } from "lucide-react";

const GetStarted = () => {
  return (
    <Box className="relative w-full h-auto md:h-96 overflow-hidden bg-primary-dark flex items-center justify-center">
      {/* Abstract background shapes */}
      <div className="absolute bottom-0 -left-70">
        <motion.img
          src={logo}
          alt="Logo SVG"
          className="w-96 h-96 opacity-40"
          initial={{ rotate: 180, scale: 1 }}
          animate={{
            rotate: [90, 190, 170, 180],
            scale: [1, 1.05, 0.95, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div className="absolute -top-10 -right-10">
        <Circle className="w-40 h-40 opacity-20" color="white" />
      </motion.div>

      <Box className="absolute top-0 left-0 w-64 h-64 bg-custom-light-blue rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
      <Box className="absolute bottom-0 right-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      <Box className="absolute top-1/4 right-1/4 w-52 h-52 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />

      {/* Main Content */}
      <Flex
        direction={{ initial: "column", md: "row" }}
        align="center"
        justify="between"
        className="relative z-10 w-full max-w-[1600px] mx-auto px-4 md:px-px gap-16 py-10"
      >
        {/* Left Section: Text + Button */}
        <Flex
          direction="column"
          align={{ initial: "center", md: "start" }}
          justify="center"
          gap="4"
          className="text-center md:text-left md:max-w-2xl"
        >
          <Text className="h4-bold-24 md:h2-bold-40 text-base-white">
            Get Started with Assistant today.
          </Text>
          <Text as="p" className="h4-regular-24 text-base-white">
            Try Assistant free for 14 days and discover how it can transform
            your workflow!
          </Text>
          <div className="pt-2">
            <Button
              label="Start 14-days Free Trial"
              variant="secondary"
              className="cursor-pointer"
            />
          </div>
        </Flex>

        {/* Right Section: Image Mockup */}
        <Box className="md:max-w-xl flex justify-center -mb-12 md:mb-0 border-8 border-base-white rounded-3xl transform -rotate-3 shadow-xl">
          <img
            src={computerMockup}
            alt="Assistant Dashboard Mockup"
            className="w-full h-auto max-w-xl object-contain animate-float rounded-2xl"
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default GetStarted;
