import React from "react";

interface PageSubheaderProps {
  title: string;
  body?: React.ReactNode;
}

const PageSubheader: React.FC<PageSubheaderProps> = ({ title, body }) => {
  return (
    <div className="flex justify-between items-center mb-[25px] gap-2 flex-wrap">
      <h1 className="text-[20px] md:text-[24px] font-bold">{title}</h1>
      {body}
    </div>
  );
};

export default PageSubheader;
