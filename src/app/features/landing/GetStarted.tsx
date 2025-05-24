import { Box, Flex, Text } from "@radix-ui/themes";
import { Button } from "@/app/components/ui";
import computerMockup from "@/app/assets/images/getstarted.png";

const GetStarted = () => {
  return (
    <Box className="relative w-full h-auto md:h-80 overflow-hidden bg-primary-dark flex items-center justify-center">
      {/* Abstract shapes in the background */}
      <Box className="absolute top-0 left-0 w-64 h-64 bg-custom-light-blue rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></Box>
      <Box className="absolute bottom-0 right-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></Box>
      <Box className="absolute top-1/4 right-1/4 w-52 h-52 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></Box>

      {/* Content Container */}
      <Flex
        direction={{ initial: "column", md: "row" }}
        align="start"
        justify="between"
        className="relative z-10 w-full max-w-[1600px] mx-auto gap-28 px-4 md:px-16 pt-16"
      >
        {/* Left Section: Text and Button */}
        <Flex
          direction="column"
          align={{ initial: "center", md: "start" }}
          justify="center"
          gap="2"
          className="text-start md:text-left md:max-w-2xl p-4"
        >
          <Text className="h4-bold-24 md:h2-bold-40 text-base-white">
            Get Started with Assistant today.
          </Text>
          <Text as="p" className="h4-regular-24 text-base-white">
            Try Assistant free for 14 days and discover how it can transform
            your workflow!
          </Text>
          <Button
            label="Start 14-days Free Trial"
            variant="secondary"
            className="cursor-pointer"
          />
        </Flex>

        {/* Right Section: Computer Mockup */}
        <Box className="md:max-w-xl flex justify-center -mb-12 md:mb-2 border-8 border-base-white rounded-3xl transform -rotate-5">
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
