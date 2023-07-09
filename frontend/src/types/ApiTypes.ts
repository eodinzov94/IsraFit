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
    physicalActivity: number
    birthYear: number
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
