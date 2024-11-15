import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;
console.log("BASE URL", baseURL);

const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});
export default axiosInstance;

export const axiosPrivate = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});
