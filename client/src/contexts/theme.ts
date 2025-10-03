import { createContext } from "react"

interface Theme {
  theme: "light" | "dark"
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>
}

const ThemeContext = createContext<Theme>({
  theme: "light",
  setTheme: () => { }
})

export default ThemeContext
