import { createBrowserRouter } from "react-router";
import Root from "./app/root";
import Login from "./app/auth/login";
import Reset from "./app/auth/reset";

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
          },
          {
            path: "reset",
            Component: Reset
          }
        ]
      }
    ]
  }
])

export default router
