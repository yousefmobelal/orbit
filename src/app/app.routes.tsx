import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { OnBoarding } from "../features/onboarding/OnBoarding";
import { Welcome } from "../features/onboarding/pages/Welcome";
import { HowItWorks } from "../features/onboarding/pages/HowItWorks";

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
    ],
  },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
