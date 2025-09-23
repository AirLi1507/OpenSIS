import { IconAddressBook, IconBallBasketball, IconBooks, IconCheckbox, IconDoorExit, IconFilePencil, IconHome, IconPhoto, IconSettings, IconShield, IconUser, type Icon } from "@tabler/icons-react"
import { Link, useLocation, type To } from "react-router"
import "./sidebar.css"
import { useContext, useEffect, useState } from "react"
import Logo from "../brand/logo"
import Title from "../brand/title"
import UserContext from "../../contexts/user"

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
  const { chi_name, eng_name, form, className, classNo, role } = useContext(UserContext)
  return (
    <nav>
      <div className="mx-auto mt-10 mb-8">
        <Logo size={72} />
      </div>
      <div className="mx-auto mb-4">
        <Title />
      </div>
      <Tab to="" icon={IconHome} text="Home" />
      <Tab to="profile" icon={IconAddressBook} text="Profile" />
      <Tab to="homework" icon={IconFilePencil} text="Homework" />
      <Tab to="ec" icon={IconBallBasketball} text="Extension Curriculum" />
      <Tab to="reading" icon={IconBooks} text="Reading" />
      <Tab to="ss" icon={IconCheckbox} text="Subject Selection" />
      <div className="mt-auto flex flex-col">
        <Tab to="/auth/logout" icon={IconDoorExit} text="Logout" />
        {
          Number(role) > 0
          &&
          <>
            <Tab to="album" icon={IconPhoto} text="Album" />
            <Tab to="admin" icon={IconShield} text="Administration" />
          </>
        }
        <Tab to="settings" icon={IconSettings} text="Settings" />
        <Tab to="#" icon={IconUser} text={
          Number(role) > 1
            ?
            `${chi_name && chi_name} ${eng_name}`
            :
            `${form}${className}-${classNo} ${chi_name && chi_name} ${eng_name}`
        } />
      </div>
    </nav>
  )
}

export default Sidebar
