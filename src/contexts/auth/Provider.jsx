/* eslint-disable no-unused-vars */
// Import Dependencies
import React, { useEffect, useReducer, useState } from "react";
import isObject from "lodash/isObject";
import PropTypes from "prop-types";
import isString from "lodash/isString";

// Local Imports
import { AuthContext } from "./context";
import { decodeToken, isTokenValid, setSession } from "../../utils/jwt";
import { useLoginMutation } from "../../services/authApiSlice";
import { toast } from "sonner";
import { Navigate } from "react-router-dom";

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,
  errorMessage: null,
  user: null,
};

const reducerHandlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },

  LOGIN_REQUEST: (state) => {
    return {
      ...state,
      isLoading: true,
    };
  },

  LOGIN_SUCCESS: (state, action) => {
    const { user } = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      isLoading: false,
      user,
    };
  },

  LOGIN_ERROR: (state, action) => {
    const { errorMessage } = action.payload;

    return {
      ...state,
      errorMessage,
      isLoading: false,
    };
  },

  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
};

const reducer = (state, action) => {
  const handler = reducerHandlers[action.type];
  if (handler) {
    return handler(state, action);
  }
  return state;
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loginMutation, { isLoading }] = useLoginMutation();
  const localuserType = localStorage.getItem("userType") || "employee";
  const [userType, setUserType] = useState(localuserType);

  useEffect(() => {
    const init = async () => {
      try {
        const authToken = window.localStorage.getItem("authToken");

        if (authToken && isTokenValid(authToken)) {
          setSession(authToken);
          // console.log("Auth token from localStorage:", authToken);
          // console.log("Is token valid:", isTokenValid(authToken));

          const decoded = decodeToken(authToken); // Extract user from token
          if (decoded?.user_type || decoded?.role) {
            const userRole = decoded?.user_type || decoded?.role;
            setUserType(userRole);
            localStorage.setItem("userType", userRole); // keep in sync
          }
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: true,
              user: decoded || null,
            },
          });
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    init();
  }, []);

  // const login = async ({ email, password, role }) => {
  //   dispatch({
  //     type: "LOGIN_REQUEST",
  //   });

  //   try {
  //     const response = await loginMutation({
  //       email,
  //       password,
  //       user_type: userType,
  //       client_type: "web",
  //     }).unwrap();

  // if (response?.status === "success") {
  //   toast.success(response?.message || "OTP Verified successfully!");
  //   // You can navigate here if needed
  // } else {
  //   toast.error(response?.message || "Failed to verify OTP.");
  // }
  //     const { api_access_token } = response;
  //     const accessToken = api_access_token;
  //     const decoded = accessToken ? decodeToken(accessToken) : null;
  //     // if (!isString(accessToken)) {
  //     //   throw new Error("Response is not vallid");
  //     // }
  //     // if (!isString(accessToken)) {
  //     //   throw new Error("Response is not vallid");
  //     // }

  //     setSession(accessToken);

  //     // ✅ Trust the token’s user_type over localStorage/UI selection
  //     if (decoded?.user_type) {
  //       setUserType(decoded.user_type);
  //       localStorage.setItem("userType", decoded.user_type);
  //     }

  //     dispatch({
  //       type: "LOGIN_SUCCESS",
  //       payload: {
  //         user: decoded,
  //       },
  //     });
  //     console.log("decoded", decoded);
  //     return decoded !== null ? decoded : response;
  //   } catch (err) {
  //     console.log("Login error:", err);
  //     dispatch({
  //       type: "LOGIN_ERROR",
  //       payload: {
  //         errorMessage: err?.data,
  //       },
  //     });
  //   }
  // };
  const login = async ({ email, password, role }) => {
    dispatch({ type: "LOGIN_REQUEST" });

    try {
      const response = await loginMutation({
        email,
        password,
        role: userType,
      }).unwrap();
      console.log("response", response);
      if (response?.success) {
        toast.success(response?.message || "OTP Verified successfully!");
        // You can navigate here if needed
      } else {
        toast.error(response?.message || "Failed to verify OTP.");
      }

      const { accessToken } = response?.data;
      const decoded = accessToken ? decodeToken(accessToken) : null;

      setSession(accessToken);

      if (decoded?.role) {
        setUserType(decoded.role);
        localStorage.setItem("userType", decoded.role);
      }

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { user: decoded },
      });
      console.log("decode ", decoded);
      // Return combined object with isprofileCreated from backend
      return {
        ...decoded,
        isprofileCreated: decoded?.isprofileCreated,
        success: response?.success,
        message: response?.message,
      };
    } catch (err) {
      dispatch({
        type: "LOGIN_ERROR",
        payload: { errorMessage: err?.data },
      });
      console.log("error",err?.data)
      return  err?.data ;
    }
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
  };

  const updateUserToken = (newToken) => {
    // console.log("first token", newToken);
    if (!newToken || !isTokenValid(newToken)) return;
    setSession(newToken);
    const decoded = decodeToken(newToken);

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: {
        user: decoded,
      },
    });
  };

  if (!children) {
    return null;
  }
  return (
    <AuthContext
      value={{
        ...state,
        login,
        dispatch,
        isLoading,
        logout,
        updateUserToken,
        setUserType,
        userType,
      }}
    >
      {children}
    </AuthContext>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
