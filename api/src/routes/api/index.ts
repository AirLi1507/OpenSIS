import express from "express"
import userRoutes from "./user"
import authRoutes from "./auth"
import classRoutes from "./class"
import ecRoutes from "./ec"
import infoRoutes from "./info"
import accountRoutes from "./account"

const server = express().router

server.use("/user", userRoutes)
server.use("/auth", authRoutes)
server.use("/class", classRoutes)
server.use("/ec", ecRoutes)
server.use("/info", infoRoutes)
server.use("/account", accountRoutes)

export default server

