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
const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
        {
            label: 'Actual Value',
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            data: [26,25.5,25.5,25,24.5,24.5,24]
        },
        {
            label: 'Target Value',
            lineTension: 0.1,
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            data: [23, 23, 23, 23, 23, 23, 23] // This is your target value
        }
    ]
};
const BmiChart = () => {

    return (
        <div>
            <Line options={options} data={data} />;
        </div>
    );
};

export default BmiChart;
