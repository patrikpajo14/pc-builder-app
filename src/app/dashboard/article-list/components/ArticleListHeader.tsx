"use client";

import React, { useState } from "react";
import Button from "@/components/Button";
import CustomDrawer from "@/components/CustomDrawer";
import PageSubheader from "@/components/PageSubheader";
import ArticleForm from "@/components/article/ArticleForm";
import { useAuthContext } from "@/context/auth/authContext";

const ArticleListHeader: React.FC = () => {
  const { user } = useAuthContext();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const handleCloseDrawer = (): void => {
    setOpenDrawer(false);
  };

  const handleOpenDrawer = (): void => {
    setOpenDrawer(true);
  };

  return (
    <>
      <PageSubheader
        title="Article List"
        body={
          user?.role !== "USER" ? (
            <Button onClick={handleOpenDrawer}>New Article</Button>
          ) : (
            ""
          )
        }
      />

      <CustomDrawer
        isOpened={openDrawer}
        onClose={handleCloseDrawer}
        title="Create Article"
      >
        <ArticleForm closeEvent={handleCloseDrawer} />
      </CustomDrawer>
    </>
  );
};

export default ArticleListHeader;
