import { Flex, Box, Text } from "@radix-ui/themes";
import { Card } from "@/app/components/ui";
import { featureCards } from "@/app/utils/utils";

const MainFeature = () => {
  return (
    <Box className="min-h-auto w-full max-w-[1600px] mx-auto px-4 md:px-2 py-16">
      <Flex
        direction={{ initial: "column", lg: "row" }}
        justify="between"
        align="center"
        className="max-w-[1600px] mx-auto gap-16"
      >
        {/* Typography Section */}
        <Box className="max-w-lg">
          <Text
            size="2"
            className="h5-italic-bold-16 text-secondary bg-secondary-light py-3 rounded-4xl capitalize"
          >
            USE IT ANYWHERE, ANYTIME
          </Text>
          <h1 color="gray" className="h2-bold-40 pt-4">
            What <span className="text-primary">Assistant</span> Helps You Do?
          </h1>
          <Text className="h4-regular-24 text-start text-grey-medium">
            Simple tools to manage customer messages, work with your team, and
            grow your business.
          </Text>
        </Box>

        {/* Responsive Card Grid Section */}
        <Flex
          direction="row"
          justify={{ initial: "center", md: "center" }}
          wrap="wrap"
          gap="4"
          className="max-w-full"
        >
          {featureCards.slice(0, 4).map((card, index) => (
            <Box
              key={index}
              className="min-h-36 max-w-[90vw] w-full sm:w-[90%] md:w-[48%]"
            >
              <Card
                title={card.title}
                description={card.description}
                iconColor={card.iconColor}
                icon={<card.icon size={32} color={card.iconColor} />}
                animated={card.animate}
                borderRadius="2xl"
                elevation="lg"
              />
            </Box>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default MainFeature;
