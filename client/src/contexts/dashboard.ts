import { createContext } from "react";

interface Dashboard {
  toggleSidebar: () => void
}

const DashboardContext = createContext<Dashboard>({ toggleSidebar: () => { } })

export default DashboardContext
