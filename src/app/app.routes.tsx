import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { OnBoarding } from "../features/onboarding/OnBoarding";

const router = createBrowserRouter([
  {
    path: "/",
    element: <OnBoarding />,
  },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
