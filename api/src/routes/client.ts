import express from "express"
import path from "path"

const server = express()

server.use(express.static(path.join(__dirname, "../../../client/dist")))

server.get("/", (_req, res) => { res.sendFile(path.join(__dirname, "../client/dist")) })

export default server
