"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User } from "@/types";

interface SidebarProps {
  currentUser?: User;
}

interface SidebarItem {
  link: string;
  translate: string;
  icon: string;
}

const Sidebar: React.FC<SidebarProps> = ({ currentUser }) => {
  const pathname = usePathname();

  const sidebarItems: SidebarItem[] = [
    {
      link: "/",
      translate: "Dashboard",
      icon: "/icons/ico_dashboard.svg",
    },
    {
      link: "offers",
      translate: "Offers",
      icon: "/icons/ico_offers.svg",
    },
    {
      link: "article-list",
      translate: "Articles",
      icon: "/icons/ico_article.svg",
    },
    {
      link: "administration",
      translate: "Administration",
      icon: "/icons/ico_administration.svg",
    },
  ];

  if (currentUser?.role === 1) {
    sidebarItems.push({
      link: "users",
      translate: "Users",
      icon: "/icons/ico_users.svg",
    });
  }

  return (
    <div className="sidebar">
      <div className="inner">
        <div className="flex-between px-[17px] py-[5px] md:p-0">
          <Link href="/" className="logo">
            <Image src="/logo.svg" width={220} height={100} alt="logo" />
          </Link>
          <button
            className="block md:hidden"
            onClick={() => {
              document.body.classList.remove("no-scroll");
              document.body.classList.remove("sidebar-open");
            }}
          >
            <Image
              src="/icons/ico_close.svg"
              width={25}
              height={25}
              alt="menu"
            />
          </button>
        </div>
        <ul>
          {sidebarItems.map((item, index) => {
            const isActive = pathname.endsWith(item.link);
            return (
              <li className="relative" key={index}>
                <Link
                  href={`/dashboard/${item.link}`}
                  onClick={() => {
                    document.body.classList.remove("sidebar-open");
                  }}
                  className={isActive ? "sidebar-link active" : "sidebar-link"}
                >
                  <Image
                    src={item.icon}
                    alt={item.translate}
                    width={25}
                    height={25}
                    className="sidebar-icon"
                  />
                  {item.translate}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
