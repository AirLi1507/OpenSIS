import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import logger from "../config/logger"

declare module "express" {
  interface Request {
    token?: {
      uid: string
      role: number
    }
  }
}

const token = async (req: Request, res: Response, next: NextFunction) => {
  const { accessToken } = req.cookies
  if (accessToken == undefined) {
    res.status(401).json({
      error: "Access token not provided."
    })
    return
  }
  const { JWT_SECRET_KEY } = process.env as { JWT_SECRET_KEY?: string }
  try {
    const decode = jwt.verify(
      accessToken,
      (
        JWT_SECRET_KEY
          ?
          JWT_SECRET_KEY
          :
          "fallback_secret"
      )
    ) as {
      uid: string
      role: number
    }
    req.token = decode
    next()
  } catch (err) {
    logger.error(`An error occured when processing access token: ${err}`)
    res.status(500).json({
      error: "Could not process the access token provided."
    })
    return
  }
  return
}

export default token
