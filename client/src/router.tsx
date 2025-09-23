import { createBrowserRouter } from "react-router";
import Root from "./app/root";
import Login from "./app/auth/login";
import Reset from "./app/auth/reset";
import ResetPassword from "./app/auth/reset-password";
import Dashboard from "./app/dashboard";
import Home from "./app/dashboard/home";
import Logout from "./app/auth/logout";

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
            path: "logout",
            Component: Logout
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
          },
          {
            path: "homework",
            Component: () => { return <>homework</> }
          },
          {
            path: "ec",
            Component: () => { return <>ec</> }
          },
          {
            path: "reading",
            Component: () => { return <>reading</> }
          },
          {
            path: "ss",
            Component: () => { return <>ss</> }
          },
          {
            path: "album",
            Component: () => { return <>album</> }
          },
          {
            path: "admin",
            Component: () => { return <>admin</> }
          },
          {
            path: "settings",
            Component: () => { return <>settings</> }
          }
        ]
      }
    ]
  }
])

export default router
