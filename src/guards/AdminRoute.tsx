import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "@/context/auth/authContext";

interface AdminRouteProps {
  children: ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user } = useAuthContext();

  /*  if (user?.grupa !== 2) {
    return <Navigate to="/403" replace />;
  }*/

  return <>{children}</>;
};

export default AdminRoute;
