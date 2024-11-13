"use client";

import React, { useState } from "react";
import clsx from "clsx";
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface SelectProps {
  label: string;
  value?: string;
  children: React.ReactNode;
  disabled?: boolean;
  name: string;
  errors?: FieldErrors<any> | undefined;
  placeholder?: string;
  register: UseFormRegister<any>;
  required?: boolean | string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  reset?: boolean;
}

const Select: React.FC<SelectProps> = ({
  label,
  value,
  children,
  disabled,
  name,
  errors,
  placeholder,
  register,
  required,
  onChange,
  reset,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>(value ?? "");

  return (
    <div className="z-[100]">
      <label className="block sm:text-[16px] text-xs font-medium text-gray-900">
        {label}
      </label>
      <div className="mt-[5px] relative">
        <select
          disabled={disabled}
          id={name}
          value={selectedValue}
          {...register(name, { required })}
          onChange={(e) => {
            if (!reset) {
              setSelectedValue(e.target.value);
            } else if (onChange) {
              onChange(e);
            }
          }}
          className={clsx(
            `
              block 
              w-full 
              rounded-[5px] 
              py-[8px]
              px-[12px]
              sm:py-[10.5px]
              sm:px-[15px]
              text-black
              border-1
              border
              bg-primary-lightred 
              border-primary-gray 
              placeholder:text-gray-400 
              focus:bg-white
              focus:outline-none
              focus:ring-transparent
              text-sm
              sm:text-md 
              capitalize
            `,
            disabled && "opacity-50 cursor-default",
          )}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {children}
        </select>
        {errors && errors[name] && (
          <label
            htmlFor={name}
            className="absolute top-[100%] right-0 text-primary-red text-sm"
          >
            {errors[name]?.message || "Error"}
          </label>
        )}
      </div>
    </div>
  );
};

export default Select;
