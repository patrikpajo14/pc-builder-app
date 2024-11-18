"use client";

import React from "react";
import SmallWidget from "./SmallWidget";
import WidgetWithGraph from "./WidgetWithGraph";
import { DashboardData } from "@/types";
import Loader from "@/components/Loader/Loader";

interface WidgetRowProps {
  data: DashboardData;
  isPending: boolean;
}

const WidgetsRow: React.FC<WidgetRowProps> = (data, isPending) => {
  console.log("WIDGETS DATA", data?.data);
  if (isPending || !data) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-5 mb-2 md:mb-5">
        <Loader />
        <Loader />
        <Loader />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-5 mb-2 md:mb-5">
      <WidgetWithGraph
        title="Percentage of Done"
        doneNumber={data?.data.offersDone}
        totalNumber={data?.data.totalOffers}
      />
      <SmallWidget
        title="Offers Pending"
        number={data?.data.offersPending}
        image="/pending.png"
      />
      <SmallWidget
        title="Rejected Offers"
        number={data?.data.offersRejected}
        image="/rejected.png"
      />
    </div>
  );
};

export default WidgetsRow;
