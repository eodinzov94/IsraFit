import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import fs from 'fs'
import morgan from 'morgan'
import path from 'path'
import { db } from './db.js'
import { assignUserEmail } from './middleware/AssignEmailMiddleware.js'
import ErrorHandlingMiddleware from './middleware/ErrorHandlingMiddleware.js'
import Router from './routes/Router.js'
import { RequestWithUserEmail } from './types/RequestType.js'
import { __dirname } from './helpers/helper.js'
dotenv.config()


const app = express()
const PORT = 3001
morgan.token('user-email', function getId(req: RequestWithUserEmail) {
    return req?.userEmail || 'Guest'
})

app.use(cors())
app.use(express.json())
app.use(assignUserEmail)
app.use(morgan(':user-email :date[iso] :method :url :status', {
    stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' }),
    skip: function (req, res) { return req.url === "/get-all-logs" },
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