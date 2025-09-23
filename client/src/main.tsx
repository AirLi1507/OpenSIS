import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import router from './router'
import "./index.css"
import "./i18n.js"

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <RouterProvider router={router} />
)
