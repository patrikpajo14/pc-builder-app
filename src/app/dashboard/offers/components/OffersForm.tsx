"use client";

import React, { useEffect, useMemo, useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import Button from "@/components/Button";
import Input from "@/components/forms/Input";
import Select from "@/components/forms/Select";
import Article from "@/components/article/Article";
import ArticleForm from "@/components/article/ArticleForm";
import CustomDrawer from "@/components/CustomDrawer";
import { Offer, Article as ArticleType } from "@/types"; // Assuming Article is defined in types
import { ChangeEvent } from "react";

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
}

const OffersForm: React.FC<OffersFormProps> = ({ isEdit = false, offer }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedArticles, setSelectedArticles] = useState<ArticleType[]>(
    offer ? offer.articleList : [],
  );
  const [customArticles, setCustomArticles] = useState<ArticleType[]>([]);
  const [articleList, setArticleList] = useState<ArticleType[]>([]);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

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
  });

  const defaultValues: OffersFormData = useMemo(
    () => ({
      customerName: offer?.customer_name || "",
      address: offer?.customer_address || "",
      city: offer?.place?.place_name || "",
      email: offer?.customer_email || "",
      phone: offer?.customer_phone || "",
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

  /* const handleOnSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(event.target.value);
    const selectedArticle = articlesData?.find(
      (article) => article.id === selectedId,
    );

    if (!selectedArticle) return;

    const existingArticle = selectedArticles.find(
      (article) => article.id === selectedId,
    );

    if (existingArticle) {
      setSelectedArticles((prev) =>
        prev.map((article) =>
          article.id === selectedId
            ? { ...article, amount: (article.amount || 1) + 1 }
            : article,
        ),
      );
    } else {
      setSelectedArticles((prev) => [
        ...prev,
        { ...selectedArticle, amount: 1 },
      ]);
    }
  };*/

  const handleCreateCustomArticle = (article: ArticleType) => {
    setCustomArticles((prev) => [...prev, article]);
  };

  const handleDeleteArticle = (id: number) => {
    setArticleList((prev) => prev.filter((article) => article.id !== id));
    setCustomArticles((prev) => prev.filter((article) => article.id !== id));
    setSelectedArticles((prev) => prev.filter((article) => article.id !== id));
  };

  const onSubmit: SubmitHandler<OffersFormData> = async (data) => {
    try {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const body = {
        data,
        articles: selectedArticles,
        articleList: articleList,
      };

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
      // Optionally, handle error state here
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
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 p-5 md:gap-5 md:p-7">
            <Input
              disabled={isLoading}
              errors={errors}
              required
              {...register("customerName")}
              id="customerName"
              label="Customer Name"
            />
            <Input
              disabled={isLoading}
              errors={errors}
              required
              {...register("address")}
              id="address"
              label="Address"
              type="text"
            />
            <Input
              disabled={isLoading}
              errors={errors}
              required
              {...register("city")}
              id="city"
              label="City"
              type="text"
              className="capitalize"
            />
            <Input
              disabled={isLoading}
              errors={errors}
              required
              {...register("email")}
              id="email"
              label="Email"
              type="email"
            />
            <Input
              disabled={isLoading}
              errors={errors}
              required
              {...register("phone")}
              id="phone"
              label="Phone"
              type="number"
            />
            {/*<Select
              label="Article"
              placeholder="Select article..."
              disabled={isLoading}
              {...register("article")}
              onChange={handleOnSelect}
            >
              <option value="">Select article...</option>
              {?.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </Select>*/}

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
        </FormProvider>
      </div>
      <div className="mt-7">
        {articleList.map((article) => (
          <Article
            key={article.id}
            article={article}
            offerItem={true}
            onDelete={() => handleDeleteArticle(article.id)}
          />
        ))}
      </div>

      <CustomDrawer
        isOpened={openDrawer}
        onClose={handleCloseDrawer}
        title="Create article"
      >
        <ArticleForm
          forOffer="true"
          createCustomArticle={handleCreateCustomArticle}
        />
      </CustomDrawer>
    </>
  );
};

export default OffersForm;
