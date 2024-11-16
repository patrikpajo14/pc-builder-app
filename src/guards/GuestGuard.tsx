"use client";

import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/auth/authContext";
import PageLoader from "@/components/PageLoader/PageLoader";

interface GuestGuardProps {
  children: ReactNode;
}

const GuestGuard: React.FC<GuestGuardProps> = ({ children }) => {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    }
  }, [user, router]);

  if (user) {
    return <PageLoader />;
  }

  return <>{children}</>;
};

export default GuestGuard;
