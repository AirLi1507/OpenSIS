import { createBrowserRouter } from "react-router";
import Root from "./app/root";
import Login from "./app/auth/login";
import Reset from "./app/auth/reset";
import ResetPassword from "./app/auth/reset-password";
import Dashboard from "./app/dashboard";
import Home from "./app/dashboard/home";

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
          },
          {
            path: "reset-password",
            Component: ResetPassword
          }
        ]
      },
      {
        path: "dashboard",
        Component: Dashboard,
        children: [
          {
            path: "",
            Component: Home
          },
          {
            path: "profile",
            Component: () => { return <>profile</> }
          }
        ]
      }
    ]
  }
])

export default router
