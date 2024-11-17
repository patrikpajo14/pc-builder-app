import { useAuthContext } from "@/context/auth/authContext";

const useRefreshToken = () => {
  console.log("USE REFRESH TOKEN");
  const { regenerateTokens, refreshToken, accessToken, logoutUser } =
    useAuthContext();
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  const refresh = async () => {
    console.log("REFRESH FUNCTION EXECUTED");
    try {
      const response = await fetch(`${baseURL}/api/auth/refresh_token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ refreshToken: refreshToken }),
      });
      console.log("REFRESH TOKEN RESPONSE", response);
      const data = await response.json();

      console.log("REFRESH TOKEN DATA", data);

      if (data.code === 200) {
        regenerateTokens(
          data.data?.session?.access_token,
          data?.data?.session?.refresh_token,
          data?.data?.session?.expire,
          data?.data?.session?.refresh_expire,
        );

        const regeneratedToken = {
          accessToken: data?.data?.session?.access_token,
        };

        return regeneratedToken;
      } else {
        logoutUser();
      }
    } catch (error) {
      console.error("Error during token refresh:", error);
      logoutUser();
    }
  };

  return refresh;
};
export default useRefreshToken;
