import { LinearProgress } from '@mui/material';
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import { FC } from 'react';
import { Line } from 'react-chartjs-2';
import { useAppSelector } from '../store/hooks';
import { useGetMealHistoryQuery } from '../store/reducers/api-reducer';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface CaloriesChartProps {
    skip?: boolean;
}
export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Calories Chart',
        },
    },
};
const CaloriesChart: FC<CaloriesChartProps> = ({ skip }) => {
    const { isLoading } = useGetMealHistoryQuery('', { skip: !!skip });
    const mealHistory = useAppSelector((state) => state.userData.mealHistory);
    const caloriesTarget = useAppSelector((state) => state.userData.goal?.recommendedCalories);
    const data = {
        labels: mealHistory.map(item => item.date),
        datasets: [
            {
                label: 'Actual Value',
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                data: mealHistory.map(item => item.totalCalories)
            },
        ]
    };
    if (caloriesTarget) {
        data.datasets.push(
            {
                label: 'Target Value',
                lineTension: 0.1,
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                data: Array(mealHistory.length).fill(caloriesTarget.toFixed(0))
            }
        )
    }
    return (
        <>{isLoading ?
            <LinearProgress />
            :
            <Line id='canvas' options={options} data={data} />
        }
        </>
    );
};

export default CaloriesChart;
