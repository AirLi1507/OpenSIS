import express from "express"
import clientRoutes from "./client"
import apiRoutes from "./api"

const router = express().router

router.use("/api/v1", apiRoutes)
router.use("/", clientRoutes)

export default router
