import { Card } from "@/app/components/ui";

import {
  MessageSquare,
  Zap,
  Shield,
  Users,
  BarChart3,
  Clock,
} from "lucide-react";

const featureCards = [
  {
    title: "All Messages in One Inbox",
    description:
      "No more switching between apps! Brings all your messages together in one place, so you can reply faster and stay organized.",
    backgroundColor: "#26AA91",
    iconColor: "#26AA91",
    icon: <MessageSquare size={32} />,
    animated: true,
  },
  {
    title: "Lightning Fast Responses",
    description:
      "Respond to customers instantly with smart templates and automated workflows that save time.",
    backgroundColor: "#4A6FFF",
    iconColor: "#4A6FFF",
    icon: <Zap size={32} />,
    animated: true,
  },
  {
    title: "Secure & Private",
    description:
      "Enterprise-grade security ensures your conversations and data remain protected at all times.",
    backgroundColor: "#FF6B6B",
    iconColor: "#FF6B6B",
    icon: <Shield size={32} />,
    animated: true,
  },
  {
    title: "Team Collaboration",
    description:
      "Work seamlessly with your team members to provide the best customer support experience.",
    backgroundColor: "#9B59B6",
    iconColor: "#9B59B6",
    icon: <Users size={32} />,
    animated: true,
  },
  {
    title: "Analytics & Insights",
    description:
      "Track performance metrics and gain valuable insights to improve your customer communication.",
    backgroundColor: "#F39C12",
    iconColor: "#F39C12",
    icon: <BarChart3 size={32} />,
    animated: true,
  },
  {
    title: "24/7 Availability",
    description:
      "Never miss a customer message with round-the-clock monitoring and instant notifications.",
    backgroundColor: "#1ABC9C",
    iconColor: "#1ABC9C",
    icon: <Clock size={32} />,
    animated: true,
  },
];
const Feature = () => {
  return (
    <div className="min-h-screen w-full bg-base-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Typography Section */}
        <article className="flex flex-col items-center text-center mb-16 max-w-4xl mx-auto">
          <span className="text-primary font-semibold text-lg mb-4 tracking-wide uppercase">
            Use It Anywhere
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            What <span className="text-primary">Assistant</span> Helps You Do?
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl">
            Simple tools to manage customer messages, work with your team, and
            grow your business.
          </p>
        </article>

        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {featureCards.map((card, index) => (
            <div key={index} className="min-h-80">
              <Card
                title={card.title}
                description={card.description}
                backgroundColor={card.backgroundColor}
                iconColor={card.iconColor}
                icon={card.icon}
                animated={card.animated}
                borderRadius="2xl"
                elevation="lg"
              />
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Feature;
