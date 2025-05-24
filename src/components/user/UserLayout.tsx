
import { Outlet } from "react-router-dom";
import UserHeader from "./UserHeader";
import UserFooter from "./UserFooter";

interface UserLayoutProps {
  isAuthenticated: boolean;
}

const UserLayout = ({ isAuthenticated }: UserLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <UserHeader isAuthenticated={isAuthenticated} />
      <main className="flex-1">
        <Outlet />
      </main>
      <UserFooter />
    </div>
  );
};

export default UserLayout;
