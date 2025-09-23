import { IconAddressBook, IconHome, type Icon } from "@tabler/icons-react"
import { Link, useLocation, type To } from "react-router"
import "./sidebar.css"
import { useEffect, useState } from "react"
import Logo from "../brand/logo"
import Title from "../brand/title"

interface Tab {
  to: To
  icon: Icon
  text: string
}

const Tab = (prop: Tab) => {
  const [tabActive, setTabActive] = useState<boolean>(false)
  const location = useLocation()
  useEffect(() => {
    const lastIndex = location.pathname.split("/").pop()
    if (lastIndex === "dashboard" && prop.to === "") {
      setTabActive(true)
    } else if (lastIndex === prop.to) {
      setTabActive(true)
    } else {
      setTabActive(false)
    }
  }, [location])
  return (
    <Link to={prop.to} className={`tab ${tabActive ? "text-white bg-sky-500/60" : "hover:bg-sky-500/25"}`}>
      <prop.icon stroke={1.5} />
      <span>{prop.text}</span>
    </Link>
  )
}

const Sidebar = () => {
  return (
    <nav className="bg-sky-50/25 shadow-lg flex flex-col px-4">
      <div className="mx-auto mt-10 mb-8">
        <Logo size={72} />
      </div>
      <div className="mx-auto mb-4">
        <Title />
      </div>
      <Tab to="" icon={IconHome} text="Home" />
      <Tab to="profile" icon={IconAddressBook} text="Profile" />
    </nav>
  )
}

export default Sidebar
