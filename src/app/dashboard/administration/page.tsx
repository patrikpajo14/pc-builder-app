import PageSubheader from "@/components/PageSubheader";
import React from "react";
import AdministrationForm from "@/components/AdministrationForm";

const Administration = () => {
  return (
    <section>
      <PageSubheader title={"Administration"} />

      <div className="grid grid-cols-1 gap-2 md:gap-5">
        <AdministrationForm
          title={"Add new Case"}
          btnText={"Add case"}
          url={"/api/colors"}
        />
        <AdministrationForm
          title={"Add new Memory car"}
          btnText={"Add memory card"}
          url={"/api/articleType"}
          type={"memory"}
        />
        <AdministrationForm
          title={"Add new Motherboard"}
          btnText={"Add Motherboard"}
          url={"/api/panel"}
          type={"motherboard"}
        />
        <AdministrationForm
          title={"Add new Power supply"}
          btnText={"Add new"}
          url={"/api/blindsType"}
        />
        <AdministrationForm
          title={"Add new Processor"}
          btnText={"Add processor"}
          url={"/api/blindsType"}
          type={"processor"}
        />
        <AdministrationForm
          title={"Add new Storage"}
          btnText={"Add storage"}
          url={"/api/blindsType"}
          type={"storage"}
        />
      </div>
    </section>
  );
};

export default Administration;
