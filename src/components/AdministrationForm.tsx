// src/components/AdministrationForm.tsx

"use client";

import React, { useState } from "react";
import Input from "./forms/Input";
import Button from "./Button";
import { toast } from "react-hot-toast";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios, { AxiosResponse } from "axios";

// Define the form data interface
interface AdministrationFormData {
  name: string;
  manufacturer: string;
  price: number;
  specifications: string;
  capacity: number;
  cores: number;
  clockSpeed: number;
  socket: string;
}

interface AdministrationFormProps {
  title: string;
  btnText: string;
  url: string;
  type?: string;
}

const AdministrationForm: React.FC<AdministrationFormProps> = ({
  title,
  btnText,
  url,
  type,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const AdministrationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    manufacturer: Yup.string().required("Required"),
    price: Yup.number().required("Required"),
    specifications: Yup.string().required("Required"),
    capacity:
      type === "memory" || type === "storage"
        ? Yup.number().required("Required")
        : Yup.number(),
    socket:
      type === "motherboard" || type === "processor"
        ? Yup.string().required("Required")
        : Yup.string(),
    cores:
      type === "processor" ? Yup.number().required("Required") : Yup.number(),
    clockSpeed:
      type === "processor" ? Yup.number().required("Required") : Yup.number(),
  });

  const defaultValues: AdministrationFormData = {
    name: "",
    manufacturer: "",
    price: 0,
    specifications: "",
    capacity: 0,
    cores: 0,
    clockSpeed: 0,
    socket: "",
  };

  const methods = useForm<AdministrationFormData>({
    resolver: yupResolver(AdministrationSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<AdministrationFormData> = async (data) => {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      const response: AxiosResponse = await axios.post(url, data);

      if (response.status === 200) {
        toast.success("Successfully created!");
        reset();
      }
    } catch (error: any) {
      // Handle axios errors with proper typing
      if (axios.isAxiosError(error)) {
        // Access error response safely
        toast.error(error.response?.data?.message || "An error occurred.");
      } else {
        toast.error(error?.message || "An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card p-5">
      <h2 className="text-lg font-bold mb-3">{title}</h2>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            disabled={isLoading}
            errors={errors}
            required
            register={register}
            id="name"
            label={"Name"}
          />
          <Input
            disabled={isLoading}
            errors={errors}
            required
            register={register}
            id="manufacturer"
            label={"Manufacturer"}
          />
          <Input
            disabled={isLoading}
            errors={errors}
            required
            register={register}
            id="price"
            type={"number"}
            label={"Price"}
          />
          <Input
            disabled={isLoading}
            errors={errors}
            required
            register={register}
            id="specifications"
            label={"Specifications"}
          />
          {type === "processor" && (
            <>
              <Input
                disabled={isLoading}
                errors={errors}
                required
                register={register}
                id="cores"
                type={"number"}
                label={"Cores"}
              />
              <Input
                disabled={isLoading}
                errors={errors}
                required
                register={register}
                id="clockSpeed"
                type={"number"}
                label={"Clock speed"}
              />
            </>
          )}
          {type === "storage" ||
            (type === "memory" && (
              <Input
                disabled={isLoading}
                errors={errors}
                required
                register={register}
                id="capacity"
                type={"number"}
                label={"Capacity"}
              />
            ))}
          {type === "processor" ||
            (type === "motherboard" && (
              <Input
                disabled={isLoading}
                errors={errors}
                required
                register={register}
                id="socket"
                label={"Socket"}
              />
            ))}
        </div>
        <div className="mt-6">
          <Button disabled={isLoading} fullWidth type="submit">
            {btnText}
          </Button>
        </div>
      </FormProvider>
    </div>
  );
};

export default AdministrationForm;
