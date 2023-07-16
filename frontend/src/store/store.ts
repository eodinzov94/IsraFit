import { configureStore } from "@reduxjs/toolkit";
import { apiReducer } from "./reducers/api-reducer";
import authReducer from "./reducers/auth-reducer";
import {userDataReducer} from "./reducers/user-data-reducer";


export const store = configureStore({
    reducer: {
        [apiReducer.reducerPath]: apiReducer.reducer,
        auth: authReducer,
        userData:userDataReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([apiReducer.middleware]),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;