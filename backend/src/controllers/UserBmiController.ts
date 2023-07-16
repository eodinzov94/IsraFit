import { NextFunction, Response } from 'express'
import ApiError from '../error/ApiError.js'
import UserBMI from '../models/UserBMI.js'
import { RequestWithUser, TypedRequestBody } from '../types/RequestType.js'
import { IUserBmiInput } from '../types/UserBMITypes.js'
import User from '../models/User.js'

export function calculateBMI(weight: number, height: number): number {
    // Calculate BMI
    const bmi = weight / ((height / 100) * (height / 100));

    // Round the BMI to two decimal places
    return Math.round(bmi * 100) / 100;
}
class UserBmiController {
    async updateBMI(req: TypedRequestBody<IUserBmiInput>, res: Response, next: NextFunction) {
        const { weight } = req.body
        try {
            const user = await User.findOne({ where: { id: req.user?.id } })
            if(!user) {
                return next(ApiError.badRequest('User does not exists'))
            }
            const bmi = calculateBMI(weight, user.height)
            await UserBMI.upsert({
                userId: user.id,
                weight,
                bmi,
                date: new Date()
            })
            user.weight = weight
            user.bmi = bmi
            await user.save()
            return res.json({ status: 'OK' })
        } catch (e: any) {
            return next(ApiError.badRequest('Input error, maybe user with passed ID does not exists'))
        }
    }
    async getMbiHistory(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const bmiHistory = await UserBMI.findAll({ where: { userId: req.user?.id } })
            return res.json({ status: 'OK', bmiHistory })
        } catch (e: any) {
            return next(ApiError.badRequest('Input error, maybe user with passed ID does not exists'))
        }
    }
}



export default new UserBmiController()