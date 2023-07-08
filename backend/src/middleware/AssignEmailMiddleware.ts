import { NextFunction, Response } from "express";
import { decode } from "jsonwebtoken";
import { RequestWithUserEmail } from "../types/RequestType.js";
import { IUser } from "../types/UserTypes.js";

export const assignUserEmail = (req: RequestWithUserEmail, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (token) {
        const decoded = decode(token) as Partial<IUser>;
        req.userEmail = decoded?.email || 'Guest'

    } else {
        req.userEmail = 'Guest'
    }
    next()
}