import { Request, Response } from "express"
import path from "path"
import fs from "fs"
import { RowDataPacket } from "mysql2"
import connection from "../config/database"
import logger from "../config/logger"

const getProfile = async (req: Request, res: Response) => {
  if (req.token == undefined) {
    res.status(500).json({
      error: "Access token is not processed."
    })
    return
  }
  interface User extends RowDataPacket {
    uid?: string
    chi_name?: string
    eng_name?: string
    form?: string
    className?: string
    classNo?: string
    role?: string
  }
  const { uid } = req.token
  try {
    const [row] = await connection.query<User[]>("select distinct uid, chi_name, eng_name, form, className, classNo, role from user where uid = ?;", [uid])
    const profile: User = row[0]
    res.json(profile)
  } catch (err) {
    logger.error(`An error occurred when retrieving user profile: ${err}`)
    res.status(500).json({
      error: "Could not retrieve user profile from database."
    })
  }
  return
}

const getProfilePicture = async (req: Request, res: Response) => {
  if (req.token == undefined) {
    res.status(500).json({
      error: "Access token is not processed."
    })
    return
  }
  const { uid } = req.token
  const filename = uid + ".jpg"
  const filepath = path.join(__dirname, "../../data/student_photo/", filename)
  if (fs.existsSync(filepath)) {
    res.sendFile(filepath)
  } else {
    res.status(404).json({
      error: "File not found."
    })
  }
  return
}

const getProfilePictureByUID = (req: Request, res: Response) => {
  if (req.token == undefined) {
    res.status(500).json({
      error: "Access token is not processed."
    })
    return
  }
  if (req.token.role < 1) {
    res.status(403).json({
      error: "Permission denied."
    })
    return
  }
  if (req.body == undefined) {
    res.status(400).json({
      error: "Request body is not provided."
    })
    return
  }
  const { uid } = req.body
  const filename = uid + ".jpg"
  const filepath = path.join(__dirname, "../../data/student_photo/", path.basename(filename))
  if (fs.existsSync(filepath)) {
    res.sendFile(filepath)
  } else {
    res.status(404).json({
      error: "File not found."
    })
  }
  return
}

export {
  getProfile,
  getProfilePicture,
  getProfilePictureByUID
}
