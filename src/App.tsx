import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import RootLayout from "./pages/RootLayout";
import Error from "./pages/Error";
import Dashboard from "./pages/Dashboard";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <Error />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/About", element: <About /> },
        { path: "/Contact", element: <Contact /> },
        { path: "/Dashboard", element: <Dashboard /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
