import { useEffect, useState } from "react";
import { Flex, Box, Text } from "@radix-ui/themes";
import { Button } from "@/app/components/ui";
import { X } from "lucide-react";

const LOCAL_STORAGE_KEY = "trial_banner_dismissed";

interface TrialBannerProps {
  onClose: () => void;
}

const TrialBanner = ({ onClose }: TrialBannerProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, "true");
    setIsVisible(false);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <Flex
      direction="row"
      align="center"
      justify="center"
      className="fixed top-0 left-0 right-0 z-60 bg-primary text-white px-3 py-3"
    >
      <Box className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <Text className="text-5xl absolute bottom-0 right-1/4 translate-x-1/2 translate-y-1/2 transform -rotate-12">
          ✨
        </Text>
      </Box>

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
          className="flex-shrink-0 h5-bold-16"
        >
          🚀 Start your free trial today and enjoy 20% off the starter plan!
        </Text>
        <Text size={{ initial: "2", sm: "3" }} className="flex-shrink-0 h5-semi-bold-16">
          Don't miss out on this limited time offer.
        </Text>
        <Button label="Learn More" variant="outlined" />
      </Flex>

      <button
        className="text-white hover:text-base-black hover:bg-white cursor-pointer ml-4 p-2 rounded-full z-10"
        onClick={handleClose}
        aria-label="Close banner"
      >
        <X size={24} />
      </button>
    </Flex>
  );
};

export default TrialBanner;
