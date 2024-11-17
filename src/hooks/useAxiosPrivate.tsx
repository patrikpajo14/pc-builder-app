import { useEffect } from "react";
import { useAuthContext } from "@/context/auth/authContext";
import useRefreshToken from "@/hooks/useRefreshToken";
import useCheckExpireTokens from "@/hooks/useCheckExpireTokens";
import { axiosPrivate } from "@/axios/axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const UseAxiosPrivate = () => {
  console.log("USE AXIOS PRIVATE");
  const { user, accessToken, logoutUser, expire, refresh_expire } =
    useAuthContext();
  const router = useRouter();
  const refresh = useRefreshToken();
  const { isTokenExpired, isRefreshTokenExpired } = useCheckExpireTokens(
    expire,
    refresh_expire,
  );

  console.log("ACCESS TOKEN", accessToken, "REFRESH EXOPIRE", refresh_expire);
  console.log(
    "IS TOKEN EXPIRED",
    isTokenExpired,
    "IS REFRESH EXOPIRED",
    isRefreshTokenExpired,
  );
  useEffect(() => {
    let regeneratedTokens = {};
    const requestIntercept = axiosPrivate.interceptors.request.use(
      async (config) => {
        if (isTokenExpired) {
          if (isRefreshTokenExpired) {
            logoutUser();
            router.replace("/");
          } else {
            try {
              regeneratedTokens = await refresh();

              config.headers["Authorization"] =
                `Bearer ${regeneratedTokens?.accessToken}`;
              config.headers["Userid"] = `${user?.id}`;
            } catch (error) {
              console.error("Error refreshing token:", error);
            }
          }
        }
        console.log("BEFORE CHEK HEADERS");
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${
            regeneratedTokens?.access_token || accessToken
          }`;
          config.headers["Userid"] = `${user?.id}`;
          console.log("ADDED HEADERS", config.headers);
        }

        return config;
      },
      (error) => Promise.reject(error),
    );
    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const prevRequest = error?.config;

        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          router.replace("/403");
        }
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          toast.error("Session expired!");
          router.replace("/");
          logoutUser();
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, []);

  return axiosPrivate;
};

export default UseAxiosPrivate;
