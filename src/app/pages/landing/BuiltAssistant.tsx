import React from "react";
import { Badge, Button, FeatureCard } from "@/app/components/ui";
import { buildFeature } from "@/app/utils/utils";

const BuiltAssistant: React.FC = () => {
  const handleStartTrial = () => {
    // Add your CTA logic here (e.g., scroll to signup or navigate)
  };

  return (
    <section className="pt-20 w-full flex justify-center">
      <div className="w-full max-w-[1600px] py-8 md:py-8 bg-base-white rounded-2xl border-2 border-grey-light flex flex-col items-center text-center px-4 sm:px-8">
        {/* Header Section */}
        <div className="max-w-4xl mb-8">
          <Badge
            title="Why We Built Assistant"
            textStyle="body-italic-bold-16"
          />
          <h1 className="h2-bold-40 py-4 text-grey">
            Simplify life for daily{" "}
            <span className="text-primary">customer communicators.</span>
          </h1>
          <p className="h4-regular-24 text-grey-medium max-w-3xl mx-auto">
            Running a business is hard enough. Answering messages from 5
            different apps shouldn't make it harder.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 w-full max-w-[1600px] py-2">
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
        <div className="pt-6">
          <Button
            onClick={handleStartTrial}
            label="Start 14-days Free Trial"
            className="px-4 py-3"
          />
        </div>
      </div>
    </section>
  );
};

export default BuiltAssistant;
