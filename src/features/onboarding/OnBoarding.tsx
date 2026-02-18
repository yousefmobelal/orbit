import GalaxyScene from "../galaxy/Galaxy";
import { OnBoardingTitle } from "./components/OnBoardingTitle";
import { OnBoardingLogin } from "./components/OnBoardingLogin";
import { OnBoardingGetStartedButton } from "./components/OnBoardingGetStartedButton";
import { Planet } from "../../components/shared/Planet";

export const OnBoarding = () => {
  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden relative">
      <div className="absolute inset-0">
        <GalaxyScene />
      </div>
      <div className="relative z-10 text-center max-w-2xl px-8">
        <Planet />
        <OnBoardingTitle />
        <OnBoardingGetStartedButton />
        <OnBoardingLogin />
      </div>
    </div>
  );
};
