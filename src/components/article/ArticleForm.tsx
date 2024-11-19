"use client";

import React, { useMemo, useState, useEffect } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useForm,
  SubmitHandler,
  FormProvider,
  useWatch,
} from "react-hook-form";
import Button from "@/components/Button";
import Input from "@/components/forms/Input";
import Select from "@/components/forms/Select";

import {
  Article,
  Case,
  GraphicsCard,
  Memory,
  Motherboard,
  PowerSupply,
  Processor,
  Storage,
} from "@/types";
import {
  useFetchCase,
  useFetchGraphicsCards,
  useFetchMemory,
  useFetchMotherboards,
  useFetchPowerSupply,
  useFetchProcessors,
  useFetchStorage,
} from "@/queryHooks/useComponentsData";
import Loader from "@/components/Loader/Loader";
import {
  useCreateArticle,
  useUpdateArticle,
} from "@/queryHooks/useArticleData";

interface ArticleFormProps {
  isEdit?: boolean;
  forOffer?: boolean;
  selectedArticle?: Article | null;
  createCustomArticle?: (article: Article) => void;
  closeEvent?: () => void;
}

interface ArticleFormData {
  name: string;
  processor: number;
  motherboard: number;
  graphicsCard: number;
  memory: number;
  storage: number;
  caseEntity: number;
  powerSupply: number;
  price: number;
}

const ArticleForm: React.FC<ArticleFormProps> = ({
  isEdit = false,
  forOffer = false,
  selectedArticle,
  createCustomArticle,
  closeEvent,
}) => {
  const [selectedProcessor, setSelectedProcessor] = useState<Processor>();
  const [selectedMotherboard, setSelectedMotherboard] = useState<Motherboard>();
  const [selectedGraphicscard, setSelectedGraphicscard] =
    useState<GraphicsCard>();
  const [selectedMemory, setSelectedMemory] = useState<Memory>();
  const [selectedStorage, setSelectedStorage] = useState<Storage>();
  const [selectedCase, setSelectedCase] = useState<Case>();
  const [selectedPowersupply, setSelectedPowersupply] = useState<PowerSupply>();
  const [loading, setLoading] = useState<boolean>(false);
  const { data: processors } = useFetchProcessors();
  const { data: motherboards } = useFetchMotherboards();
  const { data: graphicsCards } = useFetchGraphicsCards();
  const { data: memory } = useFetchMemory();
  const { data: storages } = useFetchStorage();
  const { data: cases } = useFetchCase();
  const { data: powerSupplys, isPending } = useFetchPowerSupply();
  const { mutate: createArticle } = useCreateArticle();
  const { mutate: updateArticle } = useUpdateArticle();

  console.log("SelectedArticle", selectedArticle);

  const ArticleSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    processor: Yup.number().required("Required"),
    motherboard: Yup.number().required("Required"),
    graphicsCard: Yup.number().required("Required"),
    memory: Yup.number().required("Required"),
    storage: Yup.number().required("Required"),
    caseEntity: Yup.number().required("Required"),
    powerSupply: Yup.number().required("Required"),
    price: Yup.number().required("Required"),
  });

  const defaultValues: ArticleFormData = useMemo(
    () => ({
      name: selectedArticle?.name || "",
      processor: selectedArticle?.processor?.id || 0,
      motherboard: selectedArticle?.motherboard?.id || 0,
      graphicsCard: selectedArticle?.graphicsCard?.id || 0,
      memory: selectedArticle?.memory?.id || 0,
      storage: selectedArticle?.storage?.id || 0,
      caseEntity: selectedArticle?.caseEntity?.id || 0,
      powerSupply: selectedArticle?.powerSupply?.id || 0,
      price: selectedArticle?.price || 0,
    }),
    [selectedArticle],
  );

  const methods = useForm<ArticleFormData>({
    resolver: yupResolver(ArticleSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    register,
    setValue,
    control,
    formState: { errors },
  } = methods;

  // Watch all component fields
  const watchedFields = useWatch({
    control,
    name: [
      "processor",
      "motherboard",
      "graphicsCard",
      "memory",
      "storage",
      "caseEntity",
      "powerSupply",
    ],
  });

  useEffect(() => {
    const [
      processorId,
      motherboardId,
      graphicsCardId,
      memoryId,
      storageId,
      caseId,
      powerSupplyId,
    ] = watchedFields;

    setSelectedProcessor(
      processors?.find((p: Processor) => p.id == processorId),
    );
    setSelectedMotherboard(
      motherboards?.find((m: Motherboard) => m.id == motherboardId),
    );
    setSelectedGraphicscard(
      graphicsCards?.find((g: GraphicsCard) => g.id == graphicsCardId),
    );
    setSelectedMemory(memory?.find((m: Memory) => m.id == memoryId));
    setSelectedStorage(storages?.find((s: Storage) => s.id == storageId));
    setSelectedCase(cases?.find((c: Case) => c.id == caseId));
    setSelectedPowersupply(
      powerSupplys?.find((p: PowerSupply) => p.id == powerSupplyId),
    );

    const totalPrice =
      (selectedProcessor?.price || 0) +
      (selectedMotherboard?.price || 0) +
      (selectedGraphicscard?.price || 0) +
      (selectedMemory?.price || 0) +
      (selectedStorage?.price || 0) +
      (selectedCase?.price || 0) +
      (selectedPowersupply?.price || 0);

    console.log("TOTAL PRICE", totalPrice, selectedArticle?.price);

    setValue(
      "price",
      selectedArticle
        ? parseInt(totalPrice || selectedArticle?.price)
        : parseInt(totalPrice),
      {
        shouldValidate: true,
      },
    );
  }, [
    watchedFields,
    processors,
    motherboards,
    graphicsCards,
    memory,
    storages,
    cases,
    powerSupplys,
    setValue,
  ]);

  const onSubmit: SubmitHandler<ArticleFormData> = async (data) => {
    const completeArticle = {
      name: data?.name,
      processor: selectedProcessor || null,
      motherboard: selectedMotherboard || null,
      graphicsCard: selectedGraphicscard || null,
      memory: selectedMemory || null,
      storage: selectedStorage || null,
      caseEntity: selectedCase || null,
      powerSupply: selectedPowersupply || null,
      price: data.price,
    };

    console.log("Complete Article:", completeArticle);

    if (!forOffer) {
      try {
        setLoading(true);
        if (isEdit) {
          updateArticle({ id: selectedArticle.id, article: completeArticle });
        } else {
          createArticle(completeArticle as Article);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setLoading(false);
        reset();
      }
    } else {
      if (completeArticle) createCustomArticle(completeArticle);
      closeEvent();
      reset();
    }
  };

  const isDataLoading =
    !processors ||
    !motherboards ||
    !graphicsCards ||
    !memory ||
    !storages ||
    !cases ||
    !powerSupplys;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-7">
          <h2 className="text-xl font-bold mb-4">Article Components</h2>
          {isPending || isDataLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader />
            </div>
          ) : (
            <>
              <div className="mb-5">
                <Input
                  disabled={loading}
                  errors={errors}
                  required
                  register={register}
                  id="name"
                  label={"Pc name"}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-5">
                <Select
                  label="Processor"
                  placeholder="Select processor..."
                  disabled={loading}
                  {...register("processor")}
                  error={!!errors.processor}
                  helperText={errors.processor?.message}
                >
                  {processors?.map((option: Processor) => (
                    <option key={option.id} value={option.id}>
                      {option.name} ({option.price}€)
                    </option>
                  ))}
                </Select>
                <Select
                  label="Motherboard"
                  placeholder="Select motherboard..."
                  disabled={loading}
                  {...register("motherboard")}
                  error={!!errors.motherboard}
                  helperText={errors.motherboard?.message}
                >
                  {motherboards?.map((option: Motherboard) => (
                    <option key={option.id} value={option.id}>
                      {option.name} ({option.price}€)
                    </option>
                  ))}
                </Select>

                <Select
                  label="Graphics Card"
                  placeholder="Select graphics card..."
                  disabled={loading}
                  {...register("graphicsCard")}
                  error={!!errors.graphicsCard}
                  helperText={errors.graphicsCard?.message}
                >
                  {graphicsCards?.map((option: GraphicsCard) => (
                    <option key={option.id} value={option.id}>
                      {option.name} ({option.price}€)
                    </option>
                  ))}
                </Select>

                <Select
                  label="Memory"
                  placeholder="Select memory..."
                  disabled={loading}
                  {...register("memory")}
                  error={!!errors.memory}
                  helperText={errors.memory?.message}
                >
                  {memory?.map((option: Memory) => (
                    <option key={option.id} value={option.id}>
                      {option.name} ({option.price}€)
                    </option>
                  ))}
                </Select>

                <Select
                  label="Storage"
                  placeholder="Select storage..."
                  disabled={loading}
                  {...register("storage")}
                  error={!!errors.storage}
                  helperText={errors.storage?.message}
                >
                  {storages?.map((option: Storage) => (
                    <option key={option.id} value={option.id}>
                      {option.name} ({option.price}€)
                    </option>
                  ))}
                </Select>

                <Select
                  label="Case"
                  placeholder="Select case..."
                  disabled={loading}
                  {...register("caseEntity")}
                  error={!!errors.caseEntity}
                  helperText={errors.caseEntity?.message}
                >
                  {cases?.map((option: Case) => (
                    <option key={option.id} value={option.id}>
                      {option.name} ({option.price}€)
                    </option>
                  ))}
                </Select>

                <Select
                  label="Power Supply"
                  placeholder="Select power supply..."
                  disabled={loading}
                  {...register("powerSupply")}
                  error={!!errors.powerSupply}
                  helperText={errors.powerSupply?.message}
                >
                  {powerSupplys?.map((option: PowerSupply) => (
                    <option key={option.id} value={option.id}>
                      {option.name} ({option.price}€)
                    </option>
                  ))}
                </Select>
                <Input
                  errors={errors}
                  required
                  register={register}
                  id="price"
                  label={"Total Price €"}
                  type="number"
                  readOnly
                  min={0}
                  step="0.01"
                />
              </div>
            </>
          )}
        </div>
        <div className="mb-7">
          <div className="pt-6">
            <Button disabled={loading} fullWidth type="submit">
              {!isEdit ? "Create Article" : "Update Article"}
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default ArticleForm;
