import React from "react";
import AuthChecker from "@/components/AuthChecker";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return <AuthChecker>{children}</AuthChecker>;
};

export default DashboardLayout;
