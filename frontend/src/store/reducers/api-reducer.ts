import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
    GoalPayload,
    IGoal,
    IMealDaily,
    IUser,
    IUserBMI,
    IUserBmiPayload,
    IUserLoginPayload,
    IUserRegisterPayload,
    IUserUpdatePayload,
    LogRow,
    MealDailyPayload
} from '../../types/ApiTypes'
import { setUser } from './auth-reducer'
import { setBmiHistory, setGoal, setMealHistory } from './user-data-reducer'

export const apiReducer = createApi({
    reducerPath: 'apiReducer',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL || 'http://localhost:3001/api',
        prepareHeaders: (headers, { endpoint }) => {
            const token = localStorage.getItem('accessToken')
            if (token && endpoint !== 'login') {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    endpoints: (builder) => ({
        authMe: builder.query<{ status: 'OK', user: IUser }, null>({
            query: () => ({
                url: `/auth-me`,
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    console.log(data);

                    dispatch(setUser(data.user))
                } catch (error) {
                    console.log(error)
                }
            },

        }),

        login: builder.mutation<{ token: string, status: 'OK', user: IUser }, IUserLoginPayload>({
            query: (payload) => ({
                url: `/login`,
                method: 'POST',
                body: payload,
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    if (data.status === 'OK') {
                        localStorage.setItem('accessToken', data.token)
                        dispatch(setUser(data.user))
                    }
                } catch (error) {
                    console.log(error)
                }
            },

        }),

        register: builder.mutation<{ token: string, status: string, user: IUser }, IUserRegisterPayload>({
            query: (payload) => ({
                url: `/register`,
                method: 'POST',
                body: payload,
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    if (data.status === 'OK') {
                        localStorage.setItem('accessToken', data.token)
                        dispatch(setUser(data.user))
                    }
                } catch (error) {
                    console.log(error)
                }
            },
        }),

        editProfile: builder.mutation<{ status: string, user: IUser }, IUserUpdatePayload>({
            query: (payload) => ({
                url: `/update-user-data`,
                method: 'POST',
                body: payload,
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    if (data.status === 'OK' && data.user) {
                        dispatch(setUser(data.user))
                    } else {
                        console.log('error')
                    }
                } catch (error) {
                    console.log(error)
                }
            },
        }),

        getAllLogs: builder.query<{ status: string, allLogs: LogRow[] }, ''>({
            query: () => ({
                url: '/get-all-logs',
                method: 'GET'
            }),
        }),
        reportMeal: builder.mutation<{ status: string }, MealDailyPayload>({
            query: (payload) => ({
                url: `/report-meal`,
                method: 'POST',
                body: payload,
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    if (data.status === 'OK') {
                        // Access the generated endpoint hooks from the API definition
                        const mealHistoryQuery = apiReducer.endpoints.getMealHistory.useQuery(null);
                        // Run the mealHistoryQuery manually
                        const mealHistoryResult = await mealHistoryQuery.refetch();
                        if (mealHistoryResult.data) {
                            dispatch(setMealHistory(mealHistoryResult.data.mealHistory))
                        }
                        else {
                            console.log('No data');
                        }
                    }
                } catch (error) {
                    console.log(error)
                }
            },
        }),

        getMealHistory: builder.query<{ status: 'OK', mealHistory: IMealDaily[] }, null>({
            query: () => ({
                url: `/get-meal-history`,
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    if (data.status === 'OK') {
                        dispatch(setMealHistory(data.mealHistory))
                    }
                } catch (error) {
                    console.log(error)
                }
            },

        }),

        updateGoal: builder.mutation<{ status: string, goal: IGoal }, GoalPayload>({
            query: (payload) => ({
                url: `/update-goal`,
                method: 'POST',
                body: payload,
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    if (data.status === 'OK') {
                        dispatch(setGoal(data.goal))
                    }
                } catch (error) {
                    console.log(error)
                }
            },
        }),

        getGoal: builder.query<{ status: 'OK', goal: IGoal }, null>({
            query: () => ({
                url: `/get-goal`,
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    if (data.status === 'OK') {
                        dispatch(setGoal(data.goal))
                    }
                } catch (error) {
                    console.log(error)
                }
            },

        }),
        updateBmi: builder.mutation<{ status: string,user: IUser }, IUserBmiPayload>({
            query: (payload) => ({
                url: `/update-bmi`,
                method: 'POST',
                body: payload,
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    if (data.status === 'OK') {
                        dispatch(setUser(data.user))
                        // Access the generated endpoint hooks from the API definition
                        const bmiHistoryQuery = apiReducer.endpoints.getBmiHistory.useQuery(null);
                        // Run the bmiHistoryQuery manually
                        const bmiHistoryResult = await bmiHistoryQuery.refetch();
                        if (bmiHistoryResult.data) {
                            dispatch(setBmiHistory(bmiHistoryResult.data.bmiHistory))
                        }
                        else {
                            console.log('No data');
                        }
                    }
                } catch (error) {
                    console.log(error)
                }
            },
        }),

        getBmiHistory: builder.query<{ status: 'OK', bmiHistory: IUserBMI[] }, null>({
            query: () => ({
                url: `/get-goal`,
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    if (data.status === 'OK') {
                        dispatch(setBmiHistory(data.bmiHistory))
                    }
                } catch (error) {
                    console.log(error)
                }
            },

        }),
    }),
})

export const {
    useAuthMeQuery,
    useLoginMutation,
    useRegisterMutation,
    useEditProfileMutation,
    useGetAllLogsQuery,
    useReportMealMutation,
    useGetMealHistoryQuery,
    useUpdateGoalMutation,
    useGetGoalQuery,
    useUpdateBmiMutation
} = apiReducer