import express from "express"
import token from "../../middleware/Token"
import { getAttendedEC, getAvailableEC, getRegisterExpiry, registerEC, setRegisterExpiry } from "../../controllers/EC"

const server = express().router

server.use(token)

server.get("/available", getAvailableEC)
server.get("/attended", getAttendedEC)
server.get("/expiry", getRegisterExpiry)
server.post("/expiry", setRegisterExpiry)
server.post("/join", registerEC)

export default server
