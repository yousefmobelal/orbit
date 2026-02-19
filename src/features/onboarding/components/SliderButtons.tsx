import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

export const SliderButtons: React.FC<{
  activeSlide: number;
  setActiveSlide: Dispatch<SetStateAction<number>>;
  numberOfSlides: number;
}> = ({ activeSlide, setActiveSlide, numberOfSlides }) => {
  return (
    <div className="flex justify-between items-center my-4 w-full md:max-w-80 mx-auto">
      <button
        className={`size-8 rounded-md ${activeSlide === 0 ? "bg-[#121826] text-white" : "bg-white text-black"} flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity`}
        disabled={activeSlide === 0}
        onClick={() =>
          setActiveSlide((prev) => (prev === 0 ? numberOfSlides - 1 : prev - 1))
        }
      >
        <ChevronLeft />
      </button>

      <div className="flex gap-2">
        {Array.from({ length: numberOfSlides }, (_, index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === activeSlide
                ? "w-8 bg-[#4DA3FF]"
                : "w-2 bg-[#9CA3AF]/30 hover:bg-[#9CA3AF]/50"
            }`}
          />
        ))}
      </div>

      <motion.button
        className="h-8 rounded-md bg-white text-black flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity overflow-hidden"
        animate={{
          width: activeSlide === numberOfSlides - 1 ? "auto" : "2rem",
          paddingLeft: activeSlide === numberOfSlides - 1 ? "1rem" : "0",
          paddingRight: activeSlide === numberOfSlides - 1 ? "1rem" : "0",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onClick={() => {
          if (activeSlide === numberOfSlides - 1) {
            // Handle "Get Started" click
            console.log("Get Started clicked");
          } else {
            setActiveSlide((prev) => prev + 1);
          }
        }}
      >
        <AnimatePresence mode="wait">
          {activeSlide === numberOfSlides - 1 ? (
            <motion.span
              key="get-started"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="whitespace-nowrap font-medium"
            >
              Continue
            </motion.span>
          ) : (
            <motion.div
              key="chevron"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronRight />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};
