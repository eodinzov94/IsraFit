import { NextFunction, Response } from 'express'
import pkg from 'jsonwebtoken'
import { IUser } from '../types/UserTypes.js'
import { RequestWithUser } from '../types/RequestType.js'

const { verify } = pkg

const CheckRoleMW = (role: string) => {
    return function (req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const token = req.headers.authorization?.split(' ')[1] // Bearer
            if (!token) {
                return res.status(401).json({ message: 'Unauthorized no token' })
            }
            const decoded = verify(token, process.env.JWT_SECRET_KEY as string) as IUser
            if (decoded.role !== role) {
                return res.status(403).json({ message: 'Access Denied' })
            }
            req.user = decoded
            next()
        } catch (e) {
            res.status(401).json({ message: 'Unauthorized' })
        }
    }
}
export default CheckRoleMW