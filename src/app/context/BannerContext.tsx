import React, { createContext, useContext, useEffect, useState } from "react";

const ANNOUNCEMENT_BANNER_KEY = "announcement_banner_dismissed";

interface BannerContextType {
  bannerVisible: boolean;
  setBannerVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const BannerContext = createContext<BannerContextType | undefined>(undefined);

export const BannerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [bannerVisible, setBannerVisible] = useState(true);

  useEffect(() => {
    const dismissed = localStorage.getItem(ANNOUNCEMENT_BANNER_KEY);
    setBannerVisible(!dismissed);
  }, []);

  return (
    <BannerContext.Provider value={{ bannerVisible, setBannerVisible }}>
      {children}
    </BannerContext.Provider>
  );
};

export const useBanner = () => {
  const context = useContext(BannerContext);
  if (!context) {
    throw new Error("useBanner must be used within a BannerProvider");
  }
  return context;
};
