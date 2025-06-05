import { useState } from "react";
import { Flex, Box, Text, Button } from "@radix-ui/themes";

const TrialBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null; // Don't render if not visible
  }

  return (
    <Flex
      direction="row"
      align="center"
      justify="center"
      className="bg-teal-500 text-white p-3 md:p-4 rounded-md shadow-lg mb-8 relative overflow-hidden"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* Background pattern/emoji for visual interest */}
      <Box className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <Text className="text-6xl absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 transform rotate-12">
          🚀
        </Text>
        <Text className="text-5xl absolute bottom-0 right-1/4 translate-x-1/2 translate-y-1/2 transform -rotate-12">
          ✨
        </Text>
      </Box>

      {/* Main content */}
      <Flex
        direction={{ initial: "column", sm: "row" }}
        align="center"
        justify="center"
        gap="3"
        className="text-center sm:text-left z-10 flex-grow"
      >
        <Text
          size={{ initial: "2", sm: "3" }}
          weight="bold"
          className="flex-shrink-0"
        >
          🚀 Start your free trial today and enjoy 20% off the starter plan!
        </Text>
        <Text size={{ initial: "2", sm: "3" }} className="flex-shrink-0">
          Don't miss out on this limited time offer.
        </Text>
        <Button
          variant="soft"
          color="teal"
          className="bg-white text-teal-600 hover:bg-teal-100 cursor-pointer px-4 py-2 rounded-full transition-colors duration-200 shadow-md"
        >
          Learn More
        </Button>
      </Flex>

      {/* Close button */}
      <Button
        variant="ghost"
        color="teal"
        className="text-white hover:bg-teal-600 cursor-pointer ml-4 p-2 rounded-full z-10"
        onClick={() => setIsVisible(false)}
        aria-label="Close banner"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </Button>
    </Flex>
  );
};

export default TrialBanner;
