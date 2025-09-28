import DashboardContext from "../contexts/dashboard"

const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
  function toggleSidebar() {
    const dashboard = document.getElementById("dashboard")
    if (!dashboard) {
      return
    }
    dashboard.classList.toggle("sidebar")
    requestAnimationFrame(() => { })
    return
  }

  return (
    <DashboardContext.Provider value={{ toggleSidebar: toggleSidebar }}>
      {children}
    </DashboardContext.Provider>
  )
}

export default DashboardProvider
