import { motion } from "framer-motion";
import { FirstSlide } from "../components/FirstSlide";
import { SecondSlide } from "../components/SecondSlide";
import { useState } from "react";
import { ThirdSlide } from "../components/ThirdSlide";
import { SliderButtons } from "../components/SliderButtons";

export const HowItWorks = () => {
  const slides = [
    <FirstSlide key="slide-1" />,
    <SecondSlide key="slide-2" />,
    <ThirdSlide key="slide-3" />,
  ];
  const slidesTitles = [
    "Create a planet for every goal.",
    "Complete tasks to earn XP and level up.",
    "Track your progress and share with friends.",
  ];
  const [activeSlide, setActiveSlide] = useState(0);
  return (
    <div className="z-10 text-center max-w-2xl px-8 h-screen py-10 flex flex-col justify-between">
      <motion.h2
        className="text-4xl text-center mb-4 text-[#F9FAFB]"
        style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        How It Works
      </motion.h2>

      <div className="mb-8 flex items-center justify-center">
        <motion.div
          key={`slide-${activeSlide}`}
          className="text-center"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-8 flex justify-center">{slides[activeSlide]}</div>
          <p
            className="text-2xl text-[#F9FAFB] max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
          >
            {slidesTitles[activeSlide]}
          </p>
        </motion.div>
      </div>

      <SliderButtons
        activeSlide={activeSlide}
        setActiveSlide={setActiveSlide}
        numberOfSlides={slides.length}
      />
    </div>
  );
};
