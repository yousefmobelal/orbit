import { Button } from "@/components/shared/Button";
import { useNavigate } from "react-router-dom";

export const FirstMissionCompleteProfileButton = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center mt-10">
      <Button
        onClick={() => navigate("/auth/signup")}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: "spring" }}
        animateIn={false}
      >
        Complete My Profile
      </Button>
    </div>
  );
};
