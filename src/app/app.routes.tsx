import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { OnBoarding } from "../features/onboarding/OnBoarding";
import { WelcomePage } from "../features/onboarding/pages/WelcomePage";
import { HowItWorksPage } from "../features/onboarding/pages/HowItWorksPage";
import { CustomizePlanetPage } from "@/features/onboarding/pages/CustomizePlanetPage";
import { AddYourFirstMissionPage } from "@/features/onboarding/pages/AddYourFirstMissionPage";
import { themesLoader } from "@/features/onboarding/loaders/themes.loader";
import { RootLayout } from "@/components/layout/RootLayout";
import { SignupPage } from "@/features/auth/pages/SignupPage";
import { signupAction } from "@/features/auth/actions/signup.action";
import { loginAction } from "@/features/auth/actions/login.action";
import { LoginPage } from "@/features/auth/pages/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
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
            path: "customize-planet",
            loader: themesLoader,
            element: <CustomizePlanetPage />,
          },
          {
            path: "add-first-mission",
            element: <AddYourFirstMissionPage />,
          },
        ],
      },
      {
        path: "signup",
        action: signupAction,
        element: <SignupPage />,
      },
      {
        path: "login",
        action: loginAction,
        element: <LoginPage />,
      },
    ],
  },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
