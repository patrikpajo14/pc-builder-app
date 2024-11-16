"use client";

import React from "react";
import ArticleList from "@/components/article/ArticleList";
import ArticleListHeader from "./components/ArticleListHeader";
import Loader from "@/components/Loader/Loader";
import { useFetchArticles } from "@/queryHooks/useArticleData";

const ArticleListPage: React.FC = () => {
  const { data, isLoading, isError, error } = useFetchArticles();

  if (isError) {
    return <div>Error fetching data: {error?.message || "Unknown error"}</div>;
  }

  console.log("ARTICLE LIST", data);

  return (
    <section>
      <ArticleListHeader />
      {isLoading ? (
        <div className="flex flex-col space-y-4">
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
