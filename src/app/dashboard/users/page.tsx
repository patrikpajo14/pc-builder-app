import PageSubheader from "@/components/PageSubheader";
import UsersTable from "@/components/users/UsersTable";
import React from "react";

const Offers = () => {
  return (
    <section>
      <PageSubheader title={"Users list"} />

      <UsersTable />
    </section>
  );
};

export default Offers;
