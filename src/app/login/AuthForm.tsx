"use client";

import { useCallback, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import Button from "@/components/Button";
import Input from "@/components/forms/Input";
import axiosInstance from "@/axios";
import useGlobalStore from "@/store/globalStore";

interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

const AuthForm: React.FC = () => {
  const [variant, setVariant] = useState<"LOGIN" | "REGISTER">("LOGIN");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user = useGlobalStore((state) => state.user);
  const setUser = useGlobalStore((state) => state.setUser);
  const setSession = useGlobalStore((state) => state.setSession);

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
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);

    console.log("DATA", data);
    const { firstname, lastname, email, password } = data;

    console.log("MY USER ", user);

    if (variant === "REGISTER") {
      const response = await axiosInstance.post(`/api/auth/register`, {
        firstname,
        lastname,
        email,
        password,
      });
      console.log("REGISTER RESPONSE", response);
      if (response?.status === 200) {
        setUser(response?.data?.user);
        setSession(response?.data?.session);
        toast.success("User registered successfully!");
      } else {
        toast.error("Register failed!");
      }
    }

    if (variant === "LOGIN") {
      const response = await axiosInstance.post(`/api/auth/login`, {
        email,
        password,
      });
      if (response?.status === 200) {
        setUser(response?.data?.user);
        setSession(response?.data?.session);
        toast.success("Logged in successfully!");
      } else {
        toast.error("Login failed!");
      }
      console.log("RESPONSE", response?.status, response?.data);
    }
    setIsLoading(false);
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
          <>
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id="firstname"
              label="First name"
            />
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id="lastname"
              label="Last name"
            />
          </>
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
