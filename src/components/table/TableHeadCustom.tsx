import React from "react";

interface HeadCell {
  id: string;
  label: string;
  align?: "left" | "right" | "center" | "justify" | "char";
  width?: number | string;
  minWidth?: number | string;
}

interface TableHeadCustomProps {
  headLabel: HeadCell[];
  sx?: string;
}

const TableHeadCustom: React.FC<TableHeadCustomProps> = ({ headLabel, sx }) => {
  return (
    <thead className={sx}>
      <tr>
        {headLabel.map((headCell) => (
          <th
            key={headCell.id}
            align={headCell.align || "left"}
            style={{ width: headCell.width, minWidth: headCell.minWidth }}
          >
            {headCell.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeadCustom;
