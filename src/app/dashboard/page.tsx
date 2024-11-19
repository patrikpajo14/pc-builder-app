"use client";
import PageSubheader from "@/components/PageSubheader";
import WidgetsRow from "@/components/dashboard/WidgetsRow";
import Link from "next/link";
import React from "react";
import { OffersTable } from "@/components/offers";
import { useFetchDashboard } from "@/queryHooks/useDashboardData";
import PageLoader from "@/components/PageLoader/PageLoader";

const Dashboard = () => {
  const { data, isPending } = useFetchDashboard();

  console.log("DASHBOARD", data);

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
      {isPending && !data ? (
        <PageLoader />
      ) : (
        <>
          <WidgetsRow data={data} isPending={isPending} />

          <OffersTable limit={5} />
        </>
      )}
    </section>
  );
};

export default Dashboard;
