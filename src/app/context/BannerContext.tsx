import React, { createContext, useContext, useState } from "react";

interface BannerContextType {
  isVisible: (key?: string) => boolean;
  dismiss: (key?: string) => void;
}

const BannerContext = createContext<BannerContextType | undefined>(undefined);

export const BannerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [visibleMap, setVisibleMap] = useState<{ [key: string]: boolean }>({});

  const isVisible = (
    key: string = "announcement_banner_dismissed",
  ): boolean => {
    const stored = localStorage.getItem(key);
    if (stored === "true") return false;
    if (key in visibleMap) return visibleMap[key] ?? true;
    return true;
  };

  const dismiss = (key: string = "announcement_banner_dismissed") => {
    localStorage.setItem(key, "true");
    setVisibleMap((prev) => ({ ...prev, [key]: false }));
  };

  return (
    <BannerContext.Provider value={{ isVisible, dismiss }}>
      {children}
    </BannerContext.Provider>
  );
};

export const useBanner = () => {
  const context = useContext(BannerContext);
  if (!context)
    throw new Error("useBanner must be used within a BannerProvider");
  return context;
};
