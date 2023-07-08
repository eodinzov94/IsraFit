import { NextFunction, Response } from "express"
import ApiError from "../error/ApiError.js"
import Meal from "../models/Meal.js"
import { InputMeal } from "../types/MealTypes.js"
import { RequestWithUser, TypedRequestBody } from "../types/RequestType.js"

class MealController {
    async reportMeal(req: TypedRequestBody<InputMeal>, res: Response, next: NextFunction) {
        const {meal, date,} = req.body
        try {
            for(const ingredient of meal) {
                await Meal.create({
                    code:ingredient.code,
                    quantity:ingredient.quantity,
                    date,
                    userId: req.user!.id
                })
            }
        return res.json({ status: 'OK' })
        } catch (e: any) {
            return next(ApiError.badRequest('Input error, maybe user with passed ID does not exists'))
        }
    }
    async getMealHistory(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const mealHistory = await Meal.findAll({ where: { userId: req.user?.id } })
            return res.json({ status: 'OK', mealHistory })
        }catch (e: any) {
            return next(ApiError.badRequest('Input error, maybe user with passed ID does not exists'))
        }
    }
}


export default new MealController()