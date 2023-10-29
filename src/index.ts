import express from 'express'
import router from './routes'

const app = express()

app.use(express.json({limit:'50mb'}))
   .use('api',router)

const port = process.env.PORT ?? 3000

app.listen(port, () =>{
    console.log(`Server running on port ${port}`)
})