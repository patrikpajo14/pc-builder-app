"use client";

import React from "react";
import ArticleList from "@/components/article/ArticleList";
import ArticleListHeader from "./components/ArticleListHeader";
import Loader from "@/components/Loader/Loader";
import { Article } from "@/types";

const ArticleListPage: React.FC = () => {
  /*if (isError) {
    // Optionally, display the error message
    return <div>Error fetching data: {error?.message || "Unknown error"}</div>;
  }*/

  const isLoading = false;
  const data = [];

  return (
    <section>
      <ArticleListHeader />
      {isLoading ? (
        <div className="flex flex-col space-y-4">
          {/* Display multiple loaders for better visual feedback */}
          <Loader />
          <Loader />
          <Loader />
          <Loader />
          <Loader />
          <Loader />
        </div>
      ) : (
        <>
          {data && data.length < 1 ? (
            <div className="text-center text-2xl font-bold py-10 md:py-20">
              List is Empty
            </div>
          ) : (
            <ArticleList articleList={data} />
          )}
        </>
      )}
    </section>
  );
};

export default ArticleListPage;
