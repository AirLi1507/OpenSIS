import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const server = express()

server.use(express.urlencoded({ extended: true, limit: "2mb" }))
server.use(express.json())
server.use(cookieParser())
server.use(cors({ origin: "*" }))

export default server
