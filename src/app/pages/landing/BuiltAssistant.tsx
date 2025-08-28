import { Badge, Button, FeatureCard } from "@/app/components/ui";
import { buildFeature } from "@/app/utils/utils";
import { Box, Flex } from "@radix-ui/themes";
import React from "react";

const BuiltAssistant: React.FC = () => {
  const handleStartTrial = () => {
    console.log("Starting 14-day free trial...");
  };

  return (
    <Box className="pt-20">
      <div className="py-8 md:py-8 bg-base-white rounded-2xl border-2 border-grey-light max-w-full">
        <Flex
          direction="column"
          align="center"
          justify="center"
          className="text-center"
          gap="12"
        >
          {/* Header Section */}
          <Box className="max-w-4xl">
            <Badge
              title="Why We Built Assistant"
              textStyle="body-italic-bold-16"
            />
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
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 w-full px-4 sm:px-14 py-6 ">
            {buildFeature.map((feature, index) => (
              <FeatureCard
                key={index}
                img={feature.img}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>

          {/* CTA Button */}
          <Box>
            <Button
              onClick={handleStartTrial}
              label="Start 14-days Free Trial"
              className="px-4 py-3"
            />
          </Box>
        </Flex>
      </div>
    </Box>
  );
};

export default BuiltAssistant;
