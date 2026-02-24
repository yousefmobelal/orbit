import { Plus } from "lucide-react";
import { useState } from "react";
import { AddPlanetDialog } from "./AddPlanetDialog";

export const AddPlanetButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="size-12 rounded-full group hover:border-[#22D3EE] bg-[#121826] flex justify-center items-center border border-gray-400 cursor-pointer"
        aria-label="Add planet"
      >
        <Plus className="text-gray-400 group-hover:text-[#22D3EE]" />
      </button>
      <AddPlanetDialog open={open} onOpenChange={setOpen} />
    </>
  );
};
