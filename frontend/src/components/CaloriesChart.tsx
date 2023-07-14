import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Calories',
        },

    },
};
const data = {
    labels: ['22-06', '23-06', '24-06', '25-06', '26-06', '27-06', '28-06'],
    datasets: [
        {
            label: 'Actual Value',
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            data: [8000, 9000, 11000, 12000, 9000, 7000, 10000]
        },
        {
            label: 'Target Value',
            lineTension: 0.1,
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            data: [10000, 10000, 10000, 10000, 10000, 10000, 10000] // This is your target value
        }
    ]
};
const CaloriesChart = () => {

    return (
            <Line options={options} data={data} />
    );
};

export default CaloriesChart;
