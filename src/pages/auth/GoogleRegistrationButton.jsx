import { useGoogleLogin } from "@react-oauth/google";
import GoogleLogo from "/assets/GoogleLogo.svg";
import Button from "../../components/ui/Button";
import React from "react";
import { useAuthContext } from "../../contexts/auth/context";
import { useSocialRegistrationMutation } from "../../services/authApiSlice";
import { handleSubmit } from "../../utils/useHandleSubmit";
import { useNavigate } from "react-router-dom";

const GoogleRegistrationButton = () => {
  const { userType } = useAuthContext();
  const [register] = useSocialRegistrationMutation();
  const navigate = useNavigate();
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        // Fetch user profile using access_token
        const res = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );

        const userInfo = await res.json();

        // Example payload to your backend
        const payload = {
          email: userInfo?.email,
          name: userInfo?.name,
          user_type: userType,
          provider_id: userInfo?.sub,
          provider: "google",
        };
        console.log("Google User Info:", userInfo);
        console.log("payload", payload);
        await handleSubmit({
          apiCall: register,
          values: payload,
          navigate: navigate,
          successRedirect: "/login",
        });
      } catch (err) {
        console.error("Google login error:", err);
      }
    },
    onError: (err) => console.error("Google login failed:", err),
  });

  return (
    <Button
      type="button"
      className="rounded-full hover:bg-gray-100 flex items-center justify-center"
      onClick={() => login()}
    >
      <img src={GoogleLogo} alt="Google Sign In" className="w-10 h-10" />
    </Button>
  );
};

export default GoogleRegistrationButton;
