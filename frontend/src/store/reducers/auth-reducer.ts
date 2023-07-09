import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthState, IUser } from '../../types/ApiTypes'
import { RootState } from '../store'


const initialState: AuthState = { user: null, isLoggedIn: false }

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state = initialState
            localStorage.removeItem('accessToken')
            return state
        },
        setUser(state, action: PayloadAction<IUser>) {
            state.user = action.payload
            state.isLoggedIn = true
            return state
        },
    },
})


export default authSlice.reducer
export const { logout, setUser } = authSlice.actions
export const selectAuthentication = (state: RootState) => state.auth 