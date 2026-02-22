import GalaxyScene from "@/features/galaxy/Galaxy";
import { Outlet } from "react-router-dom";

export const AppLayout = () => {
  return (
    <div className="min-h-screen flex justify-center overflow-hidden relative">
      <div className="absolute inset-0">
        <GalaxyScene />
      </div>
      <div className="relative z-10 w-full">
        <Outlet />
      </div>
    </div>
  );
};
