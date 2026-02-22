import { Settings } from "lucide-react";
import React from "react";

export const SettingsButton = () => {
  return (
    <button className="size-12 rounded-full group hover:border-[#22D3EE] bg-[#121826] flex justify-center items-center border border-gray-400 absolute bottom-5 right-5 cursor-pointer">
      <Settings className="text-gray-400 group-hover:text-[#22D3EE]" />
    </button>
  );
};
