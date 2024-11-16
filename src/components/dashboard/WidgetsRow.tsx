"use client";

import React from "react";
import SmallWidget from "./SmallWidget";
import WidgetWithGraph from "./WidgetWithGraph";
import Loader from "../Loader/Loader";
import axiosInstance, { axiosPrivate } from "@/axios/axios";

interface Offer {
  status: string;
  // Add other properties as needed
}

const WidgetsRow: React.FC = () => {
  console.log(
    "AXIOS INSTANCE HEADERS AFTER LOGIN",
    axiosInstance.defaults.headers,
  );
  console.log(
    "AXIOS PRIVATE HEADERS AFTER LOGIN",
    axiosPrivate.defaults.headers,
  );
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
        doneNumber={1}
        totalNumber={10}
      />
      <SmallWidget title="Offers Pending" number={4} image="/pending.png" />
      <SmallWidget title="Rejected Offers" number={5} image="/rejected.png" />
    </div>
  );
};

export default WidgetsRow;
