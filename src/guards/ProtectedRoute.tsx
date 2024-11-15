"use client";

import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/auth/authContext";
import PageLoader from "@/components/PageLoader/PageLoader";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { logoutUser, accessToken } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (accessToken === undefined) {
      return;
    }

    if (!accessToken) {
      logoutUser();
      router.replace("/login");
    }
  }, [accessToken, logoutUser, router]);

  if (accessToken === undefined) {
    return <PageLoader />;
  }

  if (!accessToken) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
