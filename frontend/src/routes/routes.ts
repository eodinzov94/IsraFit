import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import LineChart from "../components/LineChart";


export interface IRoute {
    path: string;
    element: React.ComponentType;
}

export enum RouteNames {
    REGISTER = '/register',
    HOME = '/',
    LOGIN = '/login',
    GRAPH = '/graph',
}


export const publicRoutes: IRoute[] = [
    { path: RouteNames.LOGIN, element: LoginPage },
    { path: RouteNames.REGISTER, element: RegisterPage },
    { path: RouteNames.GRAPH, element: LineChart },
    { path: RouteNames.HOME, element: LoginPage },

]

export const userRoutes: IRoute[] = [
    //add in future
]