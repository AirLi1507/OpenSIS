import useSWR from "swr"
import UserContext from "../contexts/user"
import fetcher from "../utils/fetcher"

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, error, isLoading } = useSWR("/api/v1/user", fetcher("json"))
  if (isLoading) {
    return (
      <UserContext.Provider value={{}} />
    )
  }
  if (error) {
    return (
      <div>error, cant get user data</div>
    )
  }
  if (data) {
    return (
      <UserContext.Provider value={data}>
        {children}
      </UserContext.Provider>
    )
  }
}

export default UserProvider
