import SideNav from "../../components/Dashboard/SideNav";
import Nav from "../../components/Dashboard/Nav";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideNav />
      <div className="flex-1 flex-col min-w-0 ">
        <Nav />
        <div className="flex-1 justify-center items-center overflow-auto p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
