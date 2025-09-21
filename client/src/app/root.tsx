import { Outlet } from "react-router"
import "./root.css"

const Root = () => {
  return (
    <div className="w-svw h-svh bg">
      <Outlet />
    </div>
  )
}

export default Root
