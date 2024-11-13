import React from "react";
import Image from "next/image";
import { User } from "@/types";

interface AvatarProps {
  user?: User;
  onClick?: () => void;
}

const Avatar: React.FC<AvatarProps> = ({ user, onClick }) => {
  return (
    <div onClick={onClick}>
      {user?.image ? (
        <Image
          src={user.image}
          width={37}
          height={37}
          alt="profile"
          className="rounded-full cursor-pointer"
        />
      ) : (
        <div className="avatar">{user?.firstname?.charAt(0)}</div>
      )}
    </div>
  );
};

export default Avatar;
