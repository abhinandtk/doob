import React from 'react'
import { Line } from 'react-chartjs-2';
import {CategoryScale} from 'chart.js'; 
Chart.register(CategoryScale);
function CategorySalesReport() {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Sales',
            data: [20, 15, 25, 30, 40, 35],
            borderColor: 'blue',
            fill: false,
          },
        ],
      };
    
      const options = {
        responsive: true,
        maintainAspectRatio: false,
      };
  return (
    <div>
      <h2>My Line Chart</h2>
      <Line data={data} options={options} />
    </div>
  )
}

export default CategorySalesReport