import { Flex, Box, Text } from "@radix-ui/themes";
import { Badge, Card } from "@/app/components/ui";
import { featureCards } from "@/app/utils/utils";

const MainFeature = () => {
  return (
    <Box
      className="pt-20"
      id="feature"
    >
      <Flex
        direction={{ initial: "column", lg: "row" }}
        justify="between"
        align="center"
        className="gap-4"
      >
        {/* Typography Section */}
        <Box className="max-w-lg">
          <div className="flex lg:justify-start lg:items-start justify-center items-center">
            <Badge title="USE IT ANYWHERE, ANYTIME " />
          </div>
          <h1
            color="gray"
            className="h2-bold-40 pt-4 lg:text-start text-center"
          >
            What <span className="text-primary">Assistant</span> Helps You Do?
          </h1>
          <Text as="p" className="h4-regular-24 text-grey-medium pt-4 text-center lg:text-start">
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
