"use client";

import React, { useEffect } from "react";
import Nav from "@/components/Nav";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import PageLoader from "@/components/PageLoader/PageLoader";
import { useAuthContext } from "@/context/auth/authContext";
import { axiosPrivate } from "@/axios/axios";

interface AuthCheckerProps {
  children: React.ReactNode;
}

const AuthChecker: React.FC<AuthCheckerProps> = ({ children }) => {
  const { user, accessToken } = useAuthContext();

  console.log("USER LOGED", user);
  useEffect(() => {
    if (user && accessToken) {
      if (!axiosPrivate.defaults.headers["Authorization"]) {
        axiosPrivate.defaults.headers["Authorization"] =
          `Bearer ${accessToken}`;
        console.log("ADDED HEADERS", axiosPrivate.defaults.headers);
      }
    }
  }, [user, accessToken]);

  if (!user) {
    return <PageLoader />;
  }

  if (!user.enabled && user.role === "USERR") {
    return (
      <section className="container-max">
        <Nav />
        <div className="inner card py-[20px] px-[35px] w-full md:w-1/2 mx-auto text-center">
          <Image
            src="/icons/ico_error.svg"
            alt="error"
            width={70}
            height={70}
            className="inline-block"
          />
          <h1 className="text-2xl font-bold mb-5 text-red-500">
            Access Denied!
          </h1>
          <p className="mb-3">
            You dont have access to the app. Please contact your administrator
            to grant you access to the application.
          </p>
          <a href="mailto:admin@gmail.com" className="text-primary-red">
            admin@gmail.com
          </a>
        </div>
      </section>
    );
  } else {
    return (
      <>
        <Sidebar />
        <section className="container-fluid">
          <Nav />
          {children}
        </section>
      </>
    );
  }
};

export default AuthChecker;
