"use client";
import React, { useState } from "react";
import Button from "@/components/Button";
import ConfirmDialog from "../ConfirmDialog";
import IconButton from "../IconButton";
import Image from "next/image";
import clsx from "clsx";
import SelectActivated from "./SelectActivated";
import { User } from "@/types";

type StatusType = 0 | 1;
interface UsersTableRowProps {
  row: User;
  onDeleteRow: () => void;
  onUpdateRow: (user: User) => void;
}

const UsersTableRow: React.FC<UsersTableRowProps> = ({
  row,
  onDeleteRow,
  onUpdateRow,
}) => {
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleDelete = () => {
    setOpenConfirm(false);
    onDeleteRow();
  };

  const handleChangeStatus = (enabled: StatusType) => {
    setToggleDropdown(false);
    const user = {
      ...row,
      enabled: enabled === 1,
    };
    console.log("USER CHANGE>d", user);
    onUpdateRow(user);
  };

  return (
    <tr>
      <td align="left">{row.id}</td>

      <td align="left" style={{ minWidth: "160px" }}>
        {row.firstname} {row.lastname}
      </td>

      <td align="left" style={{ minWidth: "120px" }}>
        {row.role}
      </td>

      <td align="left" style={{ minWidth: "140px" }}>
        {row.email}
      </td>

      <td align="left" style={{ minWidth: "100px", position: "relative" }}>
        <button
          type="button"
          onClick={() => setToggleDropdown(!toggleDropdown)}
          className={clsx(
            "px-3 py-1 rounded-lg text-[12px] font-bold capitalize cursor-pointer focus:outline-none",
            row.enabled
              ? "bg-green-200 text-green-600"
              : "bg-red-200 text-red-600",
          )}
          aria-haspopup="true"
          aria-expanded={toggleDropdown}
        >
          {row.enabled ? "Activated" : "Disabled"}
        </button>
        {toggleDropdown && <SelectActivated onClick={handleChangeStatus} />}
      </td>

      <td align="right" style={{ minWidth: "140px" }}>
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

        <ConfirmDialog
          open={openConfirm}
          onClose={handleCloseConfirm}
          title="Izbriši"
          content="Jeste li sigurni da želite obrisati?"
          action={<Button onClick={handleDelete}>Izbriši</Button>}
        />
      </td>
    </tr>
  );
};

export default UsersTableRow;
