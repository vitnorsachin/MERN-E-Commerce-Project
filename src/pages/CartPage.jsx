import { Cart } from "../features/cart/Cart";
import NavBar from "../features/navbar/Navbar";
export const CartPage = () => {
  return (
    <div>
      <NavBar>
        <Cart></Cart>
      </NavBar>
    </div>
  );
};