import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  TrendingUp,
  MessageSquare,
  BarChart3,
  Zap,
  Shield,
} from "lucide-react";
import { GetStarted, Pricing, SeemlessExperience } from "@/app/pages/landing/";
import { APP_ROUTES } from "@/app/constants/routes";
import {
  LearnMoreCRM,
  SmartSolutions,
  EmpowerBusiness,
} from "@/app/pages/products/components/";
import ScaleYourBusiness from "../components/ScaleYourBusiness";
import { Breadcrumb, Button, Badge } from "@/app/components/ui";
import { FAQ } from "@/app/components/common";

interface CRMFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const CRM_FEATURES: CRMFeature[] = [
  {
    icon: <Users className="h-6 w-6" />,
    title: "Contact Management",
    description:
      "Organize and manage all your customer relationships in one unified platform with advanced segmentation.",
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: "Conversation History",
    description:
      "View complete conversation history across all channels to understand customer journey and preferences.",
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Sales Pipeline",
    description:
      "Track deals through the sales pipeline with visual representations and automated workflow stages.",
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Analytics & Insights",
    description:
      "Get actionable insights with comprehensive reports on sales performance and customer metrics.",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Automation",
    description:
      "Automate repetitive tasks and streamline workflows to save time and increase productivity.",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Security & Compliance",
    description:
      "Enterprise-grade security with encryption, compliance certifications, and regular audits.",
  },
];

const CRM: React.FC = () => {
  const CrmBreadCrumb = [
    { label: "Products", href: APP_ROUTES.PUBLIC.PRODUCTS_OVERVIEW },
    { label: "CRM" },
  ];

  return (
    <div className="bg-white min-h-screen">
      <div>
        {/* Breadcrumb Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-16 sm:mt-20 md:mt-24 px-4 sm:px-6 lg:px-8 mb-4 sm:mb-6 md:mb-12"
        >
          <Breadcrumb items={CrmBreadCrumb} />
        </motion.div>

        {/* CRM Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-16 sm:py-20"
        >
          <div className="mx-auto max-w-[1600px] text-center">
            <Badge
              title="Customer Relationship Management"
              bgColor="bg-primary-light/60"
              textColor="text-primary"
            />

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              className="mt-6 font-meri text-[36px] sm:text-[48px] lg:text-[64px] font-bold leading-[1.1] tracking-[-0.02em] text-grey"
            >
              Build Stronger Customer Relationships
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.1 }}
              className="mt-6 mx-auto max-w-3xl body-regular-16 text-grey-medium sm:text-[18px] sm:leading-[28px]"
            >
              Chatblix CRM transforms how you manage customer relationships. Centralize
              data, automate workflows, and close deals faster with unified customer
              intelligence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.15 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button variant="primary" label="Start Free Trial" />
              <Button variant="secondary" label="Schedule Demo" />
            </motion.div>
          </div>
        </motion.section>

        {/* Features Grid */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative px-4 sm:px-6 lg:px-8 py-24 sm:py-32"
        >
          <div className="mx-auto max-w-[1600px]">
            <div className="text-center mb-16">
              <h2 className="font-meri text-[32px] sm:text-[48px] font-bold leading-[1.1] tracking-[-0.02em] text-grey">
                Powerful CRM Features
              </h2>
              <p className="mt-4 mx-auto max-w-2xl body-regular-16 text-grey-medium">
                Everything you need to manage customer relationships at scale
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {CRM_FEATURES.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: index * 0.08 }}
                  className="rounded-2xl border border-grey-light/60 bg-white p-8 hover:shadow-lg transition-all duration-300 hover:border-primary/30"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="body-bold-16 text-base-black mb-2">
                    {feature.title}
                  </h3>
                  <p className="body-regular-14 text-grey-medium">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* EMPOWER BUSINESS SECTION */}
        <EmpowerBusiness />

        {/* SCALE YOUR BUSINESS SECTION */}
        <ScaleYourBusiness />

        {/* LEARN MORE ABOUT CRM SECTION */}
        <LearnMoreCRM />

        {/* GET STARTED */}
        <div className="relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] w-screen">
          <GetStarted />
        </div>

        {/* SMART SOLUTION BUSINES */}
        <SmartSolutions />

        {/* SEEMLESS EXPERIENCE */}
        <SeemlessExperience />

        {/* PRICING SECTION */}
        <Pricing />

        {/* FAQ SECTION */}
        <FAQ variant="default" />
      </div>
    </div>
  );
};

export default CRM;
