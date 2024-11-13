"use client";

import React, { useState } from "react";
import Button from "@/components/Button";
import CustomDrawer from "@/components/CustomDrawer";
import PageSubheader from "@/components/PageSubheader";
import ArticleForm from "@/components/article/ArticleForm";

const ArticleListHeader: React.FC = () => {
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
        body={<Button onClick={handleOpenDrawer}>New Article</Button>}
      />

      <CustomDrawer
        isOpened={openDrawer}
        onClose={handleCloseDrawer}
        title="Create Article"
      >
        test
        {/* Article Form Inside the Drawer
        <ArticleForm closeEvent={handleCloseDrawer} />*/}
      </CustomDrawer>
    </>
  );
};

export default ArticleListHeader;
