import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "@/app/components/common";

interface PublicLayoutProps {
  children?: ReactNode;
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">{children || <Outlet />}</main>
      {/* Pachi Integrate garne */}
      {/* <Footer /> */}
    </div>
  );
};

export default PublicLayout;
