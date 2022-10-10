import express from 'express'
import {connect} from './db'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import router from './routes/index'
import error from './middleware/ErrorHadling'
import path from 'path'

const app = express()
const port = 5000

// для распознавания json в  запросе
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
// чтобы работал req.files для передачи файлов
app.use(fileUpload({}))

app.use('/api', router)

// а в react добавляем в путь эту приставку
app.use('/image', express.static(path.resolve(path.resolve(), './dist/static')))

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
