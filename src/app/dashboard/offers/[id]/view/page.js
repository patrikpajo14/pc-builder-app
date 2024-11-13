"use client";

import React from "react";
import { useParams } from "next/navigation";
import PageSubheader from "@/components/PageSubheader";
import ArticleLIst from "@/components/article/ArticleLIst";
import Link from "next/link";
import { useGetOffersById } from "@/app/actions/GetOffers";
import Loader from "@/components/Loader/Loader";
import { format, parseISO } from "date-fns";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const OfferView = () => {
  const params = useParams();
  const { data: offer, isLoading } = useGetOffersById(params.id);

  const exportPDF = () => {
    // Find buttons by their id
    const editButton = document.getElementById('editOfferButton');
    const newOfferButton = document.getElementById('newOfferButton');
  
    if (editButton) editButton.style.display = 'none';
    if (newOfferButton) newOfferButton.style.display = 'none';
  
    const input = document.getElementById('exportable-section');
    html2canvas(input, { scale: 4 })
      .then((canvas) => {
        // Revert visibility after capturing the canvas
        if (editButton) editButton.classList.remove('hidden-in-pdf');
        if (newOfferButton) newOfferButton.classList.remove('hidden-in-pdf');

        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        // Calculate the ratio to scale the image to fit within page dimensions considering margins
        const margin = 40; // Margin in points; you can adjust this value
        const maxWidth = 842 - (margin * 2); // A4 landscape width in points minus margins on both sides
        const maxHeight = 595 - (margin * 2); // A4 landscape height in points minus margins on both sides
        const imgRatio = imgWidth / imgHeight;
        let finalImgWidth, finalImgHeight;
        if (imgWidth > imgHeight) {
          // Wide image
          finalImgWidth = maxWidth;
          finalImgHeight = finalImgWidth / imgRatio;
        } else {
          // Tall image
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
          format: [595, 842] // A4 size in landscape
        });
  
        // Fit the image within the page with margins
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', margin, margin, finalImgWidth, finalImgHeight); // Adjust position to account for margins
        pdf.save(`offer-${params.id}.pdf`);
        if (editButton) editButton.style.display = '';
        if (newOfferButton) newOfferButton.style.display = '';
      })
      .catch(err => {
        console.error('Failed to generate PDF:', err);
        // Ensure to remove class if there's an error
        if (editButton) editButton.style.display = '';
        if (newOfferButton) newOfferButton.style.display = '';
      });
  };
  
  

  return (
    <>
      <section className="max-h-[calc(100vh - 50px)]" id="exportable-section">
        <PageSubheader
          title={`Preview offer: ${params.id}`}
          body={
            <div className="flex gap-4 items-center">
              <div>
                <p>
                  {!isLoading
                    ? format(parseISO(offer?.create_date), "dd.MM.yyyy")
                    : ""}
                </p>
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
              <Link href={"/dashboard/offers/create"} id="newOfferButton" className="primary_btn">
                New offer
              </Link>
            </div>
          }
        />

        {isLoading ? (
          <Loader sx={"min-h-[500px]"} />
        ) : (
          <div>
            <div className="mb-7">
              <p>Name: {offer?.customer_name}</p>
              <p>Phone: {offer?.customer_phone_number}</p>
              <p>Email: {offer?.customer_email}</p>
              <p>
                Address: {offer?.customer_address}, {offer?.place?.place_name}
              </p>
              <p className="font-bold text-[18px]">
                Total price: {offer?.total} €
              </p>
            </div>

            <div>
              <h2 className="mb-4 font-bold text-[20px]">Articles</h2>
              <ArticleLIst readOnly={true} articleList={offer?.articleList} />
            </div>
          </div>
        )}
      </section>
      <button onClick={exportPDF} className="mt-4 primary_btn">
        Export as PDF
      </button>
    </>
  );
};

export default OfferView;