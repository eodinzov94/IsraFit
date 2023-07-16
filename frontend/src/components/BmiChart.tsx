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
import { useGetBmiHistoryQuery } from '../store/reducers/api-reducer';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface BmiChartProps {
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
            text: 'BMI Graph',
        },
    },
};
const BmiChart: FC<BmiChartProps> = ({ skip }) => {
    const { isLoading } = useGetBmiHistoryQuery(null, { skip: !!skip});
    //TODO: ADD goal BMI CALC
    const bmiHistory = useAppSelector((state) => state.userData.bmiHistory);
    const bmiTarget = useAppSelector((state) => state.userData.goalBmi);
    const data = {
        labels: bmiHistory.map(item => item.date),
        datasets: [
            {
                label: 'Actual Value',
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                data: bmiHistory.map(item => item.bmi)
            },
        ]
    };
    if (bmiTarget) {
        data.datasets.push(
            {
                label: 'Target Value',
                lineTension: 0.1,
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                data: Array(bmiHistory.length).fill(bmiTarget)
            }
        )
    }
    return (
        <>{isLoading ?
            <LinearProgress />
            :
            <Line options={options} data={data} />
        }
        </>
    );
};

export default BmiChart;
