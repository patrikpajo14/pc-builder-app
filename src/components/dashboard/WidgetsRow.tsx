"use client";

import React from "react";
import SmallWidget from "./SmallWidget";
import WidgetWithGraph from "./WidgetWithGraph";
import { DashboardData } from "@/types";

interface WidgetRowProps {
  data: DashboardData;
}

const WidgetsRow: React.FC<WidgetRowProps> = (data) => {
  /*const { data: offers, isLoading } = useGetOffers();

  if (isLoading || !offers) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-5 mb-2 md:mb-5">
        <Loader />
        <Loader />
        <Loader />
      </div>
    );
  }

  const offersDone = offers.filter((offer: Offer) => offer.status === "done");
  const offersPending = offers.filter(
    (offer: Offer) => offer.status === "pending",
  );
  const offersRejected = offers.filter(
    (offer: Offer) => offer.status === "rejected",
  );*/

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-5 mb-2 md:mb-5">
      <WidgetWithGraph
        title="Percentage of Done"
        doneNumber={data.offersDone}
        totalNumber={data.totalOffers}
      />
      <SmallWidget
        title="Offers Pending"
        number={data.offersPending}
        image="/pending.png"
      />
      <SmallWidget
        title="Rejected Offers"
        number={data.offersRejected}
        image="/rejected.png"
      />
    </div>
  );
};

export default WidgetsRow;
