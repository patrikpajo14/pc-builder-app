import { useMemo } from "react";

function useTokenExpiration(expire: string, refreshExpire: string) {
  console.log("USE TOKEN CHECK EXPIRE");
  const isTokenExpired = useMemo(() => {
    const expireTimestamp = new Date(expire).getTime();
    return Date.now() > expireTimestamp;
  }, [expire]);

  const isRefreshTokenExpired = useMemo(() => {
    const refreshExpireTimestamp = new Date(refreshExpire).getTime();
    return Date.now() > refreshExpireTimestamp;
  }, [refreshExpire]);

  return { isTokenExpired, isRefreshTokenExpired };
}

export default useTokenExpiration;
