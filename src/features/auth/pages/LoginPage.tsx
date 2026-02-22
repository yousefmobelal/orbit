import { Button } from "@/components/shared/Button";
import { Loader } from "@/components/shared/Loader";
import { Subtitle } from "@/components/shared/Subtitle";
import { Title } from "@/components/shared/Title";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Form, useActionData, useNavigation } from "react-router-dom";
import { LoginSchema, type LoginFormData } from "../schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export const LoginPage = () => {
  const navigation = useNavigation();
  const actionData = useActionData() as {
    fieldErrors?: Record<string, string>;
    formError?: string;
  };
  const isSubmitting = navigation.state === "submitting";

  const {
    register,
    formState: { isValid, errors },
  } = useForm<LoginFormData>({
    mode: "onChange",
    resolver: zodResolver(LoginSchema),
  });
  return (
    <div>
      <Title>Welcome back to Orbit</Title>
      <Subtitle>Log in to continue your journey</Subtitle>
      {actionData?.formError && (
        <p className="text-red-500 mb-2">{actionData.formError}</p>
      )}

      <Form
        method="POST"
        className="w-full md:w-100 mx-auto text-start flex flex-col items-center justify-center space-y-5"
      >
        <Input
          id="email"
          type="email"
          label="Email"
          placeholder="some-user@smiple.com"
          error={errors.email?.message || actionData?.fieldErrors?.email}
          {...register("email")}
        />
        <Input
          id="password"
          type="password"
          label="Password"
          placeholder="Min. 8 characters"
          error={errors.password?.message || actionData?.fieldErrors?.password}
          {...register("password")}
        />

        <div className="mt-5 w-full flex flex-col items-center justify-center">
          {isSubmitting ? (
            <Loader />
          ) : (
            <Button
              disabled={!isValid || isSubmitting}
              type="submit"
              rounded="md"
              className="w-[70%]"
              animateDelay={0.4}
              hoverScale={1.09}
            >
              Log In
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};
