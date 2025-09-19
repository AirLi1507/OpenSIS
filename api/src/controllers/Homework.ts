/*

import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
import connection from "../config/database";

interface Homework extends RowDataPacket {
  id?: string
  name?: string
  description?: string
  class?: string
  subject?: string
  teacher?: string
  status?: string
}

interface FormClassName extends RowDataPacket {
  form?: string
  className?: string
}

const getDueHomework = async (req: Request, res: Response) => {
  if (req.token == undefined) {
    res.status(401).json({
      error: "Access token is not processed."
    })
    return
  }
  const { uid } = req.token
  try {
    let [row] = await connection.query<FormClassName[]>("select distinct form, className from user where uid = ?;", [uid])
    [row] = await connection.query<Homework[]>("select id, name, description, class, subject, teacher, status from homework where class = ?;")
  }
}
*/
