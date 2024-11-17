import { axiosPrivate } from "@/axios/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Offer } from "@/types";

const fetchOffers = () => {
  return axiosPrivate.get(`/api/offers`);
};

const fetchOfferById = (id: number) => {
  return axiosPrivate.get(`/api/offers/${id}`);
};

const createOffer = (offer: Offer) => {
  return axiosPrivate.post(`/api/offers`, offer);
};

const updateOffer = (offer: { id: number; offer: Offer }) => {
  return axiosPrivate.put(`/api/offers/${offer?.id}`, offer?.offer);
};

const deleteOffer = (id: number) => {
  return axiosPrivate.delete(`/api/offers/${id}`);
};

export const useFetchOffers = () => {
  return useQuery({
    queryKey: ["offer-list"],
    queryFn: () => fetchOffers(),
    select: (response) => response.data,
  });
};

export const useFetchOfferById = (offerId: number) => {
  return useQuery({
    queryKey: ["offer", offerId],
    queryFn: () => fetchOfferById(offerId),
    enabled: !!offerId,
    select: (response) => response.data,
  });
};

export const useCreateOffer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createOffer,
    onSuccess: async (response) => {
      console.log("CREATE OFFER RESPONSE", response);
      if (response.status === 200 || response.status === 201) {
        queryClient.invalidateQueries({ queryKey: ["offer-list"] });
        toast.success("Offer created successful!");
      }
      return response;
    },
    onError: (error) => {
      console.log("ERROR", error.message);
      toast.error("Create offer failed!");
    },
  });
};

export const useUpdateOffer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateOffer,
    onSuccess: async (response) => {
      console.log("UPDATE OFFER RESPONSE", response);
      if (response.status === 200 || response.status === 201) {
        queryClient.invalidateQueries({ queryKey: ["offer-list"] });
        toast.success("Offer updated successful!");
      }
      return response;
    },
    onError: (error) => {
      console.log("ERROR", error.message);
      toast.error("Update offer failed!");
    },
  });
};

export const useDeleteOffer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteOffer,
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 204) {
        queryClient.invalidateQueries({ queryKey: ["offer-list"] });
        toast.success("Offer deleted successful!");
      }
      return response;
    },
    onError: (error) => {
      toast.error("Delete offer failed!");
      console.log("ERROR", error.message);
    },
  });
};