/* eslint-disable react-refresh/only-export-components */

import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { checkAuthService, loginService, registerServices } from "@/servises";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
  const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
  const [auth, setAuth] = useState({
    authenticated: false,
    user: null,
  });

  const handleRegisterUser = async (event) => {
    event.preventDefault();

    const data = await registerServices(signUpFormData);
    return data;
  };

  const handleLoginUser = async (event) => {
    event.preventDefault();

    const data = await loginService(signInFormData);

    if (data.success) {
      sessionStorage.setItem(
        "accessToken",
        JSON.stringify(data.data.accessToken)
      );
      setAuth({
        authenticated: true,
        user: data.data.user,
      });
    } else {
      setAuth({
        authenticated: false,
        user: null,
      });
    }
  };

  const checkAuthUser = async () => {
    try {
      const data = await checkAuthService();

      if (data.success) {
        setAuth({
          authenticated: true,
          user: data.data.user,
        });
      } else {
        setAuth({
          authenticated: false,
          user: null,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkAuthUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signInFormData,
        setSignInFormData,
        signUpFormData,
        setSignUpFormData,
        handleRegisterUser,
        handleLoginUser,
        auth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
