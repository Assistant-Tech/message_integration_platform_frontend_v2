import { Flex, Box, Text } from "@radix-ui/themes";
import { Badge, Card } from "@/app/components/ui";
import { featureCards } from "@/app/utils/utils";

const MainFeature = () => {
  return (
    <Box className="min-h-auto w-full max-w-[1600px] mx-auto px-4 md:px-2 py-10">
      <Flex
        direction={{ initial: "column", lg: "row" }}
        justify="between"
        align="center"
        className="max-w-[1600px] mx-auto gap-16"
      >
        {/* Typography Section */}
        <Box className="max-w-lg">
          <Badge title="USE IT ANYWHERE, ANYTIME " />
          <h1 color="gray" className="h2-bold-40 pt-4">
            What <span className="text-primary">Assistant</span> Helps You Do?
          </h1>
          <Text className="h4-regular-24 text-start text-grey-medium pt-4">
            Simple tools to manage customer messages, work with your team, and
            grow your business.
          </Text>
        </Box>

        {/* Responsive Card Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {featureCards.slice(0, 4).map((card, index) => (
            <div key={index} className="w-full">
              <Card
                title={card.title}
                description={card.description}
                iconColor={card.iconColor}
                icon={<card.icon size={32} color={card.iconColor} />}
                animated={card.animate}
                borderRadius="2xl"
                elevation="lg"
              />
            </div>
          ))}
        </div>
      </Flex>
    </Box>
  );
};

export default MainFeature;
