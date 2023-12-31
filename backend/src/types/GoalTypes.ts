

export interface IGoal {
    userId: number
    endDate: Date
    goalWeight: number
    recommendedCalories: number
    startDate: Date
    duration: number
    targetBmi: number
}
export interface IGoalInput {
    endDate: Date
    goalWeight: number
    recommendedCalories: number
}