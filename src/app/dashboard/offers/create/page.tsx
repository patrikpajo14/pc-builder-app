import React from "react";
import OffersForm from "../components/OffersForm";
import PageSubheader from "@/components/PageSubheader";


const CreateOffer = () => {

  return (
    <section className="max-h-[calc(100vh - 50px)]">
      <PageSubheader title={"Create offer"} />

      <OffersForm />
    </section>
  );
};

export default CreateOffer;
