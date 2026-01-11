import { useGoogleLogin } from "@react-oauth/google";
import GoogleLogo from "/assets/GoogleLogo.svg";
import Button from "../../components/ui/Button";
import React from "react";
import { useAuthContext } from "../../contexts/auth/context";
import { handleSubmit } from "../../utils/useHandleSubmit";
import { useSocialLoginMutation } from "../../services/authApiSlice";
import { useNavigate } from "react-router-dom";
import { decodeToken, setSession } from "../../utils/jwt";

const GoogleLoginButton = () => {
  const { userType, dispatch } = useAuthContext();
  const [sociallogin] = useSocialLoginMutation();
  const navigate = useNavigate();
  // const login = useGoogleLogin({
  //   onSuccess: async (response) => {
  //     try {
  //       // Fetch user profile using access_token
  //       const res = await fetch(
  //         "https://www.googleapis.com/oauth2/v3/userinfo",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${response.access_token}`,
  //           },
  //         }
  //       );

  //       const userInfo = await res.json();

  //       // Example payload to your backend
  //       const payload = {
  //         email: userInfo?.email,
  //         name: userInfo?.name,
  //         user_type: userType,
  //         provider_id: userInfo?.sub,
  //         provider: "google",
  //       };
  //       const apiresponse = await handleSubmit({
  //         apiCall: sociallogin,
  //         values: payload,
  //         //   navigate,
  //         //   successRedirect: "/dashboard",
  //       });
  //       const { api_access_token } = apiresponse;
  //       const accessToken = api_access_token;
  //       const decoded = decodeToken(accessToken);
  //       console.log("apiresponse", apiresponse);
  //       setSession(accessToken);
  //       dispatch({
  //         type: "LOGIN_SUCCESS",
  //         payload: {
  //           user: decoded,
  //         },
  //       });
  //       if (apiresponse?.status === "success") {
  //         if (apiresponse?.data?.isprofileCreated) {
  //           navigate("/dashboard");
  //         } else {
  //           navigate(`/create-profile/${userType}`);
  //         }
  //       }
  //     } catch (err) {
  //       console.error("Google login error:", err);
  //     }
  //   },
  //   onError: (err) => console.error("Google login failed:", err),
  // });
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${response.access_token}` },
          }
        );
        const userInfo = await res.json();

        const payload = {
          email: userInfo?.email,
          name: userInfo?.name,
          user_type: userType,
          provider_id: userInfo?.sub,
          provider: "google",
        };

        const apiresponse = await handleSubmit({
          apiCall: sociallogin,
          values: payload,
        });

        const accessToken = apiresponse?.api_access_token;
        const decoded = decodeToken(accessToken);
        setSession(accessToken);
        dispatch({ type: "LOGIN_SUCCESS", payload: { user: decoded } });

        if (apiresponse?.status === "success") {
          if (apiresponse?.data?.isprofileCreated) {
            navigate("/dashboard");
          } else {
            navigate(`/create-profile/${userType}`);
          }
        }
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

export default GoogleLoginButton;
