export interface IUserBMI {
    userId: number
    date: Date
    value: number
}
export interface IUserBmiInput{
    userId: number
    value: number
    date?: Date
}