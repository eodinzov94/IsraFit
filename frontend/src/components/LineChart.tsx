const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
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
            text: 'BMI Graph',
        },
    },
};
export const data = {
    labels,
    datasets: [
        {
            label: 'BMI',
            data: [24, 23.5, 24, 23.5, 23, 23.5, 24],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
    ],
};
const LineChart = () => {

    return (
        <div>
            <Line options={options} data={data} />;
        </div>
    );
};

export default LineChart;
