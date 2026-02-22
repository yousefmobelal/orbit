import { useState } from "react";
import { FirstMissionPlanetXpCard } from "../components/FirstMissionPlanetXpCard";
import { FirstMissionInput } from "../components/FirstMissionInput";
import { FirstMissionCompleteProfileButton } from "../components/FirstMissionCompleteProfileButton";
import { Title } from "@/components/shared/Title";
import { Subtitle } from "@/components/shared/Subtitle";
import { useOnBoardingStore } from "@/store/onboarding-store";

export function AddYourFirstMissionPage() {
  const setTaskData = useOnBoardingStore((s) => s.setFirstTaskData);
  const planetData = useOnBoardingStore((s) => s.firstPlanetData);
  const [showXP, setShowXP] = useState(false);
  const [xpProgress, setXpProgress] = useState(0);
  const [mission, setMission] = useState("");

  const handleAddMission = () => {
    if (mission.trim()) {
      setShowXP(true);
      setTimeout(() => {
        setXpProgress(15);
        setTaskData({
          name: mission,
        });
      }, 500);
    }
  };

  return (
    <>
      <Title>Add Your First Mission</Title>

      <Subtitle>{`Start building momentum for ${planetData?.name || "Planet"}`}</Subtitle>
      <FirstMissionPlanetXpCard
        showXP={showXP}
        xpProgress={xpProgress}
        planetName={planetData?.name || "Planet"}
      />
      <FirstMissionInput
        mission={mission}
        setMission={setMission}
        handleAddMission={handleAddMission}
        showXP={showXP}
      />
      {showXP && <FirstMissionCompleteProfileButton />}
    </>
  );
}
