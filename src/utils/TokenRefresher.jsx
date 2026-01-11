import { useTokenRefresher } from "./refreshToken";

export const TokenRefresher = () => {
  useTokenRefresher(30000);
  return null;
}
