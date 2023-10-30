import express from 'express'
import router from './routes'
import morgan from 'morgan'
import {enviroment} from './config/enviroments'

const app = express()

app.use(express.json({limit:'50mb'}))
app.use("/api", router)

app.use(morgan('dev'));

const port = enviroment.PORT ?? 3000

app.listen(port, () =>{
    console.log(`Server running on port ${port}`)
})