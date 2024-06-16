// components/SalesChart.js
import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const SalesChart = ({ title, xAxisCategories, seriesData }) => {
  const chartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: title,
    },
    xAxis: {
      categories: xAxisCategories,
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Number of Sales',
      },
    },
    series: [{
      name: 'Sales',
      data: seriesData,
    }],
  };

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default SalesChart;
