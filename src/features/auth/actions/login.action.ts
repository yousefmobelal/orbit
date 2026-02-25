import { getFieldErrors } from "@/lib/utils/zodErrors";
import { LoginSchema } from "../schemas/login.schema";
import { storage } from "@/lib/utils/storage";
import { storageKeys } from "@/lib/utils/storageKeys";
import { authApi } from "@/lib/api/client/authApi";
import { redirect } from "react-router-dom";
import { setAuthToken } from "@/lib/api/http";
import { useUserStore } from "@/store/user-store";

export async function loginAction({ request }: { request: Request }) {
  const formData = Object.fromEntries(await request.formData());

  const result = LoginSchema.safeParse(formData);
  if (!result.success) {
    return {
      fieldErrors: getFieldErrors(result.error),
    };
  }

  try {
    const response = await authApi.login(result.data);

    storage.set(storageKeys.ACCESS_TOKEN, response.accessToken);
    storage.set(storageKeys.REFRESH_TOKEN, response.refreshToken);
    setAuthToken(response.accessToken);
    useUserStore.setState({ isAuthenticated: true });

    return redirect("/app");
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
