import express from "express"
import { getYear } from "../controllers/Info"
import token from "../middleware/Token"

const server = express().router

server.use(token)

server.get("/year", getYear)

export default server
