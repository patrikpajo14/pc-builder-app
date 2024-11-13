import React from "react";
import clsx from "clsx";
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface InputProps {
  label: string;
  id: string;
  register: UseFormRegister<any>;
  required?: boolean | string;
  errors?: FieldErrors<any>;
  type?: string;
  disabled?: boolean;
  sx?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  register,
  required,
  errors,
  type = "text",
  disabled,
  sx,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="
          block
          sm:text-[16px]
          text-sm
          font-medium
          text-gray-200
        "
      >
        {label}
      </label>
      <div className="relative mt-[5px]">
        <input
          id={id}
          type={type}
          autoComplete={id}
          disabled={disabled}
          {...register(id, { required })}
          className={clsx(
            `
              block 
              w-full 
              rounded-[5px] 
              py-[7px]
              px-[12px]
              sm:py-[10px]
              sm:px-[15px]
              text-black
              border-1
              border
              bg-gray-500 
              border-gray-600
              placeholder:text-gray-400 
              focus:bg-primary-light
              focus:outline-none
              focus:ring-transparent
              focus:border-primary
              text-sm
              sm:text-md 
            `,
            sx,
            errors &&
              errors[id] &&
              "border-red-500 bg-red-50 focus:border-red-500",
            disabled && "opacity-50 cursor-default",
          )}
        />
        {errors && errors[id] && (
          <label
            htmlFor={id}
            className="absolute top-[100%] right-0 text-red text-sm"
          >
            {errors[id]?.message}
          </label>
        )}
      </div>
    </div>
  );
};

export default Input;
