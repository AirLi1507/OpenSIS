import { configDotenv } from "dotenv"
import server from "./src/config/express"
import logger from "./src/config/logger"
import routes from "./src/routes"
import path from "path"

configDotenv({ path: path.join(__dirname, "../.env") })

const { PORT, HOST } = process.env as { PORT?: string, HOST?: string }

server.use("/", routes)

server.listen(
  (
    PORT
      ?
      (
        (Number(PORT) < 65535 && Number(PORT) > 0)
          ?
          Number(PORT)
          :
          3000
      )
      :
      3000
  ),
  (
    HOST
      ?
      HOST
      :
      "localhost"
  ),
  (err) => {
    if (err) {
      logger.error(`An error occured: ${err}`)
      process.exit()
    }
    logger.info(`Server listening on ${HOST || "localhost"}:${PORT || 3000}.`)
  }
)
