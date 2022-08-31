import express from 'express'
import {connect} from './db'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import router from './routes/index'
import error from './middleware/ErrorHadling'

const app = express()
const port = 5000

// для распознавания json в  запросе
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
// чтобы работал req.files для передачи файлов
app.use(fileUpload({}))

app.use('/api', router)

// обработчик ошибок полдений Middleware
app.use(error)

const start = async () => {
  try {
    // connect DB
    await connect()
    // start the Express server
    app.listen(port, () => {
      console.log(`server started at http://localhost:${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
