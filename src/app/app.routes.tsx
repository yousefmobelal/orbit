import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { OnBoarding } from "../features/onboarding/OnBoarding";
import { WelcomePage } from "../features/onboarding/pages/WelcomePage";
import { HowItWorksPage } from "../features/onboarding/pages/HowItWorksPage";
import { ChooseFirstGoalPage } from "@/features/onboarding/pages/ChooseFirstGoalPage";
import { CustomizePlanetPage } from "@/features/onboarding/pages/CustomizePlanetPage";
import { AddYourFirstMissionPage } from "@/features/onboarding/pages/AddYourFirstMissionPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <OnBoarding />,
    children: [
      {
        index: true,
        element: <WelcomePage />,
      },
      {
        path: "how-it-works",
        element: <HowItWorksPage />,
      },
      {
        path: "choose-first-goal",
        element: <ChooseFirstGoalPage />,
      },
      {
        path: "customize-planet",
        element: <CustomizePlanetPage />,
      },
      {
        path: "add-first-mission",
        element: <AddYourFirstMissionPage />,
      },
    ],
  },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
