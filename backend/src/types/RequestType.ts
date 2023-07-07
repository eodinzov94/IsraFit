import { IUser } from './UserTypes.js'
import { Request } from 'express'

export interface TypedRequestBody<T> extends Request {
    body: T
    user?: IUser
}

export interface RequestWithUser extends Request {
    user?: IUser
}
