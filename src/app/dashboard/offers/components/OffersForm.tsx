"use client";

import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import Button from "@/components/Button";
import Input from "@/components/forms/Input";
import Article from "@/components/article/Article";
import ArticleForm from "@/components/article/ArticleForm";
import CustomDrawer from "@/components/CustomDrawer";
import { Offer, Article as ArticleType, PowerSupply } from "@/types";
import { useFetchArticles } from "@/queryHooks/useArticleData";
import Select from "@/components/forms/Select";

interface OffersFormProps {
  isEdit?: boolean;
  offer?: Offer;
}

interface OffersFormData {
  customerName: string;
  address: string;
  city: string;
  email: string;
  phone: string;
  article: string;
}

const OffersForm: React.FC<OffersFormProps> = ({ isEdit = false, offer }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedArticles, setSelectedArticles] = useState<ArticleType[]>(
    offer ? offer?.pcId : [],
  );
  const [customArticles, setCustomArticles] = useState<ArticleType[]>([]);
  const [articleList, setArticleList] = useState<ArticleType[]>([]);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const { data: articles, status } = useFetchArticles();

  console.log("ARTICLES", articles);

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const OffersSchema = Yup.object().shape({
    customerName: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    phone: Yup.string().required("Required"),
    article: Yup.string(),
  });

  const defaultValues: OffersFormData = useMemo(
    () => ({
      customerName: offer?.customer_name || "",
      address: offer?.customer_address || "",
      city: offer?.place?.place_name || "",
      email: offer?.customer_email || "",
      phone: offer?.customer_phone || "",
      article: "",
    }),
    [offer],
  );

  const methods = useForm<OffersFormData>({
    resolver: yupResolver(OffersSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (isEdit && offer) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
  }, [isEdit, offer, reset, defaultValues]);

  useEffect(() => {
    setArticleList([...selectedArticles, ...customArticles]);
  }, [selectedArticles, customArticles]);

  const handleOnSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(event.target.value);
    const selectedArticle = articles?.find(
      (article: ArticleType) => article.id === selectedId,
    );

    if (!selectedArticle) return;

    const existingArticle = selectedArticles.find(
      (article) => article.id === selectedId,
    );

    if (existingArticle) {
      setSelectedArticles((prev) =>
        prev.map((article) =>
          article.id === selectedId ? { ...article } : article,
        ),
      );
    } else {
      setSelectedArticles((prev) => [...prev, selectedArticle]);
    }
  };

  const handleCreateCustomArticle = (article: ArticleType) => {
    setCustomArticles((prev) => [...prev, article]);
  };

  const handleDeleteArticle = (id: number) => {
    setArticleList((prev) => prev.filter((article) => article.id !== id));
    setCustomArticles((prev) => prev.filter((article) => article.id !== id));
    setSelectedArticles((prev) => prev.filter((article) => article.id !== id));
  };

  const onSubmit: SubmitHandler<OffersFormData> = async (data) => {
    console.log("SUBMIT DATA", data);
    try {
      setIsLoading(true);

      const body = {
        data,
        articles: selectedArticles,
        articleList: articleList,
      };

      console.log("SUBMIT DATA BODY", body);

      if (isEdit && offer) {
        //updateOfferMutate({ id: offer.id, body });
        setSelectedArticles([]);
      } else {
        //addOfferMutate(body);
        setSelectedArticles([]);
        setArticleList([]);
      }
      reset();
      setCustomArticles([]);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  /*if (isArticlesLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader sx="min-h-[250px]" />
      </div>
    );
  }

  if (isArticlesError) {
    return (
      <div className="text-center text-red-500">
        Failed to load articles. Please try again later.
      </div>
    );
  }*/

  return (
    <>
      <div className="card">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 p-5 md:gap-5 md:p-7">
              <Input
                disabled={isLoading}
                errors={errors}
                required
                register={register}
                id="customerName"
                label={"Customer name"}
              />
              <Input
                disabled={isLoading}
                errors={errors}
                required
                register={register}
                id="address"
                label={"Address"}
              />
              <Input
                disabled={isLoading}
                errors={errors}
                required
                register={register}
                id="city"
                label={"City"}
              />
              <Input
                disabled={isLoading}
                errors={errors}
                required
                register={register}
                id="email"
                label={"Email"}
                type={"email"}
              />
              <Input
                disabled={isLoading}
                errors={errors}
                required
                register={register}
                id="phone"
                label={"Phone number"}
                type={"number"}
              />
              <Select
                label="Article"
                placeholder="Select article..."
                disabled={isLoading}
                {...register("article")}
                onChange={handleOnSelect}
                error={!!errors.article}
                helperText={errors.article?.message}
              >
                {articles?.map((option: ArticleType) => (
                  <option key={option.id} value={option.id || 0}>
                    {option.name} ({option?.price}€)
                  </option>
                ))}
              </Select>

              <div className="flex flex-col justify-end pt-2 sm:p-0">
                <Button
                  secondary
                  disabled={isLoading}
                  onClick={handleOpenDrawer}
                  fullWidth
                >
                  Custom article
                </Button>
              </div>

              <div className="flex flex-col justify-end pt-2 sm:p-0">
                <Button disabled={isLoading} fullWidth type="submit">
                  {isEdit ? "Update offer" : "Create offer"}
                </Button>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
      <div className="mt-7">
        {articleList.map((article) => (
          <Article
            key={article.id}
            article={article}
            offerItem={true}
            onDelete={() => handleDeleteArticle(article.id)}
            onSelect={() => {}}
            setEdit={() => {}}
          />
        ))}
      </div>

      <CustomDrawer
        isOpened={openDrawer}
        onClose={handleCloseDrawer}
        title="Create article"
      >
        <ArticleForm
          forOffer={true}
          createCustomArticle={handleCreateCustomArticle}
        />
      </CustomDrawer>
    </>
  );
};

export default OffersForm;
