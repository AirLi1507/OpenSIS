import express from "express"
import { getAttendedEC, getAvailableEC, getRegisterExpiry, registerEC, setRegisterExpiry } from "../controllers/EC"
import token from "../middleware/Token"

const server = express().router

server.use(token)

server.get("/available", getAvailableEC)
server.get("/attended", getAttendedEC)
server.get("/expiry", getRegisterExpiry)
server.post("/expiry", setRegisterExpiry)
server.post("/join", registerEC)

export default server
