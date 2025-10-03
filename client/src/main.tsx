import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import router from './router'
import "./index.css"
import "./i18n.js"
import ThemeProvider from './providers/theme.js'

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <ThemeProvider>
    <RouterProvider router={router} />
  </ThemeProvider>
)
