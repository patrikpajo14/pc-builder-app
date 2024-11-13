import React from "react";

interface TableResponsiveWrapProps {
  children: React.ReactNode;
}

const TableResponsiveWrap: React.FC<TableResponsiveWrapProps> = ({
  children,
}) => {
  return <div className="overflow-x-auto w-[100%]">{children}</div>;
};

export default TableResponsiveWrap;
