import { IconEye, IconEyeOff, IconKey, IconUser } from "@tabler/icons-react"
import { useState } from "react"
import { useNavigate } from "react-router"
import Logo from "../../components/brand/logo"

const Login = () => {
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
    <form onSubmit={submit} className="w-60 m-auto bg-sky-300/20 rounded-lg shadow-md backdrop-blur-md backdrop-brightness-110 backdrop-saturate-125 flex flex-col gap-4 p-4 select-none">
      <div className="mx-auto mt-4 mb-2">
        <Logo size={56} />
      </div>
      <span className="text-sky-700 text-2xl font-bold mx-auto">OpenSIS</span>
      <div className="text-sky-700/85 bg-white/20 hover:bg-white/45 focus-within:bg-white/45 rounded-sm inset-shadow-[0_0_4px_rgba(0,0,0,.25)] flex duration-250 p-2 box-border">
        <IconUser stroke={1.5} />
        <input onChange={(e) => { setUid(e.target.value) }} required type="text" placeholder="Username" className="w-full ml-1 outline-none" />
      </div>
      <div className="text-sky-700/85 bg-white/20 hover:bg-white/45 focus-within:bg-white/45 rounded-sm inset-shadow-[0_0_4px_rgba(0,0,0,.25)] flex duration-250 p-2 box-border">
        <IconKey stroke={1.5} />
        <input onChange={(e) => { setPassword(e.target.value) }} required minLength={6} type={visible ? "text" : "password"} placeholder="Password" className="w-full ml-1 outline-none" />
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
      <button type="submit" className="text-sky-800/85 hover:text-white font-bold bg-white/50 hover:bg-sky-600/75 rounded-sm shadow-sm duration-250 p-2 cursor-pointer">Login</button>
    </form>
  )
}

export default Login
