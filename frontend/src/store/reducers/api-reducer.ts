import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
    IUser,
    IUserLoginPayload,
    IUserRegisterPayload,
    IUserUpdatePayload,
    LogRow
} from '../../types/ApiTypes'
import { setUser } from './auth-reducer'

export const apiReducer = createApi({
    reducerPath: 'apiReducer',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/api',
        prepareHeaders: (headers, { endpoint }) => {
            const token = localStorage.getItem('accessToken')
            if (token && endpoint !== 'login') {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },

    }),
    endpoints: (builder) => ({
        authMe: builder.query<IUser, null>({
            query: () => ({
                url: `/auth-me`,
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(setUser(data))
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
    }),
})

export const {
    useAuthMeQuery,
    useLoginMutation,
    useRegisterMutation,
    useEditProfileMutation,
    useGetAllLogsQuery
} = apiReducer