import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import BmiChart from "../components/BmiChart";
import CaloriesChart from "../components/CaloriesChart";


export interface IRoute {
    path: string;
    element: React.ComponentType;
}

export enum RouteNames {
    REGISTER = '/register',
    HOME = '/',
    LOGIN = '/login',
    BMI_CHART = '/bmi-chart',
    CALORIES_CHART = '/calories-chart',
}


export const publicRoutes: IRoute[] = [
    { path: RouteNames.LOGIN, element: LoginPage },
    { path: RouteNames.REGISTER, element: RegisterPage },
    { path: RouteNames.BMI_CHART, element: BmiChart },
    { path: RouteNames.HOME, element: LoginPage },
    { path: RouteNames.CALORIES_CHART, element: CaloriesChart },

]

export const userRoutes: IRoute[] = [
    //add in future
]