import React from "react";

type StatusType = "done" | "pending" | "rejected";

const status: StatusType[] = ["done", "pending", "rejected"];

interface SelectStatusProps {
  onClick: (status: StatusType) => void;
}

const SelectStatus: React.FC<SelectStatusProps> = ({ onClick }) => {
  return (
    <div className="absolute right-full top-[-50%] mt-2 origin-top-right rounded-md bg-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
      <div className="py-1">
        {status.map((item, index) => (
          <p
            key={index}
            className="block px-4 py-2 text-sm hover:bg-gray-600 cursor-pointer capitalize"
            onClick={() => {
              onClick(item);
            }}
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};

export default SelectStatus;
