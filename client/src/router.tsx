import { createBrowserRouter } from "react-router";
import Root from "./app/root";

const router = createBrowserRouter([
  {
    path: "*",
    Component: () => { return <div>404</div> }
  },
  {
    path: "/",
    Component: Root,
    children: []
  }
])

export default router
