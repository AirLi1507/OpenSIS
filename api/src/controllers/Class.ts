import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import logger from "../config/logger";
import connection from "../config/database"

const getStudentList = async (req: Request, res: Response) => {
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
  }
  const { form, className } = req.body
  if (form == undefined) {
    res.status(400).json({
      error: "Form value is not provided."
    })
    return
  }
  if (className == undefined) {
    res.status(400).json({
      error: "Class name is not provided."
    })
    return
  }
  interface Student extends RowDataPacket {
    uid: string
    chi_name: string
    eng_name: string
    form: string
    className: string
    classNo: string
  }
  try {
    const [row] = await connection.query<Student[]>(`
      select
        uid,
        chi_name,
        eng_name,
        form,
        className,
        classNo
      from
        user
      where
        form = ?
      and
        className = ?;
    `, [form, className])
    res.json(row)
  } catch (err) {
    logger.error(`An error occurred when retrieving student list: ${err}`)
    res.status(500).json({
      error: "Could not retrieve student list from database."
    })
  }
  return
}

export {
  getStudentList
}
