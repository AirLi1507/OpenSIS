import { IconMail, IconSignLeft } from "@tabler/icons-react"
import Title from "../../components/brand/title"
import "./index.css"
import { useState } from "react"
import Logo from "../../components/brand/logo"
import { Link } from "react-router"

const Reset = () => {
  const [email, setEmail] = useState<string>("")
  const [success, setSuccess] = useState<boolean | undefined>()
  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const req = await fetch("/api/v1/auth/reset", {
      method: "post",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email
      })
    })
    setSuccess(req.ok)
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
          <input onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="Email" className="w-full ml-1 outline-none" />
        </div>
        <button type="submit" className="submit">Reset</button>
        <Link to="/auth/login">
          <IconSignLeft stroke={1.75} size={20} />
          <span>Go back</span>
        </Link>
      </form>
      {
        success == undefined
          ?
          null
          :
          <div className="text-sky-900 text-sm w-fit m-auto bg-white/50 rounded-lg shadow-md backdrop-blur-md backdrop-brightness-110 backdrop-saturate-125 flex flex-col gap-4 p-3 select-none">
            {
              success
                ?
                "Account has been reset successfully."
                :
                "Could not reset your account, please try again later."
            }
          </div>
      }
    </div>
  )
}

export default Reset
