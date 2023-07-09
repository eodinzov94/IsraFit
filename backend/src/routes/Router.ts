import { Router } from 'express'
import UserController from '../controllers/UserController.js'
import authMiddleware from '../middleware/AuthMiddleware.js'
import MealController from '../controllers/MealController.js'
import GoalController from '../controllers/GoalController.js'
import UserBmiController from '../controllers/UserBmiController.js'
import AdminController from '../controllers/AdminController.js'
import CheckRoleMW from '../middleware/CheckRoleMiddleware.js'

const router = Router()
//UserController
router.post('/register', UserController.registration) 
router.post('/login', UserController.login)
router.post('/update-user-data',authMiddleware, UserController.updateUser)
router.get('/auth-me', authMiddleware, UserController.auth)
//MealController
router.post('/report-meal', authMiddleware, MealController.reportMeal)
router.get('/get-meal-history', authMiddleware, MealController.getMealHistory)
//GoalController
router.post('/update-goal', authMiddleware, GoalController.setGoal)
router.get('/get-goal', authMiddleware, GoalController.getGoal)
//UserBmiController
router.post('/update-bmi', authMiddleware, UserBmiController.updateBMI)
router.get('/get-mbi-history', authMiddleware, UserBmiController.getMbiHistory)
//AdminController
router.get('/get-all-logs',CheckRoleMW('Admin'), AdminController.getAllLogs)
export default router