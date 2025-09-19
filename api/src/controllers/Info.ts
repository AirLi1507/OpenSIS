import { Request, Response } from "express";

const { YEAR } = process.env as { YEAR?: string }

const getYear = async (req: Request, res: Response) => {
  if (req.token == undefined) {
    res.status(401).json({
      error: "Access token is not processed."
    })
    return
  }
  if (!YEAR) {
    res.status(500).json({
      error: "Year not configured in environment variables."
    })
    return
  }
  res.json(YEAR)
  return
}

export {
  getYear
}
