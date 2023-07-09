import { configureStore } from "@reduxjs/toolkit";
import { apiReducer } from "./reducers/api-reducer";
import authReducer from "./reducers/auth-reducer";


const store = configureStore({
    reducer: {
        auth: authReducer,
        [apiReducer.reducerPath]: apiReducer.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([apiReducer.middleware]),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;