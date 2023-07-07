import { NextFunction, Response } from "express"
import ApiError from "../error/ApiError.js"
import Meal from "../models/Meal.js"
import { InputMeal } from "../types/MealTypes.js"
import { TypedRequestBody } from "../types/RequestType.js"
import FoodData from "../models/FoodData.js"

class MealController {
    async reportMeal(req: TypedRequestBody<InputMeal>, res: Response, next: NextFunction) {
        const {meal, userId, date,} = req.body
        try {
            for(const ingredient of meal) {
                await Meal.create({
                    code:ingredient.code,
                    quantity:ingredient.quantity,
                    date,
                    userId
                })
            }
        return res.json({ status: 'OK' })
        } catch (e: any) {
            return next(ApiError.badRequest('Input error, maybe user with passed ID does not exists'))
        }
    }
    async getMealHistory(req: TypedRequestBody<{userId: number}>, res: Response, next: NextFunction) {
        const {userId} = req.body
        try {
            const mealHistory = await Meal.findAll({ where: { userId } })
            const food =FoodData.findAll({ where: { code:400 } })
            return res.json({ status: 'OK', mealHistory })
        }catch (e: any) {
            return next(ApiError.badRequest('Input error, maybe user with passed ID does not exists'))
        }
    }
}


export default new MealController()