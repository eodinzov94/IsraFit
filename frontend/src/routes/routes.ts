import AdminLogsPage from "../Pages/AdminLogsPage";
import DashboardPage from "../Pages/DashboardPage";
import FoodTablePage from "../Pages/FoodTablePage";
import GoalSetPage from "../Pages/GoalSetPage";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import BmiChart from "../components/BmiChart";
import CaloriesChart from "../components/CaloriesChart";
import ReportFoodPage from "../Pages/ReportFoodPage";
import { Navigate } from "react-router-dom";
import NotFoundPage from "../Pages/NotFoundPage";
import RedirectHome from "../components/RedirectHome";


export interface IRoute {
    path: string;
    element: React.ComponentType;
    redirect?:string;
}

export enum RouteNames {
    REPORT_FOOD='/food-report',
    GOAL_SET = '/goal-set',
    REGISTER = '/register',
    HOME = '/',
    LOGIN = '/login',
    BMI_CHART = '/bmi-chart',
    CALORIES_CHART = '/calories-chart',
    FOOD_TABLE = '/food-table',
    ADMIN_LOGS = '/admin-logs',
    DASHBOARD = '/dashboard',
    ETC = '*',
}
export const publicRoutes: IRoute[] = [
    { path: RouteNames.LOGIN, element: LoginPage },
    { path: RouteNames.REGISTER, element: RegisterPage },
    { path: RouteNames.HOME, element: FoodTablePage },
    { path: RouteNames.REPORT_FOOD, element: RedirectHome },
    { path: RouteNames.BMI_CHART, element: RedirectHome },
    { path: RouteNames.GOAL_SET, element: RedirectHome },
    { path: RouteNames.CALORIES_CHART, element: RedirectHome },
    { path: RouteNames.FOOD_TABLE, element: RedirectHome },
    { path: RouteNames.HOME, element: RedirectHome },
    { path: RouteNames.DASHBOARD, element: RedirectHome },
    { path: RouteNames.ETC, element: NotFoundPage },
]

export const userRoutes: IRoute[] = [
    { path: RouteNames.REPORT_FOOD, element: ReportFoodPage },
    { path: RouteNames.BMI_CHART, element: BmiChart },
    { path: RouteNames.GOAL_SET, element: GoalSetPage },
    { path: RouteNames.CALORIES_CHART, element: CaloriesChart },
    { path: RouteNames.FOOD_TABLE, element: FoodTablePage },
    { path: RouteNames.HOME, element: DashboardPage },
    { path: RouteNames.DASHBOARD, element: DashboardPage },
    //Redirect
    { path: RouteNames.LOGIN, element: RedirectHome },
    { path: RouteNames.REGISTER, element:RedirectHome },
    //404
    { path: RouteNames.ETC, element: NotFoundPage },
]

export const adminRoutes: IRoute[] = [
    { path: RouteNames.HOME, element: AdminLogsPage },
    //Redirect
    { path: RouteNames.LOGIN, element: RedirectHome },
    { path: RouteNames.REGISTER, element:RedirectHome },
    //404
    { path: RouteNames.ETC, element: NotFoundPage },
]