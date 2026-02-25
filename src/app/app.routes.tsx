import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { WelcomePage } from "../features/onboarding/pages/WelcomePage";
import { HowItWorksPage } from "../features/onboarding/pages/HowItWorksPage";
import { CustomizePlanetPage } from "@/features/onboarding/pages/CustomizePlanetPage";
import { AddYourFirstMissionPage } from "@/features/onboarding/pages/AddYourFirstMissionPage";
import { themesLoader } from "@/features/onboarding/loaders/themes.loader";
import { OnBoardingLayout } from "@/components/layout/OnBoardingLayout";
import { SignupPage } from "@/features/auth/pages/SignupPage";
import { signupAction } from "@/features/auth/actions/signup.action";
import { loginAction } from "@/features/auth/actions/login.action";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { HomePage } from "@/features/home/pages/HomePage";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { AppLayout } from "@/components/layout/AppLayout";
import { PlanetDetailsPage } from "@/features/planetDetails/PlanetDetailsPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { planetDetailsLoader } from "@/features/planetDetails/loaders/planetDetails.loader";
import { SettingsPage } from "@/features/settings/pages/SettingsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <OnBoardingLayout />,
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
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "signup",
        element: <SignupPage />,
        action: signupAction,
      },
      {
        path: "login",
        element: <LoginPage />,
        action: loginAction,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "home",
        element: <AppLayout />,
        children: [
          { index: true, element: <HomePage /> },
          {
            path: "planet/:id",
            element: <PlanetDetailsPage />,
            loader: ({ params }) =>
              planetDetailsLoader({ params: { id: params.id! } }),
          },
          {
            path: "settings",
            element: <SettingsPage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
