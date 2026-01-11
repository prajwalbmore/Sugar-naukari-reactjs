import { useEffect } from "react";
import { useLazyRefreshTokenQuery } from "../services/authApiSlice";
import { useAuthContext } from "../contexts/auth/context";

export const useRefreshToken = () => {
  const { updateUserToken } = useAuthContext();
  const [triggerRefresh] = useLazyRefreshTokenQuery();

  const refreshToken = async () => {
    setTimeout(async () => {
      try {
        const res = await triggerRefresh();
        // console.log("RefreshToken", res?.data?.accessToken);
        if (res.data?.success) {
          updateUserToken(res?.data?.accessToken);
        }
      } catch (err) {
        console.error("Token refresh failed", err);
      }
    }, 1500); // 5000 milliseconds = 5 seconds
  };

  return refreshToken;
};

export const useTokenRefresher = (intervalMs = 30000) => {
  const { updateUserToken, isLogedIn } = useAuthContext();
  const [triggerRefresh] = useLazyRefreshTokenQuery();

  useEffect(() => {
    // if (!isLoggedIn) return;
    const interval = setInterval(async () => {
      try {
        const res = await triggerRefresh();
        if (res.data?.success === true) {
          updateUserToken(res.data?.accessToken);
        }
        console.log("Token Refreshed Successfully!");
      } catch (err) {
        console.error("Token refresh failed", err);
      }
    }, intervalMs);

    return () => clearInterval(interval);
  }, [triggerRefresh, updateUserToken, intervalMs, isLogedIn]);
};
