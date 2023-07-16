import bcrypt from 'bcrypt'
import { NextFunction, Response } from 'express'
import pkg from 'jsonwebtoken'
import ApiError from '../error/ApiError.js'
import User from '../models/User.js'
import { RequestWithUser, TypedRequestBody } from '../types/RequestType.js'
import { IUser, IUserLogin, IUserRegister, IUserUpdate, IUserUpdateKeys } from '../types/UserTypes.js'
import { calculateBMI } from './UserBmiController.js'
const { sign } = pkg

const getUserData = (user: IUser) => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    birthYear: user.birthYear,
    gender: user.gender,
    weight: user.weight,
    height: user.height,
    physicalActivity: user.physicalActivity,
    TDEE: user.TDEE,
    bmi:user.bmi
  }
}

export const generateJwt = (user: IUser) => {
  return sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET_KEY as string,
    { expiresIn: '48h' },
  )
}

class UserController {
  async registration(req: TypedRequestBody<IUserRegister>, res: Response, next: NextFunction) {
    const { email, birthYear, gender, lastName, firstName, password, weight, height, physicalActivity, TDEE } = req.body
    if (!password || password.length < 3) {
      return next(ApiError.badRequest('Password should be at least 3 char length'))
    }
    const candidate = await User.findOne({ where: { email } })
    if (candidate) {
      return next(ApiError.badRequest('User with current email already exists'))
    }
    const hashPassword = await bcrypt.hash(password, 5)
    try {
      const user = await User.create({
        email,
        birthYear: birthYear,
        gender,
        lastName,
        firstName,
        password: hashPassword,
        weight,
        height,
        physicalActivity,
        TDEE,
        bmi: calculateBMI(weight, height),
      })
      const token = generateJwt(user)
      return res.json({ token, status: 'OK', user: getUserData(user) })
    } catch (e: any) {
      console.log(e);
      return next(ApiError.badRequest('Input error'))
    }
  }

  async login(req: TypedRequestBody<IUserLogin>, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ where: { email } })
      if (!user) {
        return next(ApiError.forbidden('Incorrect email or password'))
      }
      const comparePassword = bcrypt.compareSync(password, user.password) // authenticate received password with the one in the database.
      if (!comparePassword) {
        return next(ApiError.forbidden('Incorrect email or password'))
      }
      const token = generateJwt(user)
      return res.json({ user: getUserData(user), token, status: 'OK' })
    } catch (e: any) {
      console.log(e)
      const message = e?.errors?.length > 0 && e?.errors[0]?.message ? e.error[0].message : 'Login error'
      return next(ApiError.badRequest(message))
    }
  }

  async auth(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const user = await User.findOne({ where: { id: req.user?.id } })
      if (!user) {
        return next(ApiError.internal('User does not exists'))
      }
      return res.json({ user: getUserData(user) })
    } catch (e: any) {
      console.log(e)
      const message = e?.errors?.length > 0 && e?.errors[0]?.message ? e.error[0].message : 'Authentication error'
      return next(ApiError.badRequest(message))
    }
  }

  async updateUser(req: TypedRequestBody<IUserUpdate>, res: Response, next: NextFunction) {
    const fieldsToUpdate: Partial<IUserUpdate> = {}
    for (const [key, value] of Object.entries(req.body)) {
      if (value !== undefined && IUserUpdateKeys.includes(key)) {
        fieldsToUpdate[key as keyof IUserUpdate] = value
      }
    }
    const fields = Object.keys(fieldsToUpdate)
    if (fields.length === 0) {
      return next(ApiError.badRequest('No fields to update'))
    }
    try {
      await User.update({ ...fieldsToUpdate }, { where: { id: req.user?.id } })
      const user = await User.findOne({ where: { email: req.user?.email } })
      if (!user) {
        return next(ApiError.badRequest('User does not exists'))
      }
      user.bmi = calculateBMI(user.weight, user.height)
      await user.save()
      return res.json({
        status: 'OK',
        user: getUserData(user),
      })
    } catch (e: any) {
      const message = e?.errors.length > 0 && e?.errors[0]?.message ? e.error[0].message : 'Input error'
      return next(ApiError.badRequest(message))
    }
  }
}
export default new UserController()
