import express from "express"
import clientRoutes from "./client"
import apiRoutes from "./api"

const router = express().router

router.use("/", clientRoutes)
router.use("/api/v1", apiRoutes)

export default router
