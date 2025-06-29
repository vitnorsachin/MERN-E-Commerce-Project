import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SingupPage from "./pages/SingupPage";
import { CartPage } from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import ProductDetailPage from "./pages/ProductDetailPage";
import Protected from "./features/auth/components/Protected";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import { selectLoggedInUser } from "./features/auth/authSlice";
import { useEffect } from "react";

let router = createBrowserRouter([
  {
    path: "/",
    element: <Protected><Home /></Protected>,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SingupPage />,
  },
  {
    path: "/cart",
    element: <Protected><CartPage /></Protected>,
  },
  {
    path: "/checkout",
    element: <Protected><Checkout /></Protected>,
  },
  {
    path: "/product-detail/:id",
    element: <Protected><ProductDetailPage/></Protected>,
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  
  useEffect(() => {
    if(user){
      dispatch(fetchItemsByUserIdAsync(user.id));
    }
  }, [dispatch, user])
  

  return (
    <>
      <div>
        <RouterProvider router={router} />
      </div>
    </>
  );
}
export default App;
