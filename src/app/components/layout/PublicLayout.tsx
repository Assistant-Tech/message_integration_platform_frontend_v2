import { Outlet } from "react-router-dom";
import { PopupModal } from "@/app/components/ui";

const PublicLayout = () => {
  return (
    <div className="flex flex-col">
      <PopupModal />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
