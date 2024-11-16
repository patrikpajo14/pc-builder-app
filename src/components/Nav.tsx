"use client";
import React, { useState } from "react";
import Avatar from "./Avatar";
import Button from "./Button";
import Image from "next/image";
import clsx from "clsx";
import { useAuthContext } from "@/context/auth/authContext";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { axiosPrivate } from "@/axios/axios";

const Nav = () => {
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);
  const { user, logoutUser } = useAuthContext();
  const router = useRouter();

  const handleLogout = () => {
    setToggleDropdown(false);
    delete axiosPrivate.defaults.headers["Authorization"];
    logoutUser();
    router.replace("/login");
    Cookies.remove("token");
  };

  return (
    <nav className="flex-col-reverse flex md:flex-row gap-3 flex-end md:items-center w-full mb-7 md:mb-16 pt-3">
      <div
        className={clsx(
          `flex justify-between w-[100%] md:w-max`,
          user?.activated === 1 && "justify-between",
          user?.activated === 0 && "flex-end",
        )}
      >
        {user?.activated !== 0 && (
          <button
            className="block md:hidden"
            onClick={() => {
              document.body.classList.toggle("no-scroll");
              document.body.classList.toggle("sidebar-open");
            }}
          >
            <Image
              src="/icons/ico_menu.svg"
              width={25}
              height={25}
              alt="menu"
            />
          </button>
        )}
        {user && (
          <div className="flex relative gap-3 items-center">
            <p>
              {user?.firstname} {user?.lastname}
            </p>
            <Avatar
              user={user}
              onClick={() => {
                setToggleDropdown(!toggleDropdown);
              }}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Button onClick={handleLogout} fullWidth>
                  Sign Out
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
