"use client";

import Image from "next/image";
import React, { useState } from "react";
import Button from "../Button";
import ConfirmDialog from "@/components/ConfirmDialog";
import { Article as ArticleItem } from "@/types";
import { useAuthContext } from "@/context/auth/authContext";

interface ArticleProps {
  openDrawer?: () => void;
  article: ArticleItem;
  readOnly?: boolean;
  setEdit: () => void;
  onSelect: (article: ArticleItem) => void;
  onDelete: () => void;
  offerItem?: boolean;
}

const Article: React.FC<ArticleProps> = ({
  openDrawer,
  article,
  readOnly = false,
  setEdit,
  onSelect,
  onDelete,
  offerItem = false,
}) => {
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const { user } = useAuthContext();

  const handleEdit = () => {
    openDrawer();
    onSelect(article);
    setEdit();
  };
  const handleDelete = () => {
    setOpenConfirm(false);
    onDelete();
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  return (
    <>
      <div className="flex flex-col w-full shadow-main rounded-lg mb-4 md:flex-row bg-gray-700">
        <div className="w-full md:w-44 border-r-gray-700 border-b-gray-600 md:border-r-gray-600 md:border-b-gray-700 border-b border-r p-4 md:p-5">
          <Image
            src={"/pc-case.png"}
            width={75}
            height={117}
            alt="Article Image"
            className="mx-auto w-[100%]"
          />
        </div>
        <div className="p-4 md:p-5 flex-1 flex gap-3 justify-between flex-wrap lg:flex-nowrap">
          <div className="w-full flex flex-wrap gap-y-1 gap-x-3 md:gap-3 lg:w-auto lg:flex-col text-sm md:text-base">
            <p>Article: {article.name}</p>
            <p>Processor: {article.processor?.name}</p>
            <p>Motherboard: {article.motherboard?.name}</p>
            <p>Graphics card: {article.graphicsCard?.name}</p>
          </div>

          <div className="w-full flex flex-wrap gap-y-1 gap-x-3 md:gap-3 lg:w-auto lg:flex-col text-sm md:text-base">
            <p>Memory: {article.memory?.name}</p>
            <p>Storage: {article.storage?.name}</p>
            <p>Case: {article.caseEntity?.name}</p>
          </div>

          <div className="w-full md:w-1/3 flex flex-wrap gap-y-1 gap-x-3 md:gap-3 lg:w-auto lg:flex-col text-sm md:text-base">
            <p>Power supply: {article.powerSupply?.name}</p>
            <p>
              Price:{" "}
              {article?.price ||
                parseFloat(
                  String(
                    article.processor?.price +
                      article.motherboard?.price +
                      article.graphicsCard?.price +
                      article.memory?.price +
                      article.storage?.price +
                      article.caseEntity?.price +
                      article.powerSupply?.price || 0,
                  ),
                ).toFixed(2)}
              €
            </p>
          </div>

          <div className="flex gap-3 justify-between sm:justify-end lg:justify-center w-full md:w-1/2 lg:w-auto sm:flex-col text-sm md:text-base">
            {!readOnly && !offerItem && user?.role !== "USER" && (
              <>
                <Button
                  onClick={() => {
                    setOpenConfirm(true);
                  }}
                >
                  Delete
                </Button>
                <Button secondary={true} onClick={handleEdit}>
                  Edit
                </Button>
              </>
            )}
            {offerItem && (
              <Button
                onClick={() => {
                  setOpenConfirm(true);
                }}
              >
                Remove
              </Button>
            )}
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title={offerItem ? "Remove Article" : "Delete Article"}
        content={
          offerItem
            ? "Do you really want to remove this article from the offer?"
            : "Are you sure that you want to delete this article?"
        }
        action={
          <Button onClick={handleDelete}>
            {offerItem ? "Remove" : "Delete"}
          </Button>
        }
      />
    </>
  );
};

export default Article;
