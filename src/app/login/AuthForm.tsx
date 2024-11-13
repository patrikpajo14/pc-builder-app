"use client";

import axios from "axios";
import { useCallback, useState } from "react";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import { toast } from "react-hot-toast";
import Button from "@/components/Button";
import Input from "@/components/forms/Input";

interface FormData {
  name: string;
  email: string;
  password: string;
}

const AuthForm: React.FC = () => {
  const [variant, setVariant] = useState<"LOGIN" | "REGISTER">("LOGIN");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toggleVariant = useCallback(() => {
    setVariant((prevVariant) =>
      prevVariant === "LOGIN" ? "REGISTER" : "LOGIN",
    );
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setIsLoading(true);

    /*if (variant === "REGISTER") {
            axios
                .post("/api/register", data)
                .then(() =>
                    signIn("credentials", {
                        ...data,
                        redirect: false,
                    })
                )
                .then((callback) => {
                    if (callback?.error) {
                        toast.error("Invalid credentials!");
                    }
                    if (callback?.ok) {
                        toast.success("User has been registered");
                        router.push("/dashboard");
                    }
                })
                .catch(() => toast.error("Something went wrong!"))
                .finally(() => setIsLoading(false));
        }

        if (variant === "LOGIN") {
            signIn("credentials", {
                ...data,
                redirect: false,
            })
                .then((callback) => {
                    if (callback?.error) {
                        toast.error(callback.error);
                    }
                    if (callback?.ok && !callback?.error) {
                        toast.success("Logged in successfully!");
                        router.push("/dashboard");
                    }
                })
                .catch((error) => toast.error(error))
                .finally(() => setIsLoading(false));
        }*/
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-5">
        {variant === "LOGIN"
          ? "Login with your Account"
          : "Create your account"}
      </h1>
      <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
        {variant === "REGISTER" && (
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="name"
            label="Username"
          />
        )}
        <Input
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          id="email"
          label="Email"
          type="email"
        />
        <Input
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          id="password"
          label="Password"
          type="password"
        />
        <div className="pt-4">
          <Button disabled={isLoading} fullWidth type="submit">
            {variant === "LOGIN" ? "Sign in" : "Register"}
          </Button>
        </div>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-gray-700 px-2 text-gray-200">
              Or continue with
            </span>
          </div>
        </div>
      </div>
      <div className="text-sm mt-6 px-2 text-gray-400">
        <p>
          {variant === "LOGIN"
            ? "You don't have account? "
            : "Already have an account? "}
          <button
            onClick={toggleVariant}
            className="cursor-pointer text-primary-red hover:underline hover:text-primary"
          >
            {variant === "LOGIN" ? " Create account" : " Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
