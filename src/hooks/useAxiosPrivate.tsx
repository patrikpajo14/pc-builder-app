import { useEffect } from "react";

const useAxiosPrivate = () => {
  const { user, accessToken, logoutUser, expire, refresh_expire } =
    useAuthContext();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();
  const refresh = useRefreshToken();
  const { isTokenExpired, isRefreshTokenExpired } = useCheckExpireTokens(
    expire,
    refresh_expire,
  );
  useEffect(() => {
    let regeneratedTokens = {};
    const requestIntercept = axiosPrivate.interceptors.request.use(
      async (config) => {
        if (isTokenExpired) {
          if (isRefreshTokenExpired) {
            logoutUser();
            navigate("/");
          } else {
            try {
              regeneratedTokens = await refresh();

              config.headers["Authorization"] =
                `Bearer ${regeneratedTokens?.access_token}`;
              config.headers["Userid"] = `${user?.id}`;
            } catch (error) {
              console.error("Error refreshing token:", error);
            }
          }
        }
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${
            regeneratedTokens?.access_token || accessToken
          }`;
          config.headers["Userid"] = `${user?.id}`;
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
          navigate("/403");
        }
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          enqueueSnackbar(translate("session_expired"), {
            variant: "error",
          });

          navigate("/");
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

export default useAxiosPrivate;
