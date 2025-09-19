import { Response } from "express"
import jwt from "jsonwebtoken"
import { evaluate } from "mathjs"

const {
  JWT_SECRET_KEY,
  ACCESS_TOKEN_EXPIRES_TIME,
  REFRESH_TOKEN_EXPIRES_TIME
} = process.env as {
  JWT_SECRET_KEY?: string,
  ACCESS_TOKEN_EXPIRES_TIME?: string,
  REFRESH_TOKEN_EXPIRES_TIME?: string
}

const secret = JWT_SECRET_KEY || "fallback_secret"

const expiry = {
  access: evaluate(REFRESH_TOKEN_EXPIRES_TIME || "54000000"),
  refresh: evaluate(ACCESS_TOKEN_EXPIRES_TIME || "604800000")
}

const signToken = (uid: string, role: number) => {
  return jwt.sign(
    {
      uid: uid,
      role: role
    },
    secret,
    {
      algorithm: "HS512"
    }
  )
}

const setAccessToken = async (res: Response, uid: string, role: number) => {
  res.cookie(
    "accessToken",
    signToken(uid, role),
    {
      sameSite: "strict",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: expiry.access
    }
  )
  return
}

const setRefreshToken = async (res: Response, uid: string, role: number) => {
  res.cookie(
    "refreshToken",
    signToken(uid, role),
    {
      sameSite: "strict",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: expiry.refresh
    }
  )
  return
}

export { setAccessToken, setRefreshToken }
