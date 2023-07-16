import { NextFunction, Response } from "express"
import ApiError from "../error/ApiError.js"
import MealDaily from "../models/MealDaily.js"
import { InputMealDaily } from "../types/MealTypes.js"
import { RequestWithUser, TypedRequestBody } from "../types/RequestType.js"

class MealController {
    async reportMeal(req: TypedRequestBody<InputMealDaily>, res: Response, next: NextFunction) {
        const {totalCalories, date,} = req.body
        try {
            const meal = await MealDaily.findOne({ where: { userId: req.user?.id, date: date } })
            if(!meal) {
                await MealDaily.create({
                    totalCalories,
                    date,
                    userId: req.user!.id
                })
            }else{
                meal.totalCalories += totalCalories
                await meal.save()
            }
        return res.json({ status: 'OK', meal })
        } catch (e: any) {
            return next(ApiError.badRequest('Input error, maybe user with passed ID does not exists'))
        }
    }
    async getMealHistory(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const mealHistory = await MealDaily.findAll({ where: { userId: req.user?.id } })
            return res.json({ status: 'OK', mealHistory })
        }catch (e: any) {
            return next(ApiError.badRequest('Input error, maybe user with passed ID does not exists'))
        }
    }
}


export default new MealController()