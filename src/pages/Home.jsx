import NavBar from "../features/navbar/Navbar";
import ProductList from "../features/product/components/ProductList";

const Home = () => {
  return (
    <div>
      <NavBar>
        <ProductList></ProductList>
      </NavBar>
    </div>
  );
};

export default Home;
