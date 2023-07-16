export interface UserAttributes extends IUser {
  password: string
  bmi: number
  createdAt?: Date
  updatedAt?: Date
}
export interface IUserRegister {
  email: string
  password: string
  firstName: string
  lastName: string
  gender: string
  weight: number
  height: number
  physicalActivity: number
  birthYear: number
  TDEE: number
  role?: string
  bmi?: number
}
export interface IUserUpdate {
  firstName?: string
  lastName?: string
  gender?: string
  birthYear?: number
  weight?: number
  height?: number
  physicalActivity?: number
}
export const IUserUpdateKeys = ['firstName', 'lastName', 'gender', 'birthYear', 'weight', 'height', 'physicalActivity']

export interface IUserLogin {
  email: string
  password: string
}
export interface IUser extends IUserRegister {
  id: number
}
