import React from "react";

interface TableNoDataProps {
  isNotFound: boolean;
  title?: string;
}

const TableNoData: React.FC<TableNoDataProps> = ({ isNotFound, title }) => {
  if (isNotFound) {
    return (
      <tr>
        <td colSpan={12}>
          <p className="flex items-center justify-center h-[160px] text-lg font-semibold">
            {title ? title : "No Data In Table"}
          </p>
        </td>
      </tr>
    );
  } else {
    return "";
  }
};

export default TableNoData;
