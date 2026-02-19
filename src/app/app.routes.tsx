import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { OnBoarding } from "../features/onboarding/OnBoarding";
import { Welcome } from "../features/onboarding/pages/Welcome";
import { HowItWorks } from "../features/onboarding/pages/HowItWorks";
import { ChooseFirstGoal } from "@/features/onboarding/pages/ChooseFirstGoal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <OnBoarding />,
    children: [
      {
        index: true,
        element: <Welcome />,
      },
      {
        path: "how-it-works",
        element: <HowItWorks />,
      },
      {
        path: "choose-first-goal",
        element: <ChooseFirstGoal />,
      },
    ],
  },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
