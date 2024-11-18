import { axiosPrivate } from "@/axios/axios";
import { useQuery } from "@tanstack/react-query";

const fetchDashboard = () => {
  return axiosPrivate.get(`/api/dashboard`);
};

export const useFetchDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: () => fetchDashboard(),
    select: (response) => response.data,
  });
};
