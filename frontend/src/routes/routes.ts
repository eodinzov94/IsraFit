import AdminLogsPage from "../Pages/AdminLogsPage";
import FoodTablePage from "../Pages/FoodTablePage";
import GoalSetPage from "../Pages/GoalSetPage";
import InitialDetailsPage from "../Pages/InitialDetailsPage";
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
    INITIAL_DETAILS = "/init",
    REGISTER = '/register',
    HOME = '/',
    LOGIN = '/login',
    BMI_CHART = '/bmi-chart',
    CALORIES_CHART = '/calories-chart',
    FOOD_TABLE = '/food-table',
    ADMIN_LOGS = '/admin-logs',
}


export const publicRoutes: IRoute[] = [
    { path: RouteNames.LOGIN, element: LoginPage },
    { path: RouteNames.REGISTER, element: RegisterPage },
    { path: RouteNames.HOME, element: FoodTablePage },
]

export const userRoutes: IRoute[] = [
    { path: RouteNames.BMI_CHART, element: BmiChart },
    { path: RouteNames.INITIAL_DETAILS, element: InitialDetailsPage }, //TODO: Move these to private user routes
    { path: RouteNames.GOAL_SET, element: GoalSetPage },
    { path: RouteNames.CALORIES_CHART, element: CaloriesChart },
    { path: RouteNames.FOOD_TABLE, element: FoodTablePage },
    { path: RouteNames.HOME, element: FoodTablePage },

]

export const adminRoutes: IRoute[] = [
    { path: RouteNames.HOME, element: AdminLogsPage },
]