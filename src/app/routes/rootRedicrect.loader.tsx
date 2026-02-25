import { useUserStore } from "@/store/user-store";
import { redirect } from "react-router-dom";

export async function rootRedirectLoader() {
  const { isAuthenticated } = useUserStore.getState();
  console.log(`isAuthenticated: ${isAuthenticated}`);

  if (!isAuthenticated) {
    return redirect("/onboarding");
  }

  return redirect("/app");
}
