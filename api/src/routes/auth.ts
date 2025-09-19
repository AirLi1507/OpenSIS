import express from "express"
import { loginUser, logoutUser, refreshUser } from "../controllers/Auth"

const server = express().router

server.post("/login", loginUser)
server.get("/logout", logoutUser)
server.get("/refresh", refreshUser)

export default server
