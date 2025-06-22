import React, { ReactNode } from "react";

interface PublicLayoutProps {
  children: ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col overflow-x-hidden">
      <main>{children}</main>
    </div>
  );
};

export default PublicLayout;
