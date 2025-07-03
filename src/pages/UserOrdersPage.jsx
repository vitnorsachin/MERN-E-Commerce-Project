import NavBar from "../features/navbar/Navbar";
import { UserOrders } from "../features/user/components/UserOrders";
const UserOrdersPage = () => {
  return (
    <NavBar>
      <UserOrders></UserOrders>
    </NavBar>
  );
};
export default UserOrdersPage;