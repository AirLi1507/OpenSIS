import express from "express"
import token from "../middleware/Token"
import { getStudentList } from "../controllers/Class"

const server = express().router

server.use(token)

server.post("/students", getStudentList)

export default server
