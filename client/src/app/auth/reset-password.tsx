import { IconPassword, IconZoomCheck } from "@tabler/icons-react"
import "./index.css"
import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router"
import Logo from "../../components/brand/logo"
import Title from "../../components/brand/title"

const ResetPassword = () => {
  const [password, setPassword] = useState<string>("")
  const [consistence, setConsistence] = useState<boolean | undefined>()
  const [success, setSuccess] = useState<boolean | undefined>()

  const [searchParams] = useSearchParams()

  const navigate = useNavigate()

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!consistence) {
      return
    }
    const token = searchParams.get("token")
    const req = await fetch("/api/v1/account/reset/confirm", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: token,
        password: password
      })
    })
    setSuccess(req.ok)
    setTimeout(() => navigate("/auth/login"), 5000)
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
          <IconPassword />
          <input onChange={(e) => setPassword(e.target.value)} required placeholder="New Password" className="w-full ml-1 outline-none" />
        </div>
        <div className="text-sky-700/85 textbox">
          <IconZoomCheck />
          <input onChange={(e) => setConsistence(password === e.target.value)} required placeholder="Confirm Password" className="w-full ml-1 outline-none" />
        </div>
        <button className="submit">Confirm</button>
      </form>
      {
        consistence == undefined
          ?
          null
          :
          (
            consistence
              ?
              null
              :

              <div className="text-rose-700 text-sm w-fit m-auto bg-white/50 rounded-lg shadow-md backdrop-blur-md backdrop-brightness-110 backdrop-saturate-125 flex flex-col gap-4 p-3 select-none">
                Passwords mismatch!
              </div>
          )
      }
      {
        success == undefined
          ?
          null
          :
          <div className={`${success ? "text-emerald-600" : "text-rose-700"} text-sm w-fit m-auto bg-white/50 rounded-lg shadow-md backdrop-blur-md backdrop-brightness-110 backdrop-saturate-125 flex flex-col gap-4 p-3 select-none`}>
            {
              success
                ?
                "Password has been reset successfully."
                :
                "Could not reset password, please try again later."
            }
          </div>

      }
    </div>
  )
}

export default ResetPassword
