import express, { Request, Response, NextFunction } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import helmet from "helmet"
const server = express()

server.use(express.urlencoded({ extended: true, limit: "2mb" }))
server.use(express.json())
server.use(cookieParser())
server.use(cors({ origin: "*" }))
server.use(helmet({
  contentSecurityPolicy: {
    directives: {
      imgSrc: [
        "'self'",
        "https://cdn.hypernix.dev"
      ],
      "script-src-attr": [
        "'unsafe-inline'"
      ]
    }
  }
}))

export default server
