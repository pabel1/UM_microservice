import cors from 'cors'
import express, { Application } from 'express'
import globalErrorHandler from './App/Middleware/globalErrorHandler'
import { createUser } from './App/modules/user/Services/user.services'
const app: Application = express()

app.use(cors())
app.use(express.json({ limit: '100mb' }))
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true, limit: '100mb' }))

//global error handler
app.use(globalErrorHandler)

app.post('/', async (req, res) => {
  try {
    const data = await createUser(req.body)
    console.log(data)
    res.send('Hello World!')
  } catch (error) {
    console.log(error)
  }
})

export default app
