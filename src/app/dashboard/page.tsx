"use client";
import PageSubheader from "@/components/PageSubheader";
import WidgetsRow from "@/components/dashboard/WidgetsRow";
import Link from "next/link";
import React from "react";
import { OffersTable } from "@/components/offers";
import { DashboardData } from "@/types";

const Dashboard = () => {
  const data: DashboardData = {
    totalOffers: 10,
    offersDone: 6,
    offersPending: 3,
    offersRejected: 1,
    lastOffers: [],
  };

  return (
    <section>
      <PageSubheader
        title={"Dashboard"}
        body={
          <div className="flex gap-4 items-center">
            <Link href={"/dashboard/article-list"} className="outline_btn">
              View Articles
            </Link>
            <Link href={"/dashboard/offers/create"} className="primary_btn">
              New offer
            </Link>
          </div>
        }
      />

      <WidgetsRow data={data} />

      <OffersTable limit={5} />
    </section>
  );
};

export default Dashboard;
