import { Outlet, useNavigate } from "react-router"
import { useContext, useEffect } from "react"
import "./root.css"
import ThemeContext from "../contexts/theme"

const Root = () => {
  const { theme } = useContext(ThemeContext)

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
    <div id="root" className={` ${theme}`}>
      {/*
      <p className="bg-white m-4 p-2">{theme}</p>
      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="bg-white m-4 border-2 p-2">set theme to {theme ? "dark" : "light"}</button>
      */}
      <div id="outer">
        <div id="inner">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Root
