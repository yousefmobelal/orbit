import { Planet } from "@/components/shared/Planet";
import { motion } from "framer-motion";

export const FirstSlide = () => {
  return (
    <>
      <div className="bg-[#121826] rounded-2xl p-6 w-80 backdrop-blur-sm border border-white/10">
        <div className="flex items-center gap-4 mb-4">
          <Planet
            fromColor="#4DA3FF"
            viaColor="#8B5CF6"
            toColor="#22D3EE"
            size={16}
          />
          <div>
            <h3
              className="text-[#F9FAFB] text-lg"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontWeight: 600,
              }}
            >
              Code Master
            </h3>

            <div className="px-2 py-0.5 w-fit rounded-full bg-[#22D3EE]/20 border border-[#22D3EE]/30">
              <span
                className="text-[#22D3EE] text-sm"
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: 600,
                }}
              >
                Level 3
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-[#9CA3AF]">XP Progress</span>
            <span
              className="text-[#22D3EE]"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontWeight: 600,
              }}
            >
              240 / 500
            </span>
          </div>
          <div className="h-2 bg-[#0B0F1A] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-linear-to-r from-[#22D3EE] to-[#4DA3FF]"
              initial={{ width: 0 }}
              animate={{ width: "48%" }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
