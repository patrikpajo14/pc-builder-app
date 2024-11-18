"use client";

import React from "react";
import PageSubheader from "@/components/PageSubheader";
import { useParams } from "next/navigation";
import { useGetOffersById } from "@/app/actions/GetOffers";
import Loader from "@/components/Loader/Loader";
import { Offer } from "@/types";
import OffersForm from "@/app/dashboard/offers/components/OffersForm";
import { useFetchOfferById } from "@/queryHooks/useOffersData";

const EditOffer: React.FC = () => {
  const params = useParams();
  const offerId = Array.isArray(params.id) ? params.id[0] : params.id;

  const { data: offer, isPending } = useFetchOfferById(offerId);
  console.log("OFFER", offer);

  return (
    <section className="max-h-[calc(100vh - 50px)]">
      <PageSubheader title="Edit offer" />
      {isPending ? (
        <>
          <Loader className="min-h-[250px]" />
          <Loader />
          <Loader />
        </>
      ) : offer ? (
        <OffersForm isEdit={true} offer={offer} />
      ) : (
        <p className="text-center text-red-500">Offer not found.</p>
      )}
    </section>
  );
};

export default EditOffer;
