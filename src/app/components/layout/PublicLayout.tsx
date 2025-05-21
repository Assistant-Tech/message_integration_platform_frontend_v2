import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "@/app/components/common";

const PublicLayout = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <main>
        <Outlet />
      </main>
      {/* Pachi Integrate garne */}
      <Footer />
    </div>
  );
};

export default PublicLayout;
