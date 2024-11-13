"use client";

import React from "react";
import PageSubheader from "@/components/PageSubheader";
import { useParams } from "next/navigation";
import { useGetOffersById } from "@/app/actions/GetOffers";
import Loader from "@/components/Loader/Loader";
import { Offer } from "@/types";
import OffersForm from "@/app/dashboard/offers/components/OffersForm";

export const dummyOffer: Offer = {
  id: 1,
  create_date: "2024-04-25T10:30:00Z",
  customer_name: "John Doe",
  customer_address: "123 Main Street, Springfield, USA",
  place: {
    city: "Springfield",
    country: "USA",
  },
  status: "pending",
  total: 1500.0,
  description: "Offer for a custom PC build with high-end components.",
  items: [
    {
      id: 101,
      name: "Intel Core i9-12900K Processor",
      quantity: 1,
      price: 589.99,
    },
    {
      id: 102,
      name: "ASUS ROG Strix Z690-E Motherboard",
      quantity: 1,
      price: 499.99,
    },
    {
      id: 103,
      name: "NVIDIA GeForce RTX 3080 Graphics Card",
      quantity: 1,
      price: 699.99,
    },
    {
      id: 104,
      name: "Corsair Vengeance LPX 16GB DDR4 Memory",
      quantity: 2,
      price: 89.99,
    },
  ],
};

const EditOffer: React.FC = () => {
  const params = useParams();
  const offerId = Array.isArray(params.id) ? params.id[0] : params.id;

  // Handle cases where offerId might be undefined
  if (!offerId || typeof offerId !== "string") {
    return (
      <section className="max-h-[calc(100vh - 50px)]">
        <PageSubheader title="Edit offer" />
        <p className="text-center text-red-500">Invalid offer ID.</p>
      </section>
    );
  }

  const offer = dummyOffer;

  return (
    <section className="max-h-[calc(100vh - 50px)]">
      <PageSubheader title="Edit offer" />

      {/*{isLoading ? (
        <>
          <Loader sx="min-h-[250px]" />
          <Loader />
          <Loader />
        </>
      ) : */}
      {offer ? (
        <OffersForm isEdit={true} offer={offer} />
      ) : (
        <p className="text-center text-red-500">Offer not found.</p>
      )}
    </section>
  );
};

export default EditOffer;
