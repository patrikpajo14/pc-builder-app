"use client";

import React, { useEffect, useMemo, useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import Button from "@/components/Button";
import Input from "@/components/forms/Input";
import Select from "@/components/forms/Select";

import Loader from "@/components/Loader/Loader";
import {
  Article,
  Case,
  GraphicsCard,
  Memory,
  Motherboard,
  PowerSupply,
  Processor,
} from "@/types";

// src/data/dummyFormParams.ts

import { FormParams } from "@/types";

export const dummyFormParams: FormParams = {
  processors: [
    {
      id: 1,
      name: "Intel Core i9-12900K",
      manufacturer: "Intel",
      price: 589.99,
      specifications: "16-Core (8P+8E) Intel Core i9-12900K Processor",
      cores: 16,
      clockSpeed: 3.2,
      socket: "LGA1700",
    },
    {
      id: 2,
      name: "AMD Ryzen 9 5950X",
      manufacturer: "AMD",
      price: 799.99,
      specifications: "16-Core, 32-Thread Unlocked Desktop Processor",
      cores: 16,
      clockSpeed: 3.4,
      socket: "AM4",
    },
    // Add more processors as needed
  ],
  motherboards: [
    {
      id: 1,
      name: "ASUS ROG Strix Z690-E",
      manufacturer: "ASUS",
      price: 549.99,
      specifications: "Intel Z690 ATX Gaming Motherboard with PCIe 5.0",
      socket: "LGA1700",
    },
    {
      id: 2,
      name: "MSI MPG X570 GAMING EDGE WIFI",
      manufacturer: "MSI",
      price: 299.99,
      specifications: "AMD X570 ATX Gaming Motherboard with WiFi 6",
      socket: "AM4",
    },
    // Add more motherboards as needed
  ],
  graphicsCards: [
    {
      id: 1,
      name: "NVIDIA GeForce RTX 3080",
      manufacturer: "NVIDIA",
      price: 699.99,
      specifications: "10GB GDDR6X Graphics Card with Ray Tracing",
    },
    {
      id: 2,
      name: "AMD Radeon RX 6800 XT",
      manufacturer: "AMD",
      price: 649.99,
      specifications: "16GB GDDR6 Graphics Card with Ray Tracing",
    },
    // Add more graphics cards as needed
  ],
  memories: [
    {
      id: 1,
      name: "Corsair Vengeance LPX",
      manufacturer: "Corsair",
      price: 119.99,
      specifications: "16GB (2x8GB) DDR4 DRAM 3200MHz",
      capacity: 16,
    },
    {
      id: 2,
      name: "G.Skill Trident Z RGB",
      manufacturer: "G.Skill",
      price: 199.99,
      specifications: "32GB (2x16GB) DDR4 DRAM 3600MHz",
      capacity: 32,
    },
    // Add more memory modules as needed
  ],
  storages: [
    {
      id: 1,
      name: "Samsung 970 EVO Plus",
      manufacturer: "Samsung",
      price: 149.99,
      specifications: "1TB NVMe M.2 SSD",
      capacity: 1000,
    },
    {
      id: 2,
      name: "Western Digital Black SN850",
      manufacturer: "Western Digital",
      price: 179.99,
      specifications: "2TB NVMe M.2 SSD",
      capacity: 2000,
    },
    // Add more storage devices as needed
  ],
  cases: [
    {
      id: 1,
      name: "NZXT H510",
      manufacturer: "NZXT",
      price: 69.99,
      specifications: "Mid-Tower ATX Case with Tempered Glass Side Panel",
    },
    {
      id: 2,
      name: "Corsair 4000D Airflow",
      manufacturer: "Corsair",
      price: 94.99,
      specifications: "Mid-Tower ATX Case with High Airflow",
    },
    // Add more cases as needed
  ],
  powerSupplys: [
    {
      id: 1,
      name: "Corsair RM750x",
      manufacturer: "Corsair",
      price: 129.99,
      specifications: "750W 80 PLUS Gold Modular Power Supply",
    },
    {
      id: 2,
      name: "EVGA SuperNOVA 650 G5",
      manufacturer: "EVGA",
      price: 119.99,
      specifications: "650W 80 PLUS Gold Fully Modular Power Supply",
    },
    // Add more power supplies as needed
  ],
};

interface ArticleFormProps {
  isEdit?: boolean;
  forOffer?: boolean;
  article?: Article;
  createCustomArticle?: (article: Article) => void;
}

interface ArticleFormData {
  processorId: string;
  motherboardId: string;
  graphicsCardId: string;
  memoryId?: string;
  storageId?: string;
  caseId?: string;
  price?: string;
  powerSupplyId?: number;
}

const ArticleForm: React.FC<ArticleFormProps> = ({
  isEdit = false,
  forOffer = false,
  article,
  createCustomArticle,
}) => {
  const formParams = dummyFormParams;
  const [loading, setLoading] = useState<boolean>(false);

  const ArticleSchema: Yup.SchemaOf<ArticleFormData> = Yup.object().shape({
    processorId: Yup.string().required("Required"),
    motherboardId: Yup.string().required("Required"),
    graphicsCardId: Yup.string().required("Required"),
    memoryId: Yup.string().required("Required"),
    storageId: Yup.number().required("Required").positive("Must be positive"),
    caseId: Yup.string().required("Required"),
    powerSupplyId: Yup.number()
      .required("Required")
      .positive("Must be positive"),
    price: Yup.string().required("Required"),
  });

  const defaultValues: ArticleFormData = useMemo(
    () => ({
      processorId: article?.processorId?.toString() || "",
      motherboardId: article?.motherboardId?.toString() || "",
      graphicsCardId: article?.graphicsCardId?.toString() || "",
      memoryId: article?.memoryId || "",
      storageId: article?.storageId || "",
      caseId: article?.caseId?.toString() || "",
      powerSupplyId: article?.powerSupplyId || 0,
      price: 0,
    }),
    [article],
  );

  const methods = useForm<ArticleFormData>({
    resolver: yupResolver(ArticleSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<ArticleFormData> = async (data) => {
    /*if (!forOffer) {
      try {
        setLoading(true);
        if (isEdit && article) {
          updateArticleMutate({ id: article.id, body: data });
        } else {
          addArticleMutate(data);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        // Optionally, set an error state here to display to the user
      } finally {
        setLoading(false);
        reset();
      }
    } else {
      if (!idLoading && formParams && objectId) {
        const id = objectId;
        const type = formParams.types.find(
          (type) => type.id === Number(data.processorId),
        );
        const panel = formParams.panels.find(
          (panel) => panel.id === Number(data.motherboardId),
        );
        const color = formParams.colors.find(
          (color) => color.id === Number(data.graphicsCardId),
        );
        const blinds = formParams.blindsTypes.find((blinds) => {
          if (data.caseId === "") {
            return blinds.name === "none";
          }
          return blinds.id === Number(data.caseId);
        });

        if (!type || !panel || !color) {
          console.error("Missing form parameters");
          return;
        }

        const name = type.name;
        const customArticle: CustomArticle = {
          ...data,
          id,
          name,
          type,
          panel,
          color,
          blinds: blinds || undefined,
        };
        createCustomArticle && createCustomArticle(customArticle);
        refetchId();
        reset();
        setHaveBlinds(false);
      }
    }*/
  };

  /* if (paramsLoading || isFetching) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader />
      </div>
    );
  }*/

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-7">
          <h2 className="text-xl font-bold mb-4">Type of Article</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-5">
            <Select
              label="Processor"
              placeholder="Select processor..."
              disabled={loading}
              {...register("processorId")}
              error={!!errors.processorId}
              helperText={errors.processorId?.message}
            >
              <option value="">Select processor...</option>
              {formParams?.processors?.map((option: Processor) => (
                <option key={option.id} value={option.id || 1}>
                  {option.name}
                </option>
              ))}
            </Select>
            <Select
              label="Motherboard"
              placeholder="Select motherboard..."
              disabled={loading}
              {...register("motherboardId")}
              error={!!errors.motherboardId}
              helperText={errors.motherboardId?.message}
            >
              <option value="">Select motherboard...</option>
              {formParams?.motherboards?.map((option: Motherboard) => (
                <option key={option.id} value={option.id || 1}>
                  {option.name}
                </option>
              ))}
            </Select>

            <Select
              label="Graphics card"
              placeholder="Select graphics card..."
              disabled={loading}
              {...register("graphicsCardId")}
              error={!!errors.graphicsCardId}
              helperText={errors.graphicsCardId?.message}
            >
              <option value="">Select graphics card...</option>
              {formParams?.graphicsCards?.map((option: GraphicsCard) => (
                <option key={option.id} value={option.id || 1}>
                  {option.name}
                </option>
              ))}
            </Select>

            <Select
              label="Memory"
              placeholder="Select memory..."
              disabled={loading}
              {...register("memoryId")}
              errors={errors.memoryId}
              helperText={errors.memoryId?.message}
            >
              <option value="">Select memory...</option>
              {formParams?.memories?.map((option: Memory) => (
                <option key={option.id} value={option.id || 1}>
                  {option.name}
                </option>
              ))}
            </Select>

            <Select
              label="Storage"
              placeholder="Select storage..."
              disabled={loading}
              {...register("storageId")}
              error={!!errors.storageId}
              helperText={errors.storageId?.message}
            >
              <option value="">Select storage...</option>
              {formParams?.storages?.map((option: Storage) => (
                <option key={option.id} value={option.id || 1}>
                  {option.name}
                </option>
              ))}
            </Select>

            <Select
              label="Case"
              placeholder="Select case..."
              disabled={loading}
              {...register("caseId")}
              error={!!errors.caseId}
              helperText={errors.caseId?.message}
            >
              <option value="">Select case...</option>
              {formParams?.cases?.map((option: Case) => (
                <option key={option.id} value={option.id || 1}>
                  {option.name}
                </option>
              ))}
            </Select>

            <Select
              label="Power supply"
              placeholder="Select power supply..."
              disabled={loading}
              {...register("powerSupplyId")}
              error={!!errors.powerSupplyId}
              helperText={errors.powerSupplyId?.message}
            >
              <option value="">Select power supply...</option>
              {formParams?.powerSupplys?.map((option: PowerSupply) => (
                <option key={option.id} value={option.id || 1}>
                  {option.name}
                </option>
              ))}
            </Select>
          </div>
        </div>
        <div className="mb-7">
          <h2 className="text-xl font-bold mb-4">Price</h2>
          <div className="grid grid-cols-1">
            <Input
              disabled={loading}
              error={!!errors.price}
              helperText={errors.price?.message}
              {...register("price")}
              id="price"
              label="Price €"
              type="number"
              min={0}
              step="0.01"
            />
          </div>
          <div className="pt-6">
            <Button disabled={loading} fullWidth type="submit">
              {!isEdit ? "Create Article" : "Update Article"}
            </Button>
          </div>
        </div>
      </FormProvider>
    </>
  );
};

export default ArticleForm;
