import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { selectAuthentication } from "../store/reducers/auth-reducer";
import { adminRoutes, publicRoutes, userRoutes } from "./routes";
export const AppRouter = () => {
    const { user, isLoggedIn } = useAppSelector(selectAuthentication)
    return (
        <Routes>
            {!isLoggedIn && (publicRoutes.map((route) => (
                <Route path={route.path} element={<route.element />} key={route.path} />
            )))}
            {isLoggedIn && user?.role === "User" && (userRoutes.map((route) => (
                <Route path={route.path} element={<route.element />} key={route.path} />
            )))}
            {isLoggedIn && user?.role === "Admin" && (adminRoutes.map((route) => (
                <Route path={route.path} element={<route.element />} key={route.path} />
            )))}
        </Routes>)
};