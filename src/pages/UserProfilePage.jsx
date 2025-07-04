import NavBar from "../features/navbar/Navbar";
import UserProfile from "../features/user/components/UserProfile";
const UserProfilePage = () => {
  return (
    <div>
      <NavBar>
        <UserProfile></UserProfile>
      </NavBar>
    </div>
  );
};
export default UserProfilePage;