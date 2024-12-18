"use client";

import React, { useState } from "react";
import Article from "@/components/article/Article";
import CustomDrawer from "@/components/CustomDrawer";
import ArticleForm from "@/components/article/ArticleForm";
import { Article as ArticleType } from "@/types";
import { useDeleteArticle } from "@/queryHooks/useArticleData";

interface ArticleListProps {
  articleList?: ArticleType[];
  readOnly?: boolean;
}

const ArticleList: React.FC<ArticleListProps> = ({
  articleList,
  readOnly = false,
}) => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedArticle, setSelectedArticle] = useState<ArticleType | null>(
    null,
  );

  const { mutate: deleteArticle } = useDeleteArticle();

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
    setIsEdit(false);
    setSelectedArticle(null);
  };

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const handleSelectArticle = (article: ArticleType) => {
    setSelectedArticle(article);
  };

  const handleDeleteArticle = (id: number) => {
    deleteArticle(id);
  };

  const hasArticles = articleList && articleList.length > 0;

  return (
    <section>
      {!hasArticles ? (
        <div className="text-center text-2xl font-bold py-10">
          List is Empty
        </div>
      ) : (
        <>
          {articleList.map((article) => (
            <Article
              key={article.id}
              article={article}
              readOnly={readOnly}
              setEdit={() => {
                setIsEdit(true);
              }}
              onSelect={handleSelectArticle}
              onDelete={() => handleDeleteArticle(article?.id)}
              openDrawer={handleOpenDrawer}
              offerItem={false}
            />
          ))}
        </>
      )}

      <CustomDrawer
        isOpened={openDrawer}
        onClose={handleCloseDrawer}
        title={isEdit ? "Edit Article" : "Create Article"}
      >
        <ArticleForm selectedArticle={selectedArticle} isEdit={isEdit} />
      </CustomDrawer>
    </section>
  );
};

export default ArticleList;
