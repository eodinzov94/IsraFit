export interface IMeal {
    userId: number
    quantity: number
    date: Date
    code: number
}

export interface InputMeal{
    date: Date
    meal: {code: number, quantity: number}[]

}