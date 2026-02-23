import { getFieldErrors } from "@/lib/utils/zodErrors";
import { SignupSchema } from "../schemas/signup.schema";
import { authApi } from "@/lib/api/client/authApi";
import { redirect } from "react-router-dom";
import { storage } from "@/lib/utils/storage";
import { storageKeys } from "@/lib/utils/storageKeys";
import { planetApi } from "@/lib/api/client/planetApi";
import { useOnBoardingStore } from "@/store/onboarding-store";
import { taskApi } from "@/lib/api/client/taskApi";

export async function signupAction({ request }: { request: Request }) {
  const formData = Object.fromEntries(await request.formData());

  const result = SignupSchema.safeParse(formData);

  if (!result.success) {
    return {
      fieldErrors: getFieldErrors(result.error),
    };
  }

  try {
    const response = await authApi.signup(result.data);

    storage.set(storageKeys.ACCESS_TOKEN, response.accessToken);
    storage.set(storageKeys.REFRESH_TOKEN, response.refreshToken);

    const { firstPlanetData, firstTaskData } = useOnBoardingStore.getState();

    const planetRes = await planetApi.create({
      title: firstPlanetData.name!,
      theme: firstPlanetData.themeId!,
    });

    await taskApi.create({
      planetId: planetRes.planet._id,
      title: firstTaskData.name!,
      difficulty: "medium",
    });

    // Optionally clear onboarding data after use
    useOnBoardingStore.getState().reset();
    return redirect("/home");
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        formError: error.message,
      };
    }

    return {
      formError: "Something went wrong",
    };
  }
}
