import React from "react";
import { Outlet } from "react-router-dom";

const PublicLayout: React.FC = () => {
  return (
    <div className="flex flex-col overflow-x-hidden">
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
