import { NextFunction, Response } from 'express'
import { RequestWithUser } from '../types/RequestType.js'
import { IUser } from '../types/UserTypes.js'
import pkg from 'jsonwebtoken'
const { verify } = pkg

const authMiddleware = (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1] // Bearer
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
        req.user = verify(token, process.env.JWT_SECRET_KEY as string) as IUser
        next()
    } catch (e) {
        console.log(e)
        res.status(401).json({ message: 'Unauthorized' })
    }
}
export default authMiddleware