import { PopupModal } from "@/app/components/common";
import React, { ReactNode } from "react";

interface PublicLayoutProps {
  children: ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col">
      <PopupModal />
      <main>{children}</main>
    </div>
  );
};

export default PublicLayout;
