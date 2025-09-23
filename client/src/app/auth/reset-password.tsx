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

  function consistencyCheck() {
    const input = document.querySelectorAll("input")
    setConsistence(input[0].value === input[1].value)
    if (consistence != undefined) {
      document.querySelector("button")!.disabled = consistence
    }
  }

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
          <input onChange={(e) => { setPassword(e.target.value); consistencyCheck() }} required placeholder="New Password" className="w-full ml-1 outline-none" />
        </div>
        <div className="text-sky-700/85 textbox">
          <IconZoomCheck />
          <input onChange={consistencyCheck} required placeholder="Confirm Password" className="w-full ml-1 outline-none" />
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

              <div className="text-rose-700 prompt">
                Passwords mismatch!
              </div>
          )
      }
      {
        success == undefined
          ?
          null
          :
          <div className={`${success ? "text-emerald-600" : "text-rose-700"} prompt`}>
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
