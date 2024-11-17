import { axiosPrivate } from "@/axios/axios";
import { useQuery } from "@tanstack/react-query";

const fetchProcessor = () => {
  return axiosPrivate.get(`/api/processor`);
};

export const useFetchProcessors = () => {
  return useQuery({
    queryKey: ["processors"],
    queryFn: () => fetchProcessor(),
    select: (response) => response.data,
  });
};

const fetchMotherboard = () => {
  return axiosPrivate.get(`/api/motherboard`);
};

export const useFetchMotherboards = () => {
  return useQuery({
    queryKey: ["motherboards"],
    queryFn: () => fetchMotherboard(),
    select: (response) => response.data,
  });
};

const fetchGraphicsCard = () => {
  return axiosPrivate.get(`/api/graphics-card`);
};

export const useFetchGraphicsCards = () => {
  return useQuery({
    queryKey: ["graphicsCards"],
    queryFn: () => fetchGraphicsCard(),
    select: (response) => response.data,
  });
};

const fetchMemory = () => {
  return axiosPrivate.get(`/api/memory`);
};

export const useFetchMemory = () => {
  return useQuery({
    queryKey: ["memory"],
    queryFn: () => fetchMemory(),
    select: (response) => response.data,
  });
};

const fetchStorage = () => {
  return axiosPrivate.get(`/api/storage`);
};

export const useFetchStorage = () => {
  return useQuery({
    queryKey: ["storage"],
    queryFn: () => fetchStorage(),
    select: (response) => response.data,
  });
};

const fetchCase = () => {
  return axiosPrivate.get(`/api/case`);
};

export const useFetchCase = () => {
  return useQuery({
    queryKey: ["case"],
    queryFn: () => fetchCase(),
    select: (response) => response.data,
  });
};

const fetchPowerSupply = () => {
  return axiosPrivate.get(`/api/power-supply`);
};

export const useFetchPowerSupply = () => {
  return useQuery({
    queryKey: ["power-supply"],
    queryFn: () => fetchPowerSupply(),
    select: (response) => response.data,
  });
};
