import { Badge, Card } from "@/app/components/ui";
import { featureCards } from "@/app/utils/utils";

const MainFeature = () => {
  return (
    <section id="feature" className="pt-20 mb-20">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-16">
        {/* Typography Section */}
        <div className="lg:w-1/2 w-full">
          <div className="flex lg:justify-start justify-center">
            <Badge
              title="USE IT ANYWHERE, ANYTIME"
              textStyle="body-italic-bold-16"
            />
          </div>

          <h1 className="h2-bold-40 pt-4 lg:text-left text-center text-grey">
            What <span className="text-primary">Chatblix</span> Helps You Do?
          </h1>

          <p className="h4-regular-24 text-grey-medium pt-4 text-center lg:text-left">
            Simple tools to manage customer messages, work with your team, and
            grow your business.
          </p>
        </div>

        {/* Feature Cards Grid (2x2) */}
        <div className="lg:w-1/2 w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
          {featureCards.slice(0, 4).map((card, index) => (
            <Card
              key={index}
              title={card.title}
              description={card.description}
              icon={<card.icon size={32} color={card.iconColor} />}
              animated={card.animate}
              borderRadius="2xl"
              elevation="lg"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainFeature;
