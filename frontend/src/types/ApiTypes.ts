import { Dayjs } from "dayjs"

export interface IUser {
    id: string,
    role: string,
    email: string
    password: string
    firstName: string
    lastName: string
    gender: "Male" | "Female",
    weight: number
    height: number
    TDEE: number
    physicalActivity: number
    birthYear: number
    bmi: number
}

export interface AuthState {
    user: IUser | null,
    isLoggedIn: boolean
}

export interface IUserRegisterPayload {
    email: string
    password: string
    firstName: string
    lastName: string
    gender: "Male" | "Female",
    weight: number
    height: number
    physicalActivity: number
    birthYear: number
    TDEE: number
}

export interface IUserUpdatePayload {
    firstName?: string
    lastName?: string
    gender?: "Male" | "Female",
    birthYear?: number
    weight?: number
    height?: number
    physicalActivity?: number
}

export const IUserUpdateKeys = ['firstName', 'lastName', 'gender', 'birthYear', 'weight', 'height', 'physicalActivity']

export interface IUserLoginPayload {
    email: string
    password: string
}
export interface LogRow {
    userEmail: string;
    date: string;
    method: string;
    url: string;
    status: string;
}

export interface MealDailyPayload {
    date: Date
    totalCalories: number
}
export interface GoalPayload {
    endDate: Date
    goalWeight: number
    recommendedCalories: number
}

export interface IUserBmiPayload {
    weight: number
}
export interface IMealDaily {
    userId: number
    totalCalories: number
    date: Date
}
export interface IUserBMI {
    userId: number
    date: Date
    weight: number
    bmi: number
}
export interface IGoal {
    userId: number
    endDate: Date
    goalWeight: number
    recommendedCalories: number
    startDate: Date
    duration: number
    targetBmi: number
}

export interface UserDataState{
    goal: (null | IGoal),
    mealHistory: IMealDaily[]
    bmiHistory: IUserBMI[]
}