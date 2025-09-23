import { Request, Response } from "express"
import connection from "../config/database"
import { RowDataPacket } from "mysql2"
import logger from "../config/logger"
import jwt, { JwtPayload } from "jsonwebtoken"
import { sendResetLink } from "./Email"
import argon2 from "argon2"

const requestReset = async (req: Request, res: Response) => {
  if (req.body == undefined) {
    res.status(400).json({
      error: "Request body not provided."
    })
    return
  }
  const { email } = req.body
  if (email == undefined) {
    res.status(400).json({
      error: "Email not provided."
    })
    return
  }
  interface Uid extends RowDataPacket {
    uid?: string
  }
  try {
    const [row] = await connection.query<Uid[]>("select distinct uid from user where email = ?;", [email])
    if (!row.length) {
      res.status(401).json({
        error: "Invalid email."
      })
      return
    }
    try {
      const token = jwt.sign(
        {
          uid: row[0].uid
        },
        process.env.JWT_SECRET || "fallback_secret",
        {
          algorithm: "HS512"
        }
      )
      sendResetLink(email, token)
      res.json({
        message: "Account reset link sent."
      })
      return
    } catch (err) {
      logger.error(`An error occurred when siging JWT with user's uid: ${err}`)
      res.status(500).json({
        error: "Could not create link for account reset."
      })
      return
    }
  } catch (err) {
    logger.error(`An error occured when trying to validate user with certain email address: ${err}`)
    res.status(500).json({
      error: "Could not validate the email provided."
    })
    return
  }
}

const processReset = async (req: Request, res: Response) => {
  if (req.body == undefined) {
    res.status(400).json({
      error: "Request body not provided."
    })
    return
  }
  const { token, password } = req.body
  if (token == undefined) {
    res.status(401).json({
      error: "Reset token not provided."
    })
    return
  }
  if (password == undefined) {
    res.status(400).json({
      error: "New password not provided."
    })
    return
  }
  interface Token extends JwtPayload {
    uid: string
  }
  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret") as Token
    const hash = await argon2.hash(password, {
      timeCost: 8,
      parallelism: 8,
      memoryCost: 65535
    })
    try {
      await connection.query("update user set password_hash = ? where uid = ?;", [hash, uid])
      res.json({
        message: "Password has been reset successfully."
      })
      return
    } catch (err) {
      logger.error(`An error occurred when updating user's new password to database: ${err}`)
      res.status(500).json({
        erorr: "Could not update new password to database."
      })
      return
    }
  } catch (err) {
    logger.error(`An error occurred when processing the reset token: ${err}`)
    res.status(500).json({
      error: "Could not process the reset token provided."
    })
    return
  }
}

export {
  requestReset,
  processReset
}
