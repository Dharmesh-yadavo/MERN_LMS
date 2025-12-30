import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthPage } from "./pages/auth/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      // {
      //   path: "/",
      //   element: <Home />,
      // },
      {
        path: "/auth",
        element: <AuthPage />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
