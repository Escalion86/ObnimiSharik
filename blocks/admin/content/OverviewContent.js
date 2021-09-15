import React from 'react'
import { useSelector } from 'react-redux'

import { Doughnut } from 'react-chartjs-2'

const OverviewContent = ({ data, modals, user }) => {
  const { products, sets } = useSelector((state) => state)
  const productsTotal = products.length
  const productsInStock = products.filter((product) => product.count > 0).length
  const productsOutOfStock = productsTotal - productsInStock
  const productsChartData = {
    labels: ['В наличии', 'Отсутствуют'],
    datasets: [
      {
        label: 'Ghbdtn',
        data: [productsInStock, productsOutOfStock],
        backgroundColor: [
          'rgba(75, 255, 100, 0.5)',
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
        ],
        borderColor: [
          'rgba(75, 255, 100, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        // hoverBackgroundColor: 'rgba(54, 162, 235, 1)',
        // hoverBorderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  }
  return (
    <div className="w-60 h-60">
      <Doughnut
        // className="w-100 h-100"
        data={productsChartData}
        options={{
          maintainAspectRatio: false,
          // interaction: {
          //   mode: 'dataset',
          // },
          onClick: (e) => {
            // console.log(`e`, e)
            // const canvasPosition = Chart.helpers.getRelativePosition(e, chart);
            // // Substitute the appropriate scale IDs
            // const dataX = chart.scales.x.getValueForPixel(canvasPosition.x);
            // const dataY = chart.scales.y.getValueForPixel(canvasPosition.y);
          },
        }}
        // getDatasetAtEvent={(e) => console.log('getDatasetAtEvent', e)}
        getElementAtEvent={(e) =>
          console.log('getElementAtEvent', productsChartData.labels[e[0].index])
        }
      />
    </div>
  )
}

export default OverviewContent
