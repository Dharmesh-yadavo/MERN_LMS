import { Fragment } from "react";
import { Navigate, useLocation } from "react-router-dom";
// useLocation is a hook that returns an object containing information about the current URL (pathname, search, state, hash)

export const RouteGuard = ({ authenticated, user, element }) => {
  const location = useLocation();

  //! BOUNCER: If not logged in and trying to access private pages, send to Login
  if (!authenticated && !location.pathname.includes("/auth")) {
    return <Navigate to="/auth" />;
  }

  //! STUDENT PROTECTION: If logged in as student, block Instructor pages and Auth pages
  if (
    authenticated &&
    user?.role !== "instructor" &&
    (location.pathname.includes("instructor") ||
      location.pathname.includes("/auth"))
  ) {
    return <Navigate to="/home" />;
  }

  //! INSTRUCTOR PROTECTION: If logged in as instructor, force them to stay in instructor pages
  if (
    authenticated &&
    user.role === "instructor" &&
    !location.pathname.includes("instructor")
  ) {
    return <Navigate to="/instructor" />;
  }

  //! SUCCESS: If all checks pass, wrap the page in an invisible Fragment and show it
  return <Fragment>{element}</Fragment>;
  // fragment is (<>...</>) a "ghost" wrapper.
};
