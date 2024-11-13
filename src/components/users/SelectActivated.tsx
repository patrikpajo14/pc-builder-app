// src/components/SelectActivated.tsx

import React from "react";

// Define a type for the status values
type StatusType = 0 | 1;

// Define the props interface
interface SelectActivatedProps {
  onClick: (status: StatusType) => void;
}

// Define a constant array with status options and their labels
const statusOptions: { value: StatusType; label: string }[] = [
  { value: 1, label: "Activated" },
  { value: 0, label: "Disabled" },
];

const SelectActivated: React.FC<SelectActivatedProps> = ({ onClick }) => {
  return (
    <div className="absolute right-full top-[-50%] mt-2 origin-top-right rounded-md bg-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
      <div className="py-1">
        {statusOptions.map((item) => (
          <button
            key={item.value}
            type="button"
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-600 cursor-pointer capitalize"
            onClick={() => onClick(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectActivated;
