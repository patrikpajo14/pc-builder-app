"use client"; // Ensure this directive is present if using Next.js 13 App Router

import React from "react";
import PageSubheader from "@/components/PageSubheader";
import { OffersTable } from "@/components/offers";
import Link from "next/link";

const Offers: React.FC = () => {
  return (
    <section>
      <PageSubheader
        title="Offers list"
        body={
          <Link href="/dashboard/offers/create" className="primary_btn">
            New offer
          </Link>
        }
      />

      <OffersTable />
    </section>
  );
};

export default Offers;
