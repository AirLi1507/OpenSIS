import { Outlet } from "react-router"
import Sidebar from "../../components/dashboard/sidebar"
import UserProvider from "../../providers/user"
import "./index.css"

const Dashboard = () => {
  return (
    <UserProvider>
      <div id="dashboard" className="sidebar">
        <Sidebar />
        <main>
          <Outlet />
        </main>
      </div>
    </UserProvider>
  )
}

export default Dashboard
