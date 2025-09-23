import { createBrowserRouter } from "react-router";
import Root from "./app/root";
import Login from "./app/auth/login";

const router = createBrowserRouter([
  {
    path: "*",
    Component: () => { return <div>404</div> }
  },
  {
    path: "/",
    Component: Root,
    children: [
      {
        path: "auth",
        children: [
          {
            path: "login",
            Component: Login
          }
        ]
      }
    ]
  }
])

export default router
