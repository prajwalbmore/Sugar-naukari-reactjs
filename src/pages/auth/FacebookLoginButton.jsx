import React, { useEffect, useState } from "react";
import FaceBookLogo from "/assets/FacebookLogo.svg";
import { handleSubmit } from "../../utils/useHandleSubmit";
import { useAuthContext } from "../../contexts/auth/context";
import { useSocialLoginMutation } from "../../services/authApiSlice";
import { useNavigate } from "react-router-dom";
import { decodeToken, setSession } from "../../utils/jwt";

const FacebookLoginButton = () => {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const { userType, dispatch } = useAuthContext();
  const [sociallogin] = useSocialLoginMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (window.FB) {
      setIsSDKLoaded(true);
      return;
    }

    // 1️⃣ Define fbAsyncInit BEFORE loading the SDK
    // 1️⃣ Define fbAsyncInit BEFORE loading the SDK
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: "1491086315649569", // replace with your FB App ID
        cookie: true,
        xfbml: true,
        version: "v23.0", // safe & valid version
      });
      setIsSDKLoaded(true);
    };

    // 2️⃣ Load the Facebook SDK script
    ((d, s, id) => {
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      const js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  const handleFacebookLogin = () => {
    console.log("isSDKLoaded",isSDKLoaded)
    if (!isSDKLoaded) return;

    window.FB.login(
      (response) => {
        if (response.authResponse) {
          // Fetch user info
          window.FB.api(
            "/me",
            { fields: "name,email,picture" },
            async (userInfo) => {
              const payload = {
                email: userInfo?.email,
                name: userInfo?.name,
                user_type: userType,
                provider_id: userInfo?.id,
                provider: "facebook",
              };

              // Call backend
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
      className="rounded-full hover:bg-gray-100 flex items-center justify-center p-2"
    >
      <img src={FaceBookLogo} alt="Facebook Sign In" className="w-10 h-10" />
    </button>
  );
};

export default FacebookLoginButton;
// import React, { useEffect, useState } from "react";
// import FaceBookLogo from "/assets/FacebookLogo.svg";
// import { handleSubmit } from "../../utils/useHandleSubmit";
// import { useAuthContext } from "../../contexts/auth/context";
// import { useSocialLoginMutation } from "../../services/authApiSlice";
// import { useNavigate } from "react-router-dom";
// import { decodeToken, setSession } from "../../utils/jwt";

// const FacebookLoginButton = () => {
//   const [isSDKLoaded, setIsSDKLoaded] = useState(false);
//   const { userType, dispatch } = useAuthContext();
//   const [sociallogin] = useSocialLoginMutation();
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (window.FB) {
//       setIsSDKLoaded(true);
//       return;
//     }

//     // Load Facebook SDK
//     ((d, s, id) => {
//       const fjs = d.getElementsByTagName(s)[0];
//       if (d.getElementById(id)) return;
//       const js = d.createElement(s);
//       js.id = id;
//       js.src = "https://connect.facebook.net/en_US/sdk.js";
//       fjs.parentNode.insertBefore(js, fjs);
//     })(document, "script", "facebook-jssdk");

//     window.fbAsyncInit = () => {
//       window.FB.init({
//         appId: "your-app-id", // Replace with your FB App ID
//         cookie: true,
//         xfbml: true,
//         version: "v20.0",
//       });
//       setIsSDKLoaded(true);
//     };
//   }, []);

//   // const handleFacebookLogin = () => {
//   //   if (!isSDKLoaded) return;

//   //   window.FB.login(
//   //     (response) => {
//   //       if (response.authResponse) {
//   //         console.log("Login success:", response);
//   //         window.FB.api(
//   //           "/me",
//   //           { fields: "name,email,picture" },
//   //           async (userInfo) => {
//   //             console.log("User info:", userInfo);
//   //             const payload = {
//   //               email: userInfo?.email,
//   //               name: userInfo?.name,
//   //               user_type: userType,
//   //               provider_id: userInfo?.id,
//   //               provider: "facebook",
//   //             };
//   //             const apiresponse = await handleSubmit({
//   //               apiCall: sociallogin,
//   //               values: payload,
//   //               //   navigate,
//   //               //   successRedirect: "/dashboard",
//   //             });
//   //             const { api_access_token } = apiresponse;
//   //             const accessToken = api_access_token;
//   //             const decoded = decodeToken(accessToken);
//   //             console.log("decoded", decoded);
//   //             setSession(accessToken);
//   //             dispatch({
//   //               type: "LOGIN_SUCCESS",
//   //               payload: {
//   //                 user: decoded,
//   //               },
//   //             });
//   //             // if (apiresponse?.status === "success") {
//   //             //   if (apiresponse?.data?.isprofileCreated) {
//   //             //     navigate("/dashboard");
//   //             //   } else {
//   //             //     navigate(`/create-profile/${userType}`);
//   //             //   }
//   //             // }
//   //           }
//   //         );
//   //       } else {
//   //         console.log("Login cancelled or not authorized");
//   //       }
//   //     },
//   //     { scope: "public_profile,email" }
//   //   );
//   // };
//   const handleFacebookLogin = () => {
//     if (!isSDKLoaded) return;

//     window.FB.login(
//       (response) => {
//         if (response.authResponse) {
//           window.FB.api(
//             "/me",
//             { fields: "name,email,picture" },
//             async (userInfo) => {
//               const payload = {
//                 email: userInfo?.email,
//                 name: userInfo?.name,
//                 user_type: userType,
//                 provider_id: userInfo?.id,
//                 provider: "facebook",
//               };

//               const apiresponse = await handleSubmit({
//                 apiCall: sociallogin,
//                 values: payload,
//               });

//               const accessToken = apiresponse?.api_access_token;
//               const decoded = decodeToken(accessToken);
//               setSession(accessToken);
//               dispatch({ type: "LOGIN_SUCCESS", payload: { user: decoded } });

//               if (apiresponse?.status === "success") {
//                 if (apiresponse?.data?.isprofileCreated) {
//                   navigate("/dashboard");
//                 } else {
//                   navigate(`/create-profile/${userType}`);
//                 }
//               }
//             }
//           );
//         }
//       },
//       { scope: "public_profile,email" }
//     );
//   };

//   return (
//     <button
//       type="button"
//       onClick={handleFacebookLogin}
//       disabled={!isSDKLoaded}
//       className="rounded-full hover:bg-gray-100 flex items-center justify-center"
//     >
//       <img src={FaceBookLogo} alt="Facebook Sign In" className="w-10 h-10" />
//     </button>
//   );
// };

// export default FacebookLoginButton;
