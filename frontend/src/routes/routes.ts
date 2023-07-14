import AdminLogsPage from "../Pages/AdminLogsPage";
import DashboardPage from "../Pages/DashboardPage";
import FoodTablePage from "../Pages/FoodTablePage";
import GoalSetPage from "../Pages/GoalSetPage";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import BmiChart from "../components/BmiChart";
import CaloriesChart from "../components/CaloriesChart";


export interface IRoute {
    path: string;
    element: React.ComponentType;
}

export enum RouteNames {
    GOAL_SET = '/goal-set',
    REGISTER = '/register',
    HOME = '/',
    LOGIN = '/login',
    BMI_CHART = '/bmi-chart',
    CALORIES_CHART = '/calories-chart',
    FOOD_TABLE = '/food-table',
    ADMIN_LOGS = '/admin-logs',
    DASHBOARD = '/dashboard',
}


export const publicRoutes: IRoute[] = [
    { path: RouteNames.LOGIN, element: LoginPage },
    { path: RouteNames.REGISTER, element: RegisterPage },
    { path: RouteNames.HOME, element: FoodTablePage },
]

export const userRoutes: IRoute[] = [
    { path: RouteNames.BMI_CHART, element: BmiChart },
    { path: RouteNames.GOAL_SET, element: GoalSetPage },
    { path: RouteNames.CALORIES_CHART, element: CaloriesChart },
    { path: RouteNames.FOOD_TABLE, element: FoodTablePage },
    { path: RouteNames.HOME, element: FoodTablePage },
    { path: RouteNames.DASHBOARD, element: DashboardPage }

]

export const adminRoutes: IRoute[] = [
    { path: RouteNames.HOME, element: AdminLogsPage },
]