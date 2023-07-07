import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import { db } from './db.js'
import Router from './routes/Router.js'
import ErrorHandlingMiddleware from './middleware/ErrorHandlingMiddleware.js'
import path from 'path'
import fs from 'fs'
import morgan from 'morgan'
import {fileURLToPath} from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config()


const app = express()
const PORT = 3001
app.use(cors())
app.use(express.json())
app.use(morgan('common', {
    stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
}))
app.use('/api/', Router)
app.use(ErrorHandlingMiddleware)
const start = async () => {
    try {
        await db.authenticate()
        await db.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

export default app
start()