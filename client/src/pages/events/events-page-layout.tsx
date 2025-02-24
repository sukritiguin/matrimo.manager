import React from "react";
import { Outlet } from "react-router-dom";

export const EventsPageLayout: React.FC = () => {
  return (
    <div className="flex w-full flex-col items-center py-8 space-y-4 px-8">
      <Outlet />
    </div>
  );
};
