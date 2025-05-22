import { Flex, Box, Text } from "@radix-ui/themes";
import { Card } from "@/app/components/ui";
import { featureCards } from "@/app/utils/utils";

const MainFeature = () => {
  return (
    <Box className="min-h-screen w-full bg-base-white pt-20 mt-20 px-4 sm:px-6 lg:px-8">
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
            className="h5-italic-bold-16 text-secondary bg-secondary-light px-4 py-3 rounded-4xl capitalize"
          >
            USE IT ANYWHERE, ANYTIME
          </Text>
          <h1 color="gray" className="h2-bold-40 pt-4">
            What <span className="text-primary">Assistant</span> Helps You Do?
          </h1>
          <Text className="h4-regular-24 text-start">
            Simple tools to manage customer messages, work with your team, and
            grow your business.
          </Text>
        </Box>

        {/* Responsive Card Grid Section */}
        <Flex
          direction="row"
          wrap="wrap"
          gap="4"
          className="grid-cols-1 md:grid-cols-2 max-w-4xl"
        >
          {featureCards.slice(0, 4).map((card, index) => (
            <Box key={index} className="min-h-36 w-full md:w-[48%]">
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
