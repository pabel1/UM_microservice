import dotenv from 'dotenv'

import path from 'path'
dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  port: process.env.PORT,
  Database_URL: process.env.DB_URL,
  defaultPass: process.env.DEFAULT_PASS,
  env: process.env.NODE_ENV,
  redis: {
    url: process.env.REDIS_URL,
    expires_in: process.env.REDIS_TOKEN_EXPIRES_IN,
  },
}
