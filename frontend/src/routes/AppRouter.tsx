import { Route, Routes, Navigate } from "react-router-dom";
import { RouteNames, publicRoutes } from "./routes";
export const AppRouter = () => {
    return (
        <Routes>
            {publicRoutes.map((route) => (
                <Route path={route.path} element={<route.element />} key={route.path} />
            ))}
            <Route path="*" element={<Navigate replace to={RouteNames.HOME} />} />
        </Routes>)
};