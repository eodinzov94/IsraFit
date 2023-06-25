import express from 'express'
import cors from 'cors'

const app = express();
const PORT =  3001
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}));
app.use(express.json())
app.listen(PORT, () => console.log(`Server started on PORT : ${PORT}`))