import { useNavigate } from "react-router-dom";
import { Button } from "@/components/shared/Button";

export const OnBoardingGetStartedButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate("/how-it-works")}
      animateDelay={0.7}
      hoverScale={1.09}
    >
      Get Started
    </Button>
  );
};
