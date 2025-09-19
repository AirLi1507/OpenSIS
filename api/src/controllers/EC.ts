import { Request, Response } from "express";
import connection from "../config/database"
import logger from "../config/logger";
import { RowDataPacket } from "mysql2";

interface EC extends RowDataPacket {
  id: string
  name: string
  description: string
  teacher: string
  cost: string
}

let registerExpiry = 0

const getAvailableEC = async (req: Request, res: Response) => {
  if (req.token == undefined) {
    res.status(401).json({
      error: "Access token is not processed."
    })
    return
  }
  try {
    const [row] = await connection.query<EC[]>("select id as ec_id, name, description, teacher, cost from ec;")
    res.json(row)
  } catch (err) {
    logger.error(`An error occurred when retrieving available EC(s): ${err}`)
    res.status(500).json({
      error: "Could not retrieve available EC(s) from database."
    })
  }
  return
}

const getAttendedEC = async (req: Request, res: Response) => {
  if (req.token == undefined) {
    res.status(401).json({
      error: "Access token is not processed."
    })
    return
  }
  const { uid } = req.token
  try {
    const [row] = await connection.query<EC[]>(`
      select
        ec.id as ec_id,
        ec.name,
        ec.description,
        ec.teacher as teacher,
        ec.cost
      from
        ec 
      left join
        attendance
      on
        ec.id = attendance.ec_id
      left join
        user
      on
        ec.teacher = user.uid
      where
        attendance.uid = ?
      ;
    `, [uid])
    res.json(row)
  } catch (err) {
    logger.error(`An error occurred when retrieving joined EC(s): ${err}`)
    res.status(500).json({
      error: "Could not retrieve joined EC(s) from database."
    })
  }
  return
}

const getRegisterExpiry = async (req: Request, res: Response) => {
  if (req.token == undefined) {
    res.status(401).json({
      error: "Access token is not processed."
    })
    return
  }
  res.json(registerExpiry)
  return
}

const setRegisterExpiry = async (req: Request, res: Response) => {
  if (req.token == undefined) {
    res.status(401).json({
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
      error: "Request body not provided."
    })
    return
  }
  const days: number = Number(req.body.val)
  registerExpiry = Number(new Date()) + (days * 86400000)
  res.status(201).json({
    message: "Expiry date set successfully."
  })
  return
}

const registerEC = async (req: Request, res: Response) => {
  if (req.token == undefined) {
    res.status(401).json({
      error: "Access token is not processed."
    })
    return
  }
  if (req.body == undefined) {
    res.status(400).json({
      error: "Request body not provided."
    })
    return
  }
  if (new Date().getTime() > registerExpiry) {
    res.status(403).json({
      error: "Registration deadline has passed."
    })
    return
  }
  const { uid } = req.token
  const body: { 0: string, 1: string, 2: string } = req.body
  const array = [body[0], body[1], body[2]]
  const { YEAR } = process.env as { YEAR?: string }
  const date = new Date().toISOString().split("T")[0]
  try {
    array.forEach((i) => {
      if (i === "") {
        return
      }
      connection.query("insert into attendance values (?, ?, ?, ?);", [uid, i, date, YEAR])
    })
    res.status(201).json({
      message: "Successfully registered for EC(s)."
    })
  } catch (err) {
    logger.error(`An error occurred when adding user's EC record: ${err}`)
    res.status(500).json({
      error: "Could not join specified EC(s)."
    })
  }
  return
}

export {
  getAvailableEC,
  getAttendedEC,
  registerEC,
  getRegisterExpiry,
  setRegisterExpiry
}
