// src/components/users/UsersTableRow.tsx

"use client";
import React, { useState } from "react";
import Button from "@/components/Button";
import ConfirmDialog from "../ConfirmDialog";
import IconButton from "../IconButton";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import clsx from "clsx";
import SelectActivated from "./SelectActivated";
import { User } from "@/types";

// Define the User interface if not already defined and imported
// You should ideally import this from a central types file

interface UsersTableRowProps {
  row: User;
  onDeleteRow: () => void;
  onEditRow?: () => void;
}

const UsersTableRow: React.FC<UsersTableRowProps> = ({
  row,
  onDeleteRow,
  onEditRow,
}) => {
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);

  // Handler to close the confirmation dialog
  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  // Handler to change the activation status
  const handleChangeStatus = (activated: number) => {
    // Implement status update logic here, e.g., API call
    // updateStatus({ id: row.id, activated });
    setToggleDropdown(false);
  };

  return (
    <tr>
      {/* User ID */}
      <td align="left">{row.id}</td>

      {/* User Name */}
      <td align="left" style={{ minWidth: "160px" }}>
        {row.name}
      </td>

      {/* User Role */}
      <td align="left" style={{ minWidth: "120px" }}>
        {row.role === 0 ? "User" : "Admin"}
      </td>

      {/* User Email */}
      <td align="left" style={{ minWidth: "140px" }}>
        {row.email}
      </td>

      {/* Activation Status */}
      <td align="left" style={{ minWidth: "100px", position: "relative" }}>
        {/* Replaced <label> with <button> for better accessibility */}
        <button
          type="button"
          onClick={() => setToggleDropdown(!toggleDropdown)}
          className={clsx(
            "px-3 py-1 rounded-lg text-[12px] font-bold capitalize cursor-pointer focus:outline-none",
            row.activated === 1
              ? "bg-green-200 text-green-600"
              : "bg-red-200 text-red-600",
          )}
          aria-haspopup="true"
          aria-expanded={toggleDropdown}
        >
          {row.activated === 1 ? "Activated" : "Disabled"}
        </button>

        {/* Dropdown for selecting activation status */}
        {toggleDropdown && <SelectActivated onClick={handleChangeStatus} />}
      </td>

      {/* Action Buttons */}
      <td align="right" style={{ minWidth: "140px" }}>
        {/* Delete Button */}
        <IconButton
          onClick={() => setOpenConfirm(true)}
          aria-label="Delete user"
        >
          <Image
            src="/icons/ico_delete.svg"
            alt="delete"
            width={20}
            height={20}
          />
        </IconButton>

        {/* Confirmation Dialog */}
        <ConfirmDialog
          open={openConfirm}
          onClose={handleCloseConfirm}
          title="Izbriši"
          content="Jeste li sigurni da želite obrisati?"
          action={
            <Button primary onClick={onDeleteRow}>
              Izbriši
            </Button>
          }
        />
      </td>
    </tr>
  );
};

export default UsersTableRow;
