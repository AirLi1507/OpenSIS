import { Outlet } from "react-router"
import Sidebar from "../../components/dashboard/sidebar"
import UserProvider from "../../providers/user"
import DashboardProvider from "../../providers/dashboard"
import "./index.css"

const Dashboard = () => {
  return (
    <DashboardProvider>
      <UserProvider>
        <div id="dashboard" className="sidebar">
          <Sidebar />
          <main>
            <Outlet />
          </main>
        </div>
      </UserProvider>
    </DashboardProvider>
  )
}

export default Dashboard
