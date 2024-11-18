import { axiosPrivate } from "@/axios/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { User } from "@/types";
import UseAxiosPrivate from "@/hooks/useAxiosPrivate";

const fetchUsers = () => {
  console.log("AXIOS HEADERS ON FETCH USERS", axiosPrivate.defaults.headers);
  return axiosPrivate.get(`/api/users`);
};

const updateUser = (user: User) => {
  return axiosPrivate.put(`/api/users/${user?.id}`, user);
};

const deleteUser = (id: number) => {
  return axiosPrivate.delete(`/api/users/${id}`);
};

export const useFetchUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(),
    select: (response) => response.data,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: async (response) => {
      console.log("UPDATE USER RESPONSE", response);
      if (response.status === 200 || response.status === 201) {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        toast.success("User updated successful!");
      }
      return response;
    },
    onError: (error) => {
      console.log("ERROR", error.message);
      toast.error("Update user failed!");
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 204) {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        toast.success("User deleted successful!");
      }
      return response;
    },
    onError: (error) => {
      toast.error("Delete user failed!");
      console.log("ERROR", error.message);
    },
  });
};
