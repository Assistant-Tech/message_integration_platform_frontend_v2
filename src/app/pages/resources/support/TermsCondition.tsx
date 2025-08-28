import React from "react";
import { APP_ROUTES } from "@/app/constants/routes";
import { Breadcrumb } from "@/app/components/ui";
import {
  scrollToSection,
  TableOfContentsItem,
  termsContentData,
} from "@/app/utils/resource/utils";
import { useActiveSection } from "@/app/hooks/useActiveSection";
import { TermsContent } from "@/app/pages/resources/components";
import { StickyTOCLayout } from "@/app/pages/resources/components/";

const TermsCondition: React.FC = () => {
  const SupportCrumb = [
    { label: "Resources", href: APP_ROUTES.PUBLIC.RESOURCES_OVERVIEW },
    { label: "Support", href: APP_ROUTES.PUBLIC.SUPPORT },
    { label: "Terms & Condition" },
  ];

  const tableOfContentsItems: TableOfContentsItem[] = termsContentData.map(
    (item) => ({
      id: item.id,
      title: item.title,
      level: item.level,
    }),
  );

  const contentIds = termsContentData.map((item) => item.id);
  const activeSection = useActiveSection(contentIds);

  const handleSectionClick = (sectionId: string): void => {
    scrollToSection(sectionId, 100);
  };

  return (
    <StickyTOCLayout
      title="Assistant Tech's Terms & Condition"
      subtitle="Please read these terms & condition carefully before using our services."
      breadcrumb={<Breadcrumb items={SupportCrumb} />}
      tocItems={tableOfContentsItems}
      activeSection={activeSection}
      onSectionClick={handleSectionClick}
    >
      <TermsContent content={termsContentData} />
    </StickyTOCLayout>
  );
};

export default TermsCondition;
