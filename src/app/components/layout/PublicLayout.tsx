import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "@/app/components/common";

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      {/* Pachi Integrate garne */}
      <Footer />
    </div>
  );
};

export default PublicLayout;
