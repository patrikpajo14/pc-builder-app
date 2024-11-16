import { axiosPrivate } from "@/axios/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const createCase = (body: object) => {
  return axiosPrivate.post(`/api/case`, body);
};

export const useCreateCase = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCase,
    onSuccess: async (response) => {
      console.log("CREATE CASE SUCCESSS", response);
      if (response.data.code === 200) {
        queryClient.invalidateQueries({ queryKey: ["orders"] });
        queryClient.invalidateQueries({ queryKey: ["order-single"] });
      }
      return response;
    },
    onError: (error) => {
      console.log("ERROR", error.message);
    },
  });
};
