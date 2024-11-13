import React from "react";
import Nav from "@/components/Nav";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import PageLoader from "@/components/PageLoader/PageLoader";
import { User } from "@/types";

export const metadata = {
  title: "Dashboard",
  description: "Dashboard App For Creating Offers",
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const getCurrentUser = async (): Promise<User | null> => {
  return {
    id: 1,
    username: "patrik pajo",
    firstname: "Patrik",
    lastname: "Stojsavljevic",
    email: "patrik.stojsavljevic@gmail.com",
    role: 1,
    activated: 1,
  };
};

const DashboardLayout = async ({
  children,
}: DashboardLayoutProps): Promise<JSX.Element> => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <PageLoader />;
  }

  if (currentUser.activated === 0 && currentUser.role === 0) {
    return (
      <section className="container-max">
        <Nav currentUser={currentUser} />
        <div className="inner card py-[20px] px-[35px] w-full md:w-1/2 mx-auto text-center">
          <Image
            src="/icons/ico_error.svg"
            alt="error"
            width={70}
            height={70}
            className="inline-block"
          />
          <h1 className="text-2xl font-bold mb-5 text-red-500">
            Access denied!
          </h1>
          <p className="mb-3">
            You dont have access to the app, please contact your administrator
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
        <Sidebar currentUser={currentUser} />
        <section className="container-fluid">
          <Nav currentUser={currentUser} />
          {children}
        </section>
      </>
    );
  }
};

export default DashboardLayout;
