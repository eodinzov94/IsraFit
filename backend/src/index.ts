import express from 'express'
import cors from 'cors'
import {db} from "./db.js";

const app = express();
const PORT = 3001
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}));
app.use(express.json())

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