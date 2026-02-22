import { Subtitle } from "@/components/shared/Subtitle";
import { Title } from "@/components/shared/Title";
import { Input } from "@/components/ui/input";
import { Form, useActionData, useNavigation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema } from "../schemas/signup.schema";
import { Loader } from "@/components/shared/Loader";
import { Button } from "@/components/shared/Button";

export const SignupPage = () => {
  const navigation = useNavigation();
  const data = useActionData();
  const error = data?.errors;
  const isSubmitting = navigation.state === "submitting";

  const {
    register,
    formState: { isValid, errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(SignupSchema),
  });
  return (
    <>
      <Title>Complete Your Mission Profile</Title>
      <Subtitle>
        Create your account to save your progress and unlock all features
      </Subtitle>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <Form
        method="POST"
        className="w-full md:w-100 mx-auto text-start flex flex-col items-center justify-center space-y-5"
      >
        <Input
          id="name"
          type="text"
          label="Name"
          placeholder="Your full name"
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          id="email"
          type="email"
          label="Email"
          placeholder="some-user@smiple.com"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          id="password"
          type={"password"}
          label="Password"
          placeholder="Min. 8 characters"
          {...register("password")}
          error={errors.password?.message}
        />

        <Button
          disabled={!isValid || isSubmitting}
          type="submit"
          rounded="md"
          className="w-[70%] mt-5"
          animateDelay={0.7}
          hoverScale={1.09}
        >
          {isSubmitting ? <Loader /> : "Sign Up"}
        </Button>
      </Form>
    </>
  );
};
