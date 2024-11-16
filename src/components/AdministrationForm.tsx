"use client";

import React, { useState } from "react";
import Input from "./forms/Input";
import Button from "./Button";
import { toast } from "react-hot-toast";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { axiosPrivate } from "@/axios/axios";

interface AdministrationFormData {
  name: string;
  manufacturer: string;
  price: number;
  specifications: string;
  capacity?: number;
  cores?: number;
  clockSpeed?: number;
  socket?: string;
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
    price: Yup.number()
      .required("Required")
      .typeError("Price must be a number"),
    specifications: Yup.string().required("Required"),
    capacity:
      type === "memory" || type === "storage"
        ? Yup.number()
            .required("Required")
            .typeError("Capacity must be a number")
        : Yup.number().notRequired(),
    socket:
      type === "motherboard" || type === "processor"
        ? Yup.string().required("Required")
        : Yup.string().notRequired(),
    cores:
      type === "processor"
        ? Yup.number().required("Required").typeError("Cores must be a number")
        : Yup.number().notRequired(),
    clockSpeed:
      type === "processor"
        ? Yup.number()
            .required("Required")
            .typeError("Clock Speed must be a number")
        : Yup.number().notRequired(),
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
    console.log("ON SUBMIT");
    try {
      setIsLoading(true);
      console.log("SUBMIT DATA", data);
      const base = {
        name: data.name,
        manufacturer: data.manufacturer,
        price: data.price,
        specifications: data.specifications,
      };

      let body;
      if (type === "memory" || type === "storage") {
        body = { ...base, capacity: data.capacity };
      } else if (type === "motherboard") {
        body = { ...base, socket: data.socket };
      } else if (type === "processor") {
        body = {
          ...base,
          socket: data.socket,
          clockSpeed: data.clockSpeed,
          cores: data.cores,
        };
      } else {
        body = base;
      }

      console.log("BODY", body, axiosPrivate.defaults.headers);

      const response = await axiosPrivate.post(url, body);
      console.log("RESPONSE ADMIN FDORM", response);

      if (response.status === 200 || response.status === 201) {
        toast.success("Successfully created!");
        reset();
      } else {
        toast.error("Creation failed!");
      }
    } catch (error: any) {
      toast.error(error?.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card p-5">
      <h2 className="text-lg font-bold mb-3">{title}</h2>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
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
            {(type === "storage" || type === "memory") && (
              <Input
                disabled={isLoading}
                errors={errors}
                required
                register={register}
                id="capacity"
                type={"number"}
                label={"Capacity"}
              />
            )}
            {(type === "processor" || type === "motherboard") && (
              <Input
                disabled={isLoading}
                errors={errors}
                required
                register={register}
                id="socket"
                label={"Socket"}
              />
            )}
          </div>
          <div className="mt-6">
            <Button disabled={isLoading} fullWidth type="submit">
              {btnText}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AdministrationForm;
