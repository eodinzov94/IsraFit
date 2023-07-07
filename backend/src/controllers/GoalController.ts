import { NextFunction, Request, Response } from 'express'
import { IGoal } from '../types/GoalTypes.js'
import Goal from '../models/Goal.js'
import { RequestWithUser, TypedRequestBody } from '../types/RequestType.js'
import ApiError from '../error/ApiError.js'


class GoalController {
    async setGoal(req: TypedRequestBody<IGoal>, res: Response, next: NextFunction) {
        const { userId, duration, goalWeight, avgCalory } = req.body
        try {
            await Goal.upsert({
                userId: userId,
                duration: duration,
                goalWeight: goalWeight,
                avgCalory: avgCalory
            })
            return res.json({ status: 'OK' })
        } catch (e: any) {
            return next(ApiError.badRequest('Input error, maybe user with passed ID does not exists'))
        }
    }
    async getGoal(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const goal = await Goal.findOne({ where: { userId: req.user?.id } })
            if (!goal) {
                return next(ApiError.badRequest('Goal or user does not exists'))
            }
            return res.json({ status: 'OK', goal: goal })
        } catch (e: any) {
            return next(ApiError.badRequest('Input error'))
        }
    }
}


export default new GoalController()