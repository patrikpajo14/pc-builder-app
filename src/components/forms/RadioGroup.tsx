"use client";

import React, { useState } from "react";
import { UseFormRegister } from "react-hook-form";

interface InputOption {
  id: string;
  name: string;
  value: string;
}

interface RadioGroupProps {
  title: string;
  inputs: InputOption[];
  defaultValue: string;
  register: UseFormRegister<any>;
  handleOnChange?: () => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  title,
  inputs,
  defaultValue,
  register,
  handleOnChange,
}) => {
  const [isChecked, setChecked] = useState<string>(defaultValue);

  const onOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.value);
    if (handleOnChange) {
      try {
        handleOnChange();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h3 className="font-medium mb-2">{title}</h3>
      <div className="flex items-center justify-between gap-2">
        {inputs.map((input) => (
          <div key={input.id} className="flex items-center gap-x-2">
            <div className="bg-white dark:bg-gray-100 rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
              <input
                id={input.id}
                value={input.value}
                type="radio"
                {...register(input.name)}
                checked={isChecked === input.value}
                onChange={onOptionChange}
                className="checkbox appearance-none focus:opacity-100 focus:outline-none border rounded-full border-gray-400 absolute cursor-pointer w-full h-full checked:border-none"
              />
              <div className="check-icon hidden border-4 border-primary-red rounded-full w-full h-full z-1" />
            </div>

            <label
              htmlFor={input.id}
              className="block text-sm font-medium leading-6 text-gray-900 capitalize cursor-pointer"
            >
              {input.value}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;
