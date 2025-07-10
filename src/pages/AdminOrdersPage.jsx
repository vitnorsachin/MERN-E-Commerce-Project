import NavBar from "../features/navbar/Navbar";
import AdminOrders from "../features/admin/components/AdminOrders";
const AdminOrdersPage = () => {
  return (
    <div>
      <NavBar>
        <AdminOrders></AdminOrders>
      </NavBar>
    </div>
  );
};
export default AdminOrdersPage;