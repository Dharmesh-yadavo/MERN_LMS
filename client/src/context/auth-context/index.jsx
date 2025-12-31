/* eslint-disable react-refresh/only-export-components */

import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { registerServices } from "@/servises";
import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
  const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);

  const handleRegisterUser = async (event) => {
    event.preventDefault();

    const data = await registerServices(signUpFormData);

    console.log(data);
  };

  return (
    <AuthContext.Provider
      value={{
        signInFormData,
        setSignInFormData,
        signUpFormData,
        setSignUpFormData,
        handleRegisterUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
