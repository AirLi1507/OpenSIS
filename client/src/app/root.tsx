import { Outlet, useNavigate } from "react-router"
import { useContext, useEffect } from "react"
import "./root.css"
import ThemeContext from "../contexts/theme"

const Root = () => {
  const { theme, setTheme } = useContext(ThemeContext)

  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      try {
        let controller = new AbortController()
        const id = setTimeout(() => controller.abort(), 30000)
        const req = await fetch("/api/v1/auth/refresh", { credentials: "include", signal: controller.signal })
        clearTimeout(id)
        if (req.ok) {
          if (!location.pathname.includes("/dashboard/")) {
            navigate("/dashboard")
          }
        } else {
          if (!location.pathname.includes("/auth/")) {
            navigate("/auth/login")
          }
        }
      } catch (err) {
        console.error(`Could not refresh session: ${err}`)
        navigate("/auth/login")
      }
      return
    })()
  }, [])

  return (
    <div className={`w-svw h-svh bg ${theme}`}>
      <p className="bg-white m-4 p-2">{theme}</p>
      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="bg-white m-4 border-2 p-2">set theme to {theme ? "dark" : "light"}</button>
      <div className="w-full h-full dark:bg-black/50 backdrop-blur-xl backdrop-brightness-105 p-2">
        <div className="w-full h-full bg rounded-xl inset-shadow-[0_0_8px_rgba(0,0,0,.25)] dark:inset-shadow-none flex box-border overflow-x-hidden overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Root
