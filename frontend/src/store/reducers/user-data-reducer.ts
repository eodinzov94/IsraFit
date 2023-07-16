import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IGoal, IMealDaily, IUserBMI, UserDataState } from '../../types/ApiTypes'

const initialState: UserDataState = {goal:null,mealHistory:[] ,bmiHistory:[]}

const userDataSlice = createSlice({
    name: 'user-data',
    initialState,
    reducers: {
        setGoal(state, action: PayloadAction<IGoal>) {
            state.goal = action.payload
            return state
        },
        setMealHistory(state, action: PayloadAction<IMealDaily[]>) {
            state.mealHistory = action.payload
            return state
        },
        setBmiHistory(state, action: PayloadAction<IUserBMI[]>) {
            state.bmiHistory = action.payload
            return state
        }
    },
})


export default userDataSlice.reducer
export const { setBmiHistory,setGoal,setMealHistory } = userDataSlice.actions