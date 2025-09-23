import { useState } from "react"
import { useNavigate, Link } from "react-router"
import { useTranslation } from "react-i18next"
import Logo from "../../components/brand/logo"
import Title from "../../components/brand/title"
import { IconEye, IconEyeOff, IconKey, IconLockQuestion, IconUser } from "@tabler/icons-react"
import "./index.css"

const Login = () => {
  const { t } = useTranslation()

  const [uid, setUid] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [visible, setVisible] = useState<boolean>(false)

  const navigate = useNavigate()

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const request = await fetch("/api/v1/auth/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        uid: uid,
        password: password
      })
    })
    if (request.ok) {
      navigate("/dashboard")
    } else {
      document.querySelectorAll("div").forEach((e) => {
        e.classList.replace("text-sky-700/85", "text-rose-600/62.5")
      })
    }
    return
  }

  return (
    <form onSubmit={submit} className="card">
      <div className="mx-auto mt-4 mb-2">
        <Logo size={56} />
      </div>
      <Title />
      <div className="text-sky-700/85 textbox">
        <IconUser stroke={1.5} />
        <input onChange={(e) => { setUid(e.target.value) }} required type="text" placeholder={t("auth.username")} className="w-full ml-1 outline-none" />
      </div>
      <div className="text-sky-700/85 textbox">
        <IconKey stroke={1.5} />
        <input onChange={(e) => { setPassword(e.target.value) }} required minLength={6} type={visible ? "text" : "password"} placeholder={t("auth.password")} className="w-full ml-1 outline-none" />
        <button type="button" onClick={() => setVisible(!visible)} className="cursor-pointer">
          {
            visible
              ?
              <IconEyeOff stroke={1.25} />
              :
              <IconEye stroke={1.25} />
          }
        </button>
      </div>
      <button type="submit" className="submit">{t("auth.login")}</button>
      <Link to="/auth/reset" className="anchor">
        <IconLockQuestion stroke={1.75} size={20} />
        <span>{t("auth.forget_pw")}</span>
      </Link>
    </form>
  )
}

export default Login
