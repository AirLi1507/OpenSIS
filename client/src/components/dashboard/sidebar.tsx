import { IconAddressBook, IconBallBasketball, IconBooks, IconCheckbox, IconChevronCompactLeft, IconChevronCompactRight, IconDoorExit, IconFilePencil, IconHome, IconPhoto, IconSettings, IconShield, IconUser, type Icon } from "@tabler/icons-react"
import { Link, useLocation, type To } from "react-router"
import "./sidebar.css"
import { useContext, useEffect, useState } from "react"
import Logo from "../brand/logo"
import UserContext from "../../contexts/user"
import { useTranslation } from "react-i18next"
import DashboardContext from "../../contexts/dashboard"

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
    <Link to={prop.to} className={`tab ${tabActive ? "text-white bg-sky-500/60 dark:bg-sky-500/85" : "hover:bg-sky-500/25"}`}>
      <prop.icon stroke={1.5} />
      <span>{prop.text}</span>
    </Link>
  )
}

const Sidebar = () => {
  const { t } = useTranslation()

  const { toggleSidebar } = useContext(DashboardContext)

  console.log(toggleSidebar)

  const { chi_name, eng_name, form, className, classNo, role } = useContext(UserContext)

  return (
    <>
      <nav>
        <div className="mx-auto mt-10 mb-8">
          <Logo size={72} />
        </div>
        <div className="mx-auto mb-4">
          <span className="text-sky-700 dark:text-sky-400 text-2xl font-bold mx-auto select-none">OpenSIS</span>
        </div>
        <Tab to="" icon={IconHome} text={t("tab_name.home")} />
        <Tab to="profile" icon={IconAddressBook} text={t("tab_name.profile")} />
        <Tab to="homework" icon={IconFilePencil} text={t("tab_name.homework")} />
        <Tab to="ec" icon={IconBallBasketball} text={t("tab_name.ec")} />
        <Tab to="reading" icon={IconBooks} text={t("tab_name.reading")} />
        <Tab to="ss" icon={IconCheckbox} text={t("tab_name.ss")} />
        <div className="mt-auto flex flex-col">
          <Tab to="/auth/logout" icon={IconDoorExit} text={t("auth.logout")} />
          {
            Number(role) > 0
            &&
            <>
              <Tab to="album" icon={IconPhoto} text={t("tab_name.album")} />
              <Tab to="admin" icon={IconShield} text={t("tab_name.admin")} />
            </>
          }
          <Tab to="settings" icon={IconSettings} text={t("tab_name.settings")} />
          <Tab to="#" icon={IconUser} text={
            Number(role) > 1
              ?
              `${chi_name && chi_name} ${t("user.teacher")} ${eng_name}`
              :
              `${form}${className}-${classNo} ${chi_name && chi_name} ${eng_name}`
          } />
        </div>
        <div className="h-full ml-60 flex absolute top-0">
          <button onClick={toggleSidebar} aria-label="Sidebar Toggle" className="toggle">
            <IconChevronCompactLeft stroke={1.5} />
          </button>
        </div>
      </nav>
      <div className="h-full ml-74 flex absolute top-0">
        <button onClick={toggleSidebar} aria-label="Sidebar Toggle" id="toggle" className="toggle">
          <IconChevronCompactRight stroke={1.5} />
        </button>
      </div>
    </>
  )
}

export default Sidebar
