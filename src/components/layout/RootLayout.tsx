import GalaxyScene from "@/features/galaxy/Galaxy";
import { Outlet } from "react-router-dom";

export const RootLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden relative">
      <div className="absolute inset-0">
        <GalaxyScene />
      </div>
      <div className="relative z-10 text-center w-full max-w-5xl px-5 md:px-8 lg:px-12 py-8">
        <Outlet />
      </div>
    </div>
  );
};
