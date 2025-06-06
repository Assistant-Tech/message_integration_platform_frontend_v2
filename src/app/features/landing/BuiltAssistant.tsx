import { Badge, Button, FeatureCard } from "@/app/components/ui";
import { buildFeature } from "@/app/utils/utils";
import { Box, Container, Flex, Grid } from "@radix-ui/themes";
import React from "react";

const BuiltAssistant: React.FC = () => {
  const handleStartTrial = () => {
    console.log("Starting 14-day free trial...");
  };

  return (
    <Box className="pt-20">
      <Container className="py-4 md:py-8 bg-white rounded-[2rem] border-2 border-gray-300">
        <Flex
          direction="column"
          align="center"
          justify={"center"}
          className="text-center"
        >
          {/* Header Section */}
          <Box className="max-w-4xl">
            <Badge title="Why We Built Assistant" />

            <h1 className="h2-bold-40 py-4">
              Simplify life for daily
              <span className="text-primary"> customer communicators</span>.
            </h1>

            <p className="h4-regular-24 text-grey-medium max-w-3xl mx-auto text-center">
              Running a business is hard enough. Answering messages from 5
              different apps shouldn't make it harder.
            </p>
          </Box>

          {/* Features Grid */}
          <Grid
            columns={{ initial: "1", sm: "2", md: "3" }}
            gap="6"
            className="w-full py-6"
          >
            {buildFeature.map((feature, index) => (
              <FeatureCard
                key={index}
                img={feature.img}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </Grid>

          {/* CTA Button */}
          <Box>
            <Button
              onClick={handleStartTrial}
              label="Start 14-days Free Trial"
              className="px-4 py-3"
            />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default BuiltAssistant;
