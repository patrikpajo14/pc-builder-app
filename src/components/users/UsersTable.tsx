// src/components/users/UsersTable.tsx

"use client";
import React from "react";
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TableResponsiveWrap,
} from "@/components/table";
import UsersTableRow from "./UsersTableRow";
import { User } from "@/types";
import { dummyUsers } from "../../../public/data/dummyData"; // Ensure this path is correct based on your project structure

// Define the structure of table headers
interface TableHeadItem {
  id: string;
  label: string;
  align: "left" | "right" | "center";
}

// Define the table headers with proper typing
const TABLE_HEAD: TableHeadItem[] = [
  { id: "id", label: "ID", align: "left" },
  { id: "customerName", label: "User Name", align: "left" },
  { id: "role", label: "Role", align: "left" },
  { id: "email", label: "Email", align: "left" },
  { id: "status", label: "Status", align: "left" },
  { id: "options", label: "Options", align: "right" }, // Changed id from "" to "options" for clarity
];

const UsersTable: React.FC = () => {
  // Handler to delete a user by ID
  const handleDeleteRow = (id: number) => {
    //deleteUser(id);
  };

  const users = dummyUsers;

  return (
    <div className="card">
      <div className="p-4">
        <h2 className="text-[18px] font-bold">Users</h2>
      </div>
      <TableResponsiveWrap>
        <table className="min-w-[800px]">
          <TableHeadCustom
            headLabel={TABLE_HEAD}
            rowCount={users?.length ?? 0}
          />

          <tbody>
            {/* Render user rows if not loading and no error */}
            {users?.map((row: User) => (
              <UsersTableRow
                key={row.id}
                row={row}
                onDeleteRow={() => handleDeleteRow(row.id)}
                // onEditRow={() => handleEditRow(row.id)} // Uncomment and implement if needed
              />
            ))}

            {/* Render empty rows to maintain table height */}
            <TableEmptyRows
              emptyRows={users?.length > 0 ? Math.max(5 - users.length, 0) : 0}
              height={users?.length < 5 ? 60 : 0}
            />

            {/* Render no data message */}
            {/*<TableNoData
              isNotFound={!users || users.length === 0)}
              title={isLoading ? "Table is loading..." : "No data in table"}
            />*/}
          </tbody>
        </table>
      </TableResponsiveWrap>
    </div>
  );
};

export default UsersTable;
