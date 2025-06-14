import "./App.css";
import { Counter } from "./features/counter/Counter";
import Navbar from "./features/navbar/Navbar";
import ProductList from "./features/Product-list/ProductList";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SingupPage from "./pages/SingupPage";
import { createBrowserRouter, RouterProvider } from "react-router";

let router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SingupPage />,
  },
]);

function App() {
  return (
    <>
      <div>
        <RouterProvider router={router} />
      </div>
    </>
  );
}
export default App;