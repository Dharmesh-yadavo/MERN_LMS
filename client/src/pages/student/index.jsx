import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/auth-context";
import React, { useContext } from "react";

export const StudentHomePage = () => {
  const { resetCredentials } = useContext(AuthContext);

  const handleLogout = () => {
    resetCredentials();
    sessionStorage.clear();
  };

  return (
    <div className="">
      Student Home page
      <Button onClick={handleLogout}>Log out</Button>
    </div>
  );
};
