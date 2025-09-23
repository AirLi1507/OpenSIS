import Sidebar from "../../components/dashboard/sidebar"
import UserProvider from "../../providers/user"

const Dashboard = () => {
  return (
    <UserProvider>
      <div className="w-full h-full bg-white/35 inset-shadow-[0_0_4px_rgba(0,0,0,.5)] rounded-xl backdrop-blur-xl flex">
        <Sidebar />
      </div>
    </UserProvider>
  )
}

export default Dashboard
