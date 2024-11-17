"use client";

import React from "react";
import clsx from "clsx";
import { FieldErrors } from "react-hook-form";

interface SelectProps {
  label: string;
  children: React.ReactNode;
  disabled?: boolean;
  name: string;
  error?: boolean;
  helperText?: string;
  placeholder?: string;
  required?: boolean | string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  reset?: boolean;
}

const Select: React.FC<
  SelectProps & React.SelectHTMLAttributes<HTMLSelectElement>
> = ({
  label,
  children,
  disabled,
  name,
  error,
  helperText,
  placeholder,
  required,
  onChange,
  reset,
  ...rest
}) => {
  return (
    <div className="z-[100]">
      <label
        className="block sm:text-[16px] text-xs font-medium text-white"
        htmlFor={name}
      >
        {label}
      </label>
      <div className="mt-[5px] relative">
        <select
          disabled={disabled}
          id={name}
          name={name}
          onChange={onChange}
          className={clsx(
            `
              block 
              w-full 
              rounded-[5px] 
              py-[8px]
              px-[12px]
              sm:py-[10px]
              sm:px-[15px]
              text-white
              border-1
              border
              bg-gray-500  
              border-gray-600
              placeholder:text-gray-300 
              focus:bg-gray-600
              focus:outline-none
              focus:ring-transparent
              text-sm
              sm:text-md 
              capitalize
            `,
            disabled && "opacity-50 cursor-default",
            error && "border-red-500",
          )}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {children}
        </select>
        {error && helperText && (
          <label
            htmlFor={name}
            className="absolute top-[100%] right-0 text-primary-red text-sm"
          >
            {helperText}
          </label>
        )}
      </div>
    </div>
  );
};

export default Select;
