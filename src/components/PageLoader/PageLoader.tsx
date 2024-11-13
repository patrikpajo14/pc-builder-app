import React from "react";
import styles from "./PageLoader.module.css";

const PageLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center w-[100%] h-[100%]">
      <div className={styles.loader}>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
      </div>
    </div>
  );
};

export default PageLoader;
