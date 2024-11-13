// src/components/Article.tsx

"use client";

import Image from "next/image";
import React, { useState } from "react";
import Button from "../Button";
import ConfirmDialog from "@/components/ConfirmDialog";
import { Article } from "@/types";

interface ArticleProps {
  openDrawer: () => void;
  article: Article;
  readOnly: boolean;
  setEdit: (value: boolean) => void;
  onSelect: (article: Article) => void;
  onDelete: () => void;
  offerItem?: boolean;
}

const Article: React.FC<ArticleProps> = ({
  openDrawer,
  article,
  readOnly,
  setEdit,
  onSelect,
  onDelete,
  offerItem = false,
}) => {
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);

  const handleEdit = () => {
    openDrawer();
    onSelect(article);
    setEdit(true);
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
      <div className="flex flex-col w-full shadow-main rounded-lg mb-4 md:flex-row">
        <div className="w-full md:w-44 border-b-gray-200 md:border-r-gray-200 border-b border-r p-4 md:p-5">
          <Image
            src={"/assets/images/window.png"}
            width={75}
            height={117}
            alt="Article Image"
            className="mx-auto"
          />
        </div>
        <div className="p-4 md:p-5 flex-1 flex gap-3 justify-between flex-wrap lg:flex-nowrap">
          {/* Article Details Section 1 */}
          <div className="w-full flex flex-wrap gap-y-1 gap-x-3 md:gap-3 lg:w-auto lg:flex-col text-sm md:text-base">
            <p>Article: {article.name}</p>
            <p>Processor: {article.processorId}</p>
            <p>Motherboard: {article.motherboardId}</p>
            <p>Graphics card: {article.graphicsCardId}</p>
          </div>

          {/* Article Details Section 2 */}
          <div className="w-full flex flex-wrap gap-y-1 gap-x-3 md:gap-3 lg:w-auto lg:flex-col text-sm md:text-base">
            <p>Memory: {article.memoryId}</p>
            <p>Storage: {article.storageId}</p>
            <p>Case: {article.caseId}</p>
          </div>

          {/* Article Details Section 3 */}
          <div className="w-full md:w-1/3 flex flex-wrap gap-y-1 gap-x-3 md:gap-3 lg:w-auto lg:flex-col text-sm md:text-base">
            <p>Power supply: {article.powerSupplyId}</p>
            <p>Price: {2000}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-between sm:justify-end lg:justify-center w-full md:w-1/2 lg:w-auto sm:flex-col text-sm md:text-base">
            {!readOnly && !offerItem && (
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
      {/* Confirmation Dialog */}
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
          <Button variant="contained" color="error" onClick={handleDelete}>
            {offerItem ? "Remove" : "Delete"}
          </Button>
        }
      />
    </>
  );
};

export default Article;
