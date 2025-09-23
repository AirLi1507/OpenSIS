import { useState } from "react"
import Logo from "../../components/brand/logo"
import Title from "../../components/brand/title"
import { Link } from "react-router"
import { IconMail, IconSignLeft } from "@tabler/icons-react"
import "./index.css"

const Reset = () => {
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
        <Link to="/auth/login" className="anchor">
          <IconSignLeft stroke={1.75} size={20} />
          <span>Go back</span>
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
                `Account reset link has been sent to ${email} successfully.`
                :
                "Could not reset your account, please try again later."
            }
          </div>
      }
    </div>
  )
}

export default Reset
