import React from "react";
import { TermsContentProps } from "@/app/utils/resource/utils";
import ContentSection from "./ContentSection";

const TermsContent: React.FC<TermsContentProps> = ({ content }) => {
  return (
    <div className="space-y-8 lg:space-y-12">
      {content.map((section) => (
        <ContentSection
          key={section.id}
          id={section.id}
          title={section.title}
          level={section.level}
        >
          {section.content}
        </ContentSection>
      ))}
    </div>
  );
};
export default TermsContent;
