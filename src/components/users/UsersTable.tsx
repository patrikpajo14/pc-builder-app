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
import {
  useDeleteUser,
  useFetchUsers,
  useUpdateUser,
} from "@/queryHooks/useUsersData";

interface TableHeadItem {
  id: string;
  label: string;
  align: "left" | "right" | "center";
}

const TABLE_HEAD: TableHeadItem[] = [
  { id: "id", label: "ID", align: "left" },
  { id: "customerName", label: "User Name", align: "left" },
  { id: "role", label: "Role", align: "left" },
  { id: "email", label: "Email", align: "left" },
  { id: "status", label: "Status", align: "left" },
  { id: "options", label: "Options", align: "right" },
];

const UsersTable: React.FC = () => {
  const { data: users, isLoading } = useFetchUsers();
  const { mutate: deleteUser } = useDeleteUser();
  const { mutate: updateUser } = useUpdateUser();

  const handleDeleteRow = (id: number) => {
    deleteUser(id);
  };

  const handleUpdateRow = (user: User) => {
    updateUser(user);
  };

  console.log("FREINDS DATA", users);

  return (
    <div className="card">
      <div className="p-4">
        <h2 className="text-[18px] font-bold">Users</h2>
      </div>
      <TableResponsiveWrap>
        <table className="min-w-[800px]">
          <TableHeadCustom headLabel={TABLE_HEAD} />

          <tbody>
            {!isLoading &&
              users?.map((row: User) => (
                <UsersTableRow
                  key={row.id}
                  row={row}
                  onDeleteRow={() => handleDeleteRow(row.id)}
                  onUpdateRow={handleUpdateRow}
                />
              ))}

            <TableEmptyRows
              emptyRows={users?.length > 0 ? Math.max(5 - users.length, 0) : 0}
              height={users?.length < 5 ? 60 : 0}
            />

            <TableNoData
              isNotFound={!users || users.length === 0}
              title={isLoading ? "Table is loading..." : "No data in table"}
            />
          </tbody>
        </table>
      </TableResponsiveWrap>
    </div>
  );
};

export default UsersTable;
