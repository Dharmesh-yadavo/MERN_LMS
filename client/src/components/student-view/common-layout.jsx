import React from "react";
import { Outlet } from "react-router-dom";
import StudentViewCommonHeader from "./header";

export const StudentViewCommonLayout = () => {
  return (
    <div>
      <StudentViewCommonHeader />
      <Outlet />
    </div>
  );
};
