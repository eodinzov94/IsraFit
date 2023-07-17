import { NextFunction, Response } from 'express'
import ApiError from '../error/ApiError.js'
import Goal from '../models/Goal.js'
import { IGoalInput } from '../types/GoalTypes.js'
import { RequestWithUser, TypedRequestBody } from '../types/RequestType.js'
import { calculateBMI } from './UserBmiController.js'


function getDifferenceInDays(startDate: Date, endDate: Date): number {
    const diffInMs = endDate.getTime() - startDate.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    return diffInDays;
}



class GoalController {
    async setGoal(req: TypedRequestBody<IGoalInput>, res: Response, next: NextFunction) {
        const { goalWeight, recommendedCalories, endDate, } = req.body
        const startDate = new Date()
        try {
            const goal = await Goal.upsert({
                userId: req.user!.id,
                endDate,
                goalWeight: goalWeight,
                recommendedCalories,
                startDate,
                duration: getDifferenceInDays(startDate, new Date(endDate)),
                targetBmi: calculateBMI(goalWeight, req.user!.height),
            })
            return res.json({ status: 'OK' , goal: goal[0] })
        } catch (e: any) {
            console.log(e);
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