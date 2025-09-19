import { configDotenv } from "dotenv"
import mysql2, { PoolOptions } from "mysql2/promise"
import logger from "./logger"

configDotenv()

const {
  MYSQL_USER,
  MYSQL_PORT,
  MYSQL_PASSWORD,
  MYSQL_HOST,
  MYSQL_DB
} = process.env as {
  MYSQL_HOST?: string
  MYSQL_PORT?: string
  MYSQL_DB?: string
  MYSQL_USER?: string
  MYSQL_PASSWORD?: string
}

const poolOptions: PoolOptions = {
  host: MYSQL_HOST || "localhost",
  port: (
    MYSQL_PORT
      ?
      (
        (Number(MYSQL_PORT) < 65535 && Number(MYSQL_PORT) > 0)
          ?
          Number(MYSQL_PORT)
          :
          3306
      )
      :
      3306
  ),
  database: MYSQL_DB || "opensis",
  user: MYSQL_USER || "opensis",
  password: MYSQL_PASSWORD || "password"
}

const connection = mysql2.createPool(poolOptions)

connection.on("connection", () => {
  logger.info("Connected to database.")
  return
})

export default connection

