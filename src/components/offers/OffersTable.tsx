"use client";
import React, { useEffect, useState, ChangeEvent } from "react";
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TableResponsiveWrap,
} from "@/components/table";
import { useRouter } from "next/navigation";
import OffersTableRow from "./OffersTableRow";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { Offer } from "@/types";
import useDebounce from "@/hooks/useDebounce";

interface TableHead {
  id: string;
  label: string;
  align: "left" | "right" | "center" | "justify" | "char";
}

const TABLE_HEAD: TableHead[] = [
  { id: "id", label: "ID", align: "left" },
  { id: "customerName", label: "Customer name", align: "left" },
  { id: "date", label: "Create Date", align: "left" },
  { id: "address", label: "Address", align: "left" },
  { id: "status", label: "Status", align: "left" },
  { id: "price", label: "Price", align: "left" },
  { id: "", label: "Options", align: "right" },
];

// Create dummy data for offers
const offers: Offer[] = [
  {
    id: 1,
    create_date: "2023-10-01",
    customer_name: "John Doe",
    customer_address: "123 Main St",
    place: {
      place_name: "New York",
    },
    status: "pending",
    total: 1000,
  },
  {
    id: 2,
    create_date: "2023-10-02",
    customer_name: "Jane Smith",
    customer_address: "456 Elm St",
    place: {
      place_name: "Los Angeles",
    },
    status: "done",
    total: 1500,
  },
  // Add more dummy offers as needed
];

// Set isLoading to false since we're using dummy data
const isLoading = false;

interface OffersTableProps {
  limit?: number;
}

const OffersTable: React.FC<OffersTableProps> = ({ limit }) => {
  const { push } = useRouter();
  const [offersList, setOffersList] = useState<Offer[]>(offers);
  const [searchValue, setSearchValue] = useState<string>("");
  const [filterName, setFilterName] = useState<string>("");
  const debouncedSearchValue = useDebounce(searchValue, 500);

  // Comment out the data fetching hooks
  // const { data: offers, isLoading } = useGetOffers();
  // const { mutate: deleteOffer } = useDeleteOffer();

  useEffect(() => {
    if (searchValue.length > 3) {
      setFilterName(debouncedSearchValue);
    } else {
      setFilterName("");
    }
  }, [debouncedSearchValue, searchValue]);

  useEffect(() => {
    // Update offersList when offers change (if using fetched data)
    setOffersList(offers);
  }, [offers]);

  const handleSearchFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    handleFilterList(event.target.value);
  };

  const handleFilterList = (value: string) => {
    if (offers) {
      const lowerValue = value.toLowerCase();

      const exactMatch = offers.find(
        (offer) =>
          offer.customer_name &&
          offer.customer_name.toLowerCase() === lowerValue,
      );

      const partialMatches = offers.filter(
        (offer) =>
          offer.customer_name &&
          offer.customer_name.toLowerCase().includes(lowerValue),
      );

      const vagueMatches = offers.filter((offer) =>
        lowerValue
          .split(" ")
          .every((w) =>
            offer.customer_name
              ? offer.customer_name.toLowerCase().includes(w)
              : false,
          ),
      );

      const tmpList = Array.from(
        new Set([exactMatch, ...partialMatches, ...vagueMatches]),
      ).filter((offer): offer is Offer => offer !== undefined);

      setOffersList(tmpList);
    }
  };

  // Implement delete functionality
  const handleDeleteRow = (id: number) => {
    // Remove the offer from the offersList
    setOffersList((prevOffers) =>
      prevOffers.filter((offer) => offer.id !== id),
    );
  };

  const handleEditRow = (id: number) => {
    push(`/dashboard/offers/${id}`);
  };

  const handleViewRow = (id: number) => {
    push(`/dashboard/offers/${id}/view`);
  };

  return (
    <div className="card">
      <div className="p-4 flex items-center gap-5">
        <h2 className="text-[18px] font-bold">Offers list</h2>
        <div className="relative">
          <input
            type="text"
            name="search"
            value={searchValue}
            placeholder="Search..."
            onChange={handleSearchFilterChange}
            onKeyUp={handleSearchFilterChange}
            className={clsx(
              `
              block 
              w-full 
              rounded-[5px] 
              py-[5px]
              px-[12px]
              sm:py-[7px]
              sm:px-[15px]
              text-black
              border-1
              border
              bg-gray-500 
              border-gray-600 
              placeholder:text-gray-300 
              focus:bg-white
              focus:outline-none
              focus:ring-transparent
              text-sm
              sm:text-md 
            `,
            )}
          />
        </div>
      </div>
      <TableResponsiveWrap>
        <table className="min-w-[800px]">
          <TableHeadCustom headLabel={TABLE_HEAD} />
          <tbody>
            {!isLoading && !limit
              ? offersList?.map((row) => (
                  <OffersTableRow
                    key={row.id}
                    row={row}
                    onDeleteRow={() => handleDeleteRow(row.id)}
                    onEditRow={() => handleEditRow(row.id)}
                    onViewRow={() => handleViewRow(row.id)}
                  />
                ))
              : offersList
                  ?.slice(0, limit)
                  ?.map((row) => (
                    <OffersTableRow
                      key={row.id}
                      row={row}
                      onDeleteRow={() => handleDeleteRow(row.id)}
                      onEditRow={() => handleEditRow(row.id)}
                      onViewRow={() => handleViewRow(row.id)}
                    />
                  ))}
            <TableEmptyRows
              emptyRows={
                !isLoading && offersList?.length && offersList.length < 5
                  ? 5 - offersList.length
                  : 0
              }
              height={
                !isLoading && offersList?.length && offersList.length < 5
                  ? 60
                  : 0
              }
            />
            <TableNoData
              isNotFound={offersList?.length === 0 || offersList === undefined}
              title={isLoading ? "Table is loading..." : "No data in table"}
            />
          </tbody>
        </table>
      </TableResponsiveWrap>
      {limit && (
        <div className="p-4 flex justify-end">
          <div className="flex gap-2">
            <Link href="/dashboard/offers" className="text-sm">
              View all
            </Link>
            <Image
              src="/icons/ico_arrow.svg"
              alt="arrow"
              width={12}
              height={12}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default OffersTable;
