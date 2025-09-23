import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import Logo from "../../components/brand/logo"
import Title from "../../components/brand/title"
import "./index.css"

const Logout = () => {
  const [success, setSuccess] = useState<boolean | undefined>()

  const navigate = useNavigate()

  async function logout() {
    const req = await fetch("/api/v1/auth/logout", { credentials: "include" })
    setSuccess(req.ok)
  }

  useEffect(() => {
    logout()
  }, [])

  useEffect(() => {
    if (success) {
      navigate("/auth/login")
    }
  }, [success])

  return (
    <form className="card">
      <div className="mx-auto mt-10 mb-4">
        <Logo size={56} spin />
      </div>
      <Title />
    </form>
  )
}

export default Logout
