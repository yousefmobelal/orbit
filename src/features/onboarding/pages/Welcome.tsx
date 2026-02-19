import { OnBoardingTitle } from "../components/OnBoardingTitle";
import { OnBoardingLogin } from "../components/OnBoardingLogin";
import { OnBoardingGetStartedButton } from "../components/OnBoardingGetStartedButton";
import { Planet } from "../../../components/shared/Planet";

export const Welcome = () => {
  return (
    <div className="relative z-10 text-center max-w-2xl px-8">
      <Planet
        fromColor="#4DA3FF"
        viaColor="#8B5CF6"
        toColor="#22D3EE"
        size={32}
      />
      <OnBoardingTitle />
      <OnBoardingGetStartedButton />
      <OnBoardingLogin />
    </div>
  );
};
