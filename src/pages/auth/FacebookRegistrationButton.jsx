import React, { useEffect, useState } from "react";
import FaceBookLogo from "/assets/FacebookLogo.svg";
import { handleSubmit } from "../../utils/useHandleSubmit";
import { useAuthContext } from "../../contexts/auth/context";
import { useNavigate } from "react-router-dom";
import { useSocialRegistrationMutation } from "../../services/authApiSlice";

const FacebookRegistrationButton = () => {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const { userType, dispatch } = useAuthContext();
  const [register] = useSocialRegistrationMutation();
  const navigate = useNavigate();
  useEffect(() => {
    if (window.FB) {
      setIsSDKLoaded(true);
      return;
    }

    // Load Facebook SDK
    ((d, s, id) => {
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      const js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");

    window.fbAsyncInit = () => {
      window.FB.init({
        appId: "your-app-id", // Replace with your FB App ID
        cookie: true,
        xfbml: true,
        version: "v20.0",
      });
      setIsSDKLoaded(true);
    };
  }, []);

  const handleFacebookLogin = () => {
    if (!isSDKLoaded) return;

    window.FB.login(
      (response) => {
        if (response.authResponse) {
          console.log("Login success:", response);
          window.FB.api(
            "/me",
            { fields: "name,email,picture" },
            async (userInfo) => {
              console.log("User info:", userInfo);
              const payload = {
                email: userInfo?.email,
                name: userInfo?.name,
                user_type: userType,
                provider_id: userInfo?.id,
                provider: "facebook",
              };
              console.log("Google User Info:", userInfo);
              console.log("payload", payload);
              await handleSubmit({
                apiCall: register,
                values: payload,
                navigate: navigate,
                successRedirect: "/login",
              });
            }
          );
        } else {
          console.log("Login cancelled or not authorized");
        }
      },
      { scope: "public_profile,email" }
    );
  };

  return (
    <button
      type="button"
      onClick={handleFacebookLogin}
      disabled={!isSDKLoaded}
      className="rounded-full hover:bg-gray-100 flex items-center justify-center"
    >
      <img src={FaceBookLogo} alt="Facebook Sign In" className="w-10 h-10" />
    </button>
  );
};

export default FacebookRegistrationButton;
