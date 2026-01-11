import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthPage } from "./pages/auth/index.jsx";
import { RouteGuard } from "./components/route-guard/index.jsx";
import { useContext } from "react";
import { AuthContext } from "./context/auth-context/index.jsx";
import { InstructorDashboardPage } from "./pages/instructor/index.jsx";
import { StudentViewCommonLayout } from "./components/student-view/common-layout.jsx";
import { StudentHomePage } from "./pages/student/index.jsx";
import { NotFoundPage } from "./pages/not-found/index.jsx";
import AddNewCoursePage from "./pages/instructor/add-new-course.jsx";

function App() {
  const { auth } = useContext(AuthContext);

  const router = createBrowserRouter([
    {
      path: "/auth",
      element: (
        <RouteGuard
          element={<AuthPage />}
          authenticated={auth?.authenticated}
          user={auth?.user}
        />
      ),
    },
    {
      path: "/instructor",
      element: (
        <RouteGuard
          element={<InstructorDashboardPage />}
          authenticated={auth?.authenticated}
          user={auth?.user}
        />
      ),
    },
    {
      path: "/instructor/edit-course/:courseId",
      element: (
        <RouteGuard
          element={<AddNewCoursePage />}
          authenticated={auth?.authenticated}
          user={auth?.user}
        />
      ),
    },
    {
      path: "/instructor/create-new-course",
      element: (
        <RouteGuard
          element={<AddNewCoursePage />}
          authenticated={auth?.authenticated}
          user={auth?.user}
        />
      ),
    },
    {
      path: "/",
      element: (
        <RouteGuard
          element={<StudentViewCommonLayout />}
          authenticated={auth?.authenticated}
          user={auth?.user}
        />
      ),
      children: [
        {
          path: "",
          element: <StudentHomePage />,
        },
        {
          path: "/home",
          element: <StudentHomePage />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
