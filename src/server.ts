import mongoose from 'mongoose'
import { errorLogger, logger } from './App/shared/logger'
import config from './config'
import app from './index'
async function main() {
  try {
    await mongoose.connect(config.Database_URL as string)
    console.log(`Database connected Successfully!!`)
    logger.info(`Database connected Successfully!!`)

    // !database connection
    app.listen(config.port, () => {
      console.log(`Application listening on port ${config.port}`)
      logger.info(`Application listening on port ${config.port}`)
    })
  } catch (error) {
    console.log(`Database connected Failed!! the issue is ${error}`)
    errorLogger.error(`Database connected Failed!! the issue is ${error}`)
  }
}

main()
