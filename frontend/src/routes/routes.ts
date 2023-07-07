import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import BmiChart from "../components/BmiChart";
import CaloriesChart from "../components/CaloriesChart";
import FoodTablePage from "../Pages/FoodTablePage";
import InitialDetailsPage from "../Pages/InitialDetailsPage";
import GoalSetPage from "../Pages/GoalSetPage";


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
    FOOD_TABLE = '/food-table'
}


export const publicRoutes: IRoute[] = [
    {path: RouteNames.INITIAL_DETAILS, element: InitialDetailsPage}, //TODO: Move these to private user routes
    {path: RouteNames.GOAL_SET, element: GoalSetPage},

    {path: RouteNames.LOGIN, element: LoginPage},
    {path: RouteNames.REGISTER, element: RegisterPage},
    {path: RouteNames.BMI_CHART, element: BmiChart},
    {path: RouteNames.HOME, element: LoginPage},
    {path: RouteNames.CALORIES_CHART, element: CaloriesChart},
    {path: RouteNames.FOOD_TABLE, element: FoodTablePage},

]

export const userRoutes: IRoute[] = [
    //add in future
]