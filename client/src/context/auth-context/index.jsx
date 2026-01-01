/* eslint-disable react-refresh/only-export-components */

import { Skeleton } from "@/components/ui/skeleton";
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
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      } else {
        setAuth({
          authenticated: false,
          user: null,
        });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      if (!error?.response?.data?.success) {
        setAuth({
          authenticate: false,
          user: null,
        });
        setLoading(false);
      }
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
      {loading ? (
        <Skeleton className="h-[20px] w-[100px] rounded-full" />
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}
