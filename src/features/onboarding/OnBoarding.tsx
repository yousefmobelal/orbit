import { Outlet } from "react-router-dom";
import GalaxyScene from "../galaxy/Galaxy";

export const OnBoarding = () => {
  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden relative">
      <div className="absolute inset-0">
        <GalaxyScene />
      </div>
      <Outlet />
    </div>
  );
};
