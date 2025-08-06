import { Badge, StoreButtons } from "@/app/components/ui";
import { motion } from "framer-motion";
import play from "@/app/assets/icons/play.svg";
import app from "@/app/assets/icons/app.svg";
import Section from "@/app/components/layout/Section";
import { ArrowUpRight } from "lucide-react";

import crm from "@/app/assets/greenIcons/crm.svg";
import unified from "@/app/assets/greenIcons/unified.svg";
import chatbot from "@/app/assets/greenIcons/bot.svg";
import bulk from "@/app/assets/greenIcons/bulk.svg";
import { Link } from "react-router-dom";

const products = [
  {
    title: "CRM",
    icon: crm,
    description: "Manage customer relationships and sales pipelines easily.",
    redirect: "/product/crm",
  },
  {
    title: "Unified Inbox",
    icon: unified,
    description: "Handle all customer messages from one place.",
    redirect: "/product/unified",
  },
  {
    title: "Chatbot",
    icon: chatbot,
    description: "Automate conversations and support with smart bots.",
    redirect: "/product/chatbot",
  },
  {
    title: "Bulk Messaging",
    icon: bulk,
    description: "Send mass messages to your customers quickly.",
    redirect: "/product/bulkmessage",
  },
];

const WhatWeOffer = () => {
  const storeLinks = [
    { img: app, label: "App Store" },
    { img: play, label: "Google Play" },
  ];

  return (
    <Section>
      <motion.div className="flex flex-col lg:flex-row justify-between gap-16 py-20">
        {/* Left Side Typo Section */}
        <article className="max-w-2xl flex flex-col justify-center items-start">
          <div className="flex flex-col items-center text-start">
            <div className="space-y-4">
              <Badge title="WHAT WE OFFER" className="pb-4" />
              <h1 className="h3-bold-32 text-base-black">
                Products Designed for You
              </h1>
              <p className="body-regular-16 text-grey-medium">
                Explore our product suite to see how we can help your business.
                These are the tools our customers use every day to stay
                organized and grow with ease.
              </p>
              <p className="body-regular-16 text-grey-medium">
                Whether you’re running a one-person shop or managing a team,
                <span className="body-bold-16 text-primary">
                  {" "}
                  Assistant helps you reply faster, stay organized, and grow
                  your business
                </span>
              </p>
            </div>
          </div>
          <StoreButtons stores={storeLinks} direction="row" className="pt-6" />
        </article>

        {/* Right Side Accordion Section */}
        <figure className="w-full lg:w-1/2 space-y-4">
          {products.map((item, index) => (
            <div key={index} className="border-b cursor-pointer">
              <div className="flex justify-between items-center py-4">
                <Link to={"/products/crm"} className="flex items-center gap-4">
                  <img src={item.icon} alt={item.title} className="w-20 h-20" />
                  <h3 className="h4-bold-24 text-grey">{item.title}</h3>
                </Link>
                <ArrowUpRight className="w-8 h-8 text-grey-dark" />
              </div>
            </div>
          ))}
        </figure>
      </motion.div>
    </Section>
  );
};

export default WhatWeOffer;
