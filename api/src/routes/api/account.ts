import express from "express"
import { processReset, requestReset } from "../../controllers/Account"

const server = express().router

server.post("/reset", requestReset)
server.post("/reset/confirm", processReset)

export default server
