import React from "react";
import { motion } from "framer-motion";
import { ContentSectionProps } from "@/app/utils/resource/resource.config";
import { JSX } from "react/jsx-runtime";

const ContentSection: React.FC<ContentSectionProps> = ({
  id,
  title,
  children,
  level = 1,
}) => {
  const getHeadingClasses = (): string => {
    switch (level) {
      case 1:
        return "h3-bold-32 text-base-black mb-2";
      default:
        return "body-regular-16 text-grey-medium mb-2";
    }
  };

  const HeadingTag =
    `h${Math.min(level + 1, 6)}` as keyof JSX.IntrinsicElements;

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "-100px" }}
      className="mb-8 lg:mb-12 scroll-mt-24 px-4 md:px-6 xl:px-8"
    >
      <HeadingTag className={getHeadingClasses()}>{title}</HeadingTag>
      <div className="body-regular-16 text-grey-medium">{children}</div>
    </motion.section>
  );
};

export default ContentSection;
