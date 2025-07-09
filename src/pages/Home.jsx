import { Link } from "react-router-dom";
import NavBar from "../features/navbar/Navbar";
import ProductList from "../features/product/components/ProductList";

const Home = () => {
  return (
    <div>
      <NavBar>
        <ProductList></ProductList>
      </NavBar>
      <Link to="/admin">Admin</Link>
    </div>
  );
};
export default Home;