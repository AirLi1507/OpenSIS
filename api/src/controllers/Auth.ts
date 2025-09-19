import { Request, Response } from "express"
import { RowDataPacket } from "mysql2"
import connection from "../config/database"
import logger from "../config/logger"
import argon2 from "argon2"
import { setAccessToken, setRefreshToken } from "./Cookie"
import jwt from "jsonwebtoken"

const loginUser = async (req: Request, res: Response) => {
  if (req.body == undefined) {
    res.status(400).json({
      error: "Request body not provided."
    })
    return
  }
  const { uid, password } = req.body
  if (uid == undefined) {
    res.status(400).json({
      error: "Username not provided."
    })
    return
  }
  if (password == undefined) {
    res.status(400).json({
      error: "Password not provided."
    })
    return
  }
  interface Hash extends RowDataPacket {
    password_hash: string
  }
  try {
    const [row] = await connection.query<Hash[]>("select distinct password_hash from user where uid = ?;", [uid])
    if (!row.length) {
      res.status(401).json({
        error: "Invalid credentials."
      })
      return
    }
    const hash = row[0].password_hash
    if (await argon2.verify(hash, password)) {
      interface Role extends RowDataPacket {
        role: string
      }
      try {
        const [row] = await connection.query<Role[]>("select distinct role from user where uid = ?;", [uid])
        const role = Number(row[0].role)
        setRefreshToken(res, uid, role)
        setAccessToken(res, uid, role)
        res.status(200).json({
          message: "Login successful."
        })
        return
      } catch (err) {
        logger.error(`An error occurred when retrieving user's role: ${err}`)
        res.status(500).json({
          error: "Could not retrieve user's role from database."
        })
        return
      }
    } else {
      res.status(401).json({
        error: "Invalid credentials."
      })
      return
    }
  } catch (err) {
    logger.error(`An error occurred when processing user's password: ${err}`)
    res.status(500).json({
      error: "Could not process the provided password."
    })
  }
  return
}

const logoutUser = async (_req: Request, res: Response) => {
  res.clearCookie("accessToken")
  res.clearCookie("refreshToken")
  res.json({
    message: "Logout successful."
  })
  return
}

const refreshUser = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies
  if (refreshToken == undefined) {
    res.status(401).json({
      error: "Refresh token not provided."
    })
    return
  }
  interface Token {
    uid: string
    role: number
  }
  const { JWT_SECRET_KEY } = process.env as { JWT_SECRET_KEY?: string }
  const secret = JWT_SECRET_KEY || "fallback_secret"
  try {
    const { uid, role } = jwt.verify(refreshToken, secret) as Token
    setAccessToken(res, uid, role)
    res.status(200).json({
      message: "Refreshed successfully."
    })
    return
  } catch (err) {
    logger.error(`An error occured when processing the refresh token provided: ${err}`)
    res.status(500).json({
      error: "Could not process the refresh token provided."
    })
  }
  return
}

export {
  loginUser,
  logoutUser,
  refreshUser
}
