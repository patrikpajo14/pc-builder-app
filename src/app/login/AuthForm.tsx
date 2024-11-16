"use client";

import { useCallback, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import Button from "@/components/Button";
import Input from "@/components/forms/Input";
import axiosInstance, { axiosPrivate } from "@/axios/axios";
import Cookies from "js-cookie";
import { useAuthContext } from "@/context/auth/authContext";

interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

const AuthForm: React.FC = () => {
  const [variant, setVariant] = useState<"LOGIN" | "REGISTER">("LOGIN");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setLoginUserSuccess, addUserToLocalStorage } = useAuthContext();

  const toggleVariant = useCallback(() => {
    setVariant((prevVariant) =>
      prevVariant === "LOGIN" ? "REGISTER" : "LOGIN",
    );
  }, []);

  console.log("AXIOS HEADERS ON LOGIN", axiosInstance.defaults.headers);

  const {
    register,
    handleSubmit,
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
    const { firstname, lastname, email, password } = data;
    if (variant === "REGISTER") {
      const response = await axiosInstance.post(`/api/auth/register`, {
        firstname,
        lastname,
        email,
        password,
      });
      console.log("REGISTER RESPONSE", response);
      if (response?.status === 200) {
        const { user, session } = response.data;

        console.log("USER", user, "SESSION", session);

        const { accessToken, refreshToken, expire, refreshExpire } = session;
        setLoginUserSuccess(
          user,
          accessToken,
          refreshToken,
          expire,
          refreshExpire,
        );
        addUserToLocalStorage(
          user,
          accessToken,
          expire,
          refreshExpire,
          refreshToken,
        );
        Cookies.set("token", accessToken, {
          expires: 1,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
        });
        axiosPrivate.defaults.headers["Authorization"] =
          `Bearer ${accessToken}`;
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
        const { user, session } = response.data;
        const { accessToken, refreshToken, expire, refreshExpire } = session;
        setLoginUserSuccess(
          user,
          accessToken,
          refreshToken,
          expire,
          refreshExpire,
        );
        addUserToLocalStorage(
          user,
          accessToken,
          expire,
          refreshExpire,
          refreshToken,
        );
        Cookies.set("token", accessToken, {
          expires: 1, // 1 day; adjust as needed
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
        });
        axiosPrivate.defaults.headers["Authorization"] =
          `Bearer ${accessToken}`;
        toast.success("Logged in successfully!");
      } else {
        toast.error("Login failed!");
      }
      console.log("RESPONSE", response?.status, response?.data);
    }
    setIsLoading(false);

    console.log("AXIOS HEADERS", axiosPrivate.defaults.headers);
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
