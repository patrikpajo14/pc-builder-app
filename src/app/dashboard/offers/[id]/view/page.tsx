"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PageSubheader from "@/components/PageSubheader";
import Link from "next/link";
import Loader from "@/components/Loader/Loader";
import { format, parseISO } from "date-fns";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useFetchOfferById } from "@/queryHooks/useOffersData";
import ArticleList from "@/components/article/ArticleList";
import "./pdfExport.module.css";
import { Article } from "@/types";

const OfferView = () => {
  const params = useParams();
  const [articleList, setArticleList] = useState<Article[]>();
  const { data: offer, isPending } = useFetchOfferById(params.id);
  console.log("OFFER", offer);

  useEffect(() => {
    if (offer) {
      setArticleList([...offer?.pcs, ...offer?.customPcs]);
    }
  }, [offer]);
  const exportPDF = () => {
    const editButton = document.getElementById("editOfferButton");
    const exportPdfButton = document.getElementById("exportPdfButton");

    if (editButton) editButton.style.display = "none";
    if (exportPdfButton) exportPdfButton.style.display = "none";

    const input = document.getElementById("exportable-section");

    if (!input) {
      console.error("Exportable section not found!");
      return;
    }

    input.classList.add("pdf-export");

    html2canvas(input, { scale: 4 })
      .then((canvas) => {
        // Remove the 'pdf-export' class after capturing
        input.classList.remove("pdf-export");

        // Revert visibility of the buttons after capturing
        if (editButton) editButton.style.display = "";
        if (exportPdfButton) exportPdfButton.style.display = "";

        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        // Define page dimensions and margins
        const margin = 40; // Margin in points; adjust as needed
        const pageWidth = 842; // A4 landscape width in points
        const pageHeight = 595; // A4 landscape height in points
        const maxWidth = pageWidth - margin * 2;
        const maxHeight = pageHeight - margin * 2;
        const imgRatio = imgWidth / imgHeight;
        let finalImgWidth, finalImgHeight;
        if (imgWidth > imgHeight) {
          finalImgWidth = maxWidth;
          finalImgHeight = finalImgWidth / imgRatio;
        } else {
          finalImgHeight = maxHeight;
          finalImgWidth = finalImgHeight * imgRatio;
        }

        // Ensure image dimensions do not exceed page size
        if (finalImgWidth > maxWidth) {
          finalImgWidth = maxWidth;
          finalImgHeight = finalImgWidth / imgRatio;
        } else if (finalImgHeight > maxHeight) {
          finalImgHeight = maxHeight;
          finalImgWidth = finalImgHeight * imgRatio;
        }

        const pdf = new jsPDF({
          orientation: "landscape",
          unit: "pt",
          format: [pageWidth, pageHeight], // A4 size in landscape
        });

        const imgData = canvas.toDataURL("image/png");
        pdf.addImage(
          imgData,
          "PNG",
          margin,
          margin,
          finalImgWidth,
          finalImgHeight,
        ); // Position image with margins
        pdf.save(`offer-${params.id}.pdf`);
      })
      .catch((err) => {
        console.error("Failed to generate PDF:", err);
        input.classList.remove("pdf-export");
        if (editButton) editButton.style.display = "";
        if (exportPdfButton) exportPdfButton.style.display = "";
      });
  };

  let formattedDate = "Invalid Date";
  if (!isPending && offer && offer?.createDate) {
    try {
      formattedDate = format(parseISO(offer.createDate), "dd.MM.yyyy");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <section className="max-h-[calc(100vh - 50px)]" id="exportable-section">
        <PageSubheader
          title={`Preview offer: ${params.id}`}
          body={
            <div className="flex gap-4 items-center">
              <div>
                <p>{formattedDate && formattedDate}</p>
              </div>
              {offer?.status !== "done" && (
                <Link
                  id="editOfferButton"
                  href={`/dashboard/offers/${params.id}`}
                  className="outline_btn"
                >
                  Edit offer
                </Link>
              )}

              <button
                id="exportPdfButton"
                onClick={exportPDF}
                className="primary_btn"
              >
                Export as PDF
              </button>
            </div>
          }
        />

        {isPending ? (
          <Loader className={"min-h-[500px]"} />
        ) : (
          <div>
            <div className="mb-7">
              <p>Name: {offer?.customer_name}</p>
              <p>Phone: {offer?.phone_number}</p>
              <p>Email: {offer?.customer_email}</p>
              <p>
                Address: {offer?.customer_address}, {offer?.place?.place_name}
              </p>
              {offer?.price && (
                <p className="font-bold text-[18px]">
                  Total price: {offer?.price} €
                </p>
              )}
            </div>

            {articleList && (
              <div>
                <h2 className="mb-4 font-bold text-[20px]">Articles</h2>
                <ArticleList readOnly={true} articleList={articleList || []} />
              </div>
            )}
          </div>
        )}
      </section>
    </>
  );
};

export default OfferView;
