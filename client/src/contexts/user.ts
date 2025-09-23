import { createContext } from "react"

interface User {
  uid?: string
  chi_name?: string
  eng_name?: string
  form?: string
  className?: string
  classNo?: string
  role?: string
}

const UserContext = createContext<User>({})

export default UserContext
