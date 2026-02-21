import { OnBoardingTitle } from "../components/OnBoardingTitle";
import { OnBoardingLogin } from "../components/OnBoardingLogin";
import { OnBoardingGetStartedButton } from "../components/OnBoardingGetStartedButton";
import { Planet } from "../../../components/shared/Planet";

export const WelcomePage = () => {
  return (
    <>
      <Planet
        fromColor="#4DA3FF"
        viaColor="#8B5CF6"
        toColor="#22D3EE"
        size={32}
      />
      <OnBoardingTitle />
      <OnBoardingGetStartedButton />
      <OnBoardingLogin />
    </>
  );
};
