export interface IMeal {
    userId: number
    quantity: number
    date: Date
    code: number
}

export interface InputMeal{
    userId: number
    date: Date
    meal: {code: number, quantity: number}[]

}