import { Outlet } from "react-router-dom";
import Navbar from "../common/navbar";

export const RootLayout = () => {
  return (
    <div className="w-full">
      <div className="h-16 bg-transparent border-b fixed top-0 z-50 backdrop-blur-3xl flex w-full justify-center items-center">
        <Navbar />
      </div>
      <div className="w-full min-h-[100%-64px] pt-16">
        <Outlet />
      </div>
    </div>
  );
};
