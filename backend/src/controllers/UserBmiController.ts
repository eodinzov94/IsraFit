import { NextFunction, Response } from 'express'
import ApiError from '../error/ApiError.js'
import UserBMI from '../models/UserBMI.js'
import { RequestWithUser, TypedRequestBody } from '../types/RequestType.js'
import { IUserBmiInput } from '../types/UserBMITypes.js'


class UserBmiController {
    async updateBMI(req: TypedRequestBody<IUserBmiInput>, res: Response, next: NextFunction) {
        const { value } = req.body
        try {
            await UserBMI.upsert({
                userId: req.user!.id,
                value: value,
                date: new Date()
            })
            return res.json({ status: 'OK' })
        } catch (e: any) {
            return next(ApiError.badRequest('Input error, maybe user with passed ID does not exists'))
        }
    }
    async getMbiHistory(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const bmiHistory = await UserBMI.findAll({ where: { userId: req.user?.id  } })
            return res.json({ status: 'OK', bmiHistory })
        }catch (e: any) {
            return next(ApiError.badRequest('Input error, maybe user with passed ID does not exists'))
        }
    }
}



export default new UserBmiController()