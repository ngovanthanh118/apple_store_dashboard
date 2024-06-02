// src/components/MyPieChart.js

import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Đăng ký các thành phần của Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const MyPieChart = ({ labels, info }) => {
    console.log(info);
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Số đơn hàng',
                data: [2, 5, 2, 1],
                backgroundColor: [
                    'rgb(254, 151, 74)',
                    'rgb(255, 196, 66)',
                    'rgb(61, 213, 152)',
                    'rgb(0, 99, 255)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    // 'rgba(255, 99, 132, 1)',
                    // 'rgba(54, 162, 235, 1)',
                    // 'rgba(255, 206, 86, 1)',
                    // 'rgba(75, 192, 192, 1)',
                    // 'rgba(153, 102, 255, 1)',
                    // 'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return <Pie data={data} options={{ cutout: '60%', }} />;
};

export default MyPieChart;
