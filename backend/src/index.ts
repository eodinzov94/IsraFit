import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import { db } from './db.js'
import Router from './routes/Router.js'
import ErrorHandlingMiddleware from './middleware/ErrorHandlingMiddleware.js'

dotenv.config()


const app = express()
const PORT = 3001
app.use(cors())
app.use(express.json())
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