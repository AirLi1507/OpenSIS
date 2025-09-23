import { Outlet, useNavigate } from "react-router"
import { useEffect } from "react"
import "./root.css"

const Root = () => {
  const navigate = useNavigate()
  useEffect(() => {
    async function refresh() {
      const req = await fetch("/api/v1/auth/refresh", { credentials: "include" })
      if (req.ok) {
        navigate("/dashboard")
        return
      } else {
        if (!location.pathname.includes("/auth/")) {
          navigate("/auth/login")
        }
        return
      }
    }
    refresh()
  }, [])
  return (
    <div className="w-svw h-svh bg">
      <div className="w-full h-full backdrop-blur-xl backdrop-brightness-105 p-2">
        <div className="w-full h-full bg rounded-xl inset-shadow-[0_0_8px_rgba(0,0,0,.25)] flex box-border overflow-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Root
