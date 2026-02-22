import { motion } from "framer-motion";
import { FirstSlide } from "../components/FirstSlide";
import { SecondSlide } from "../components/SecondSlide";
import { useState } from "react";
import { ThirdSlide } from "../components/ThirdSlide";
import { SliderButtons } from "../components/SliderButtons";
import { Title } from "@/components/shared/Title";

export const HowItWorksPage = () => {
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
    <div className="h-[90vh] flex flex-col justify-center items-center relative">
      <Title>How It Works</Title>

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

      <div className="absolute bottom-0 md:bottom-5 w-full">
        <SliderButtons
          activeSlide={activeSlide}
          setActiveSlide={setActiveSlide}
          numberOfSlides={slides.length}
        />
      </div>
    </div>
  );
};
