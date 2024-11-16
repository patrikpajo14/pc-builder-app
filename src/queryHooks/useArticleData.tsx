import { axiosPrivate } from "@/axios/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Article } from "@/types";

const fetchArticles = () => {
  return axiosPrivate.get(`/api/pc`);
};

const fetchArticleById = (id: number) => {
  return axiosPrivate.get(`/api/pc/${id}`);
};

const updateArticle = (article: Article) => {
  return axiosPrivate.put(`/api/pc/${article?.id}`, article);
};

const deleteArticle = (id: number) => {
  return axiosPrivate.delete(`/api/pc/${id}`);
};

export const useFetchArticles = () => {
  return useQuery({
    queryKey: ["article-list"],
    queryFn: () => fetchArticles(),
    select: (response) => response.data,
  });
};

export const useFetchArticleById = (articleId: number) => {
  return useQuery({
    queryKey: ["article", articleId],
    queryFn: () => fetchArticleById(articleId),
    enabled: !!articleId,
    select: (response) => response.data,
  });
};

export const useUpdateArticle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateArticle,
    onSuccess: async (response) => {
      console.log("UPDATE ARTICLE RESPONSE", response);
      if (response.status === 200 || response.status === 201) {
        queryClient.invalidateQueries({ queryKey: ["article-list"] });
        toast.success("Article updated successful!");
      }
      return response;
    },
    onError: (error) => {
      console.log("ERROR", error.message);
      toast.error("Update article failed!");
    },
  });
};

export const useDeleteArticle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteArticle,
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 204) {
        queryClient.invalidateQueries({ queryKey: ["article-list"] });
        toast.success("Article deleted successful!");
      }
      return response;
    },
    onError: (error) => {
      toast.error("Delete article failed!");
      console.log("ERROR", error.message);
    },
  });
};
