import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IGoal, IMealDaily, IUserBMI, UserDataState } from '../../types/ApiTypes'

const initialState: UserDataState = { goal: null, mealHistory: [], bmiHistory: [], goalBmi: 24.5 }

const userDataSlice = createSlice({
    name: 'user-data',
    initialState,
    reducers: {
        setGoal(state, action: PayloadAction<IGoal>) {
            state.goal = action.payload
            // const user = store.getState().auth.user;
            // if (user) {
            //     state.goalBmi = Math.round((user.weight / ((user.height / 100) * (user.height / 100))) * 100) / 100;
            // }
            return state
        },
        setMealHistory(state, action: PayloadAction<IMealDaily[]>) {
            state.mealHistory = action.payload
            return state
        },
        addMeal(state, action: PayloadAction<IMealDaily>) {
            const index = state.mealHistory.findIndex(element => element.date === action.payload.date);
            if (index !== -1) {
                state.mealHistory[index].totalCalories = action.payload.totalCalories;
            } else {
                state.mealHistory.push(action.payload);
            }

        },
        setBmiHistory(state, action: PayloadAction<IUserBMI[]>) {
            state.bmiHistory = action.payload
            return state
        },
        addBmiReport(state, action: PayloadAction<IUserBMI>) {
            const index = state.bmiHistory.findIndex(element => element.date === action.payload.date);
            if (index !== -1) {
                state.bmiHistory[index].weight = action.payload.weight;
                state.bmiHistory[index].bmi = action.payload.bmi;
            } else {
                state.bmiHistory.push(action.payload);
            }
        }
    },
})


export const userDataReducer = userDataSlice.reducer
export const { setBmiHistory, setGoal, setMealHistory, addBmiReport, addMeal } = userDataSlice.actions