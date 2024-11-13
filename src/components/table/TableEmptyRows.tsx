import React from "react";

interface TableEmptyRowsProps {
  emptyRows: number;
  height?: number;
}

const TableEmptyRows: React.FC<TableEmptyRowsProps> = ({
  emptyRows,
  height,
}) => {
  if (!emptyRows) {
    return null;
  }

  return (
    <tr
      style={{
        ...(height && {
          height: height * emptyRows,
        }),
      }}
    >
      <td className="p-0" colSpan={9} style={{ border: "unset" }} />
    </tr>
  );
};

export default TableEmptyRows;
