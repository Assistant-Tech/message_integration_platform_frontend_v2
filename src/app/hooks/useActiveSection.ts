import { useState, useEffect } from "react";
import { getActiveSection } from "@/app/utils/resource/resource.config";

export const useActiveSection = (
  contentIds: string[],
  scrollOffset: number = 150,
): string => {
  const [activeSection, setActiveSection] = useState<string>(
    contentIds[0] || "",
  );

  useEffect(() => {
    const handleScroll = () => {
      const active = getActiveSection(contentIds, scrollOffset);
      if (active) {
        setActiveSection(active);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [contentIds, scrollOffset]);

  return activeSection;
};
