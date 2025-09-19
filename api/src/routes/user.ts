import express from "express"
import token from "../middleware/Token"
import { getProfile, getProfilePicture, getProfilePictureByUID } from "../controllers/User"

const server = express().router

server.use(token)

server.get("/test", (_req, res) => { res.send("OK") })
server.get("/", getProfile)
server.get("/pfp", getProfilePicture)
server.post("/pfp", getProfilePictureByUID)

export default server
