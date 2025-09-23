import { useState } from "react"
import Logo from "../../components/brand/logo"
import Title from "../../components/brand/title"
import { Link } from "react-router"
import { IconMail, IconSignLeft } from "@tabler/icons-react"
import "./index.css"
import { useTranslation } from "react-i18next"

const Reset = () => {
  const { t } = useTranslation()

  const [email, setEmail] = useState<string>("")
  const [success, setSuccess] = useState<boolean | undefined>()

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const req = await fetch("/api/v1/account/reset", {
      method: "post",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email
      })
    })
    setSuccess(req.ok)
    return
  }

  return (
    <div className="m-auto flex flex-col gap-4">
      <form onSubmit={submit} className="card">
        <div className="mx-auto mt-4 mb-2">
          <Logo size={56} />
        </div>
        <Title />
        <div className="text-sky-700/85 textbox">
          <IconMail stroke={1.5} />
          <input onChange={(e) => setEmail(e.target.value)} required type="email" placeholder={t("auth.email")} className="w-full ml-1 outline-none" />
        </div>
        <button type="submit" className="submit">{t("auth.reset")}</button>
        <Link to="/auth/login" className="anchor">
          <IconSignLeft stroke={1.75} size={20} />
          <span>{t("auth.go_back")}</span>
        </Link>
      </form>
      {
        success == undefined
          ?
          null
          :
          <div className="text-sky-900 prompt">
            {
              success
                ?
                `${t("auth.email_sent")}${email}`
                :
                t("auth.email_error")
            }
          </div>
      }
    </div>
  )
}

export default Reset
