import React from 'react'
import { useSelector } from 'react-redux'

import { Doughnut } from 'react-chartjs-2'
import SubTitle from '@admincomponents/SubTitle'

const DougnutContent = ({ title, data, user }) => {
  const dataTotal = data.length
  const dataInStock = data.filter((item) => item.count > 0).length
  const dataOutOfStock = dataTotal - dataInStock
  const dataPercentOutOfStock = Math.floor((dataOutOfStock / dataTotal) * 100)
  const dataPercentInStock = 100 - dataPercentOutOfStock
  const dataChartData = {
    labels: [
      'В наличии' +
        (dataPercentInStock ? ' (' + dataPercentInStock + '%)' : ''),
      'Отсутствуют' +
        (dataPercentOutOfStock ? ' (' + dataPercentOutOfStock + '%)' : ''),
    ],
    datasets: [
      {
        // label: 'Ghbdtn',
        data: [dataInStock, dataOutOfStock],
        backgroundColor: [
          'rgba(75, 215, 120, 0.5)',
          'rgba(255, 99, 132, 0.5)',
          // 'rgba(54, 162, 235, 0.5)',
          // 'rgba(255, 206, 86, 0.5)',
          // 'rgba(153, 102, 255, 0.5)',
          // 'rgba(255, 159, 64, 0.5)',
        ],
        borderColor: [
          'rgba(75, 215, 120, 1)',
          'rgba(255, 99, 132, 1)',
          // 'rgba(54, 162, 235, 1)',
          // 'rgba(255, 206, 86, 1)',
          // 'rgba(153, 102, 255, 1)',
          // 'rgba(255, 159, 64, 1)',
        ],
        // hoverBackgroundColor: 'rgba(54, 162, 235, 1)',
        // hoverBorderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        hoverOffset: 10,
      },
    ],
  }

  // const image = new Image()
  // image.src = '/img/balloon.webp'

  const plugin = {
    id: 'custom_canvas_background_image',
    beforeDraw: (chart) => {
      // if (image.complete) {
      const { ctx, chartArea } = chart
      const { top, left, width, height } = chartArea
      // const x = left + width / 2 - image.width / 2
      // const y = top + height / 2 - image.height / 2
      // ctx.drawImage(image, x, y)
      ctx.font = '24px Arial'
      ctx.fillStyle = 'black'
      ctx.textAlign = 'center'
      ctx.fillText(dataTotal, left + width / 2, top + height / 2 + 3)
      // } else {
      //   image.onload = () => chart.draw()
      // }
    },
  }

  return (
    // <div>

    <Doughnut
      // className="p-10 overflow-visible"
      data={dataChartData}
      plugins={[plugin]}
      options={{
        animation: false,
        plugins: {
          title: {
            display: true,
            text: title,
            font: {
              size: 18,
            },
            color: 'black',
          },
          legend: {
            onClick: null,
            // title: { color: '#116699' },
          },
          // beforeDraw: (chart) => {
          //   if (image.complete) {
          //     const ctx = chart.ctx
          //     const { top, left, width, height } = chart.chartArea
          //     const x = left + width / 2 - image.width / 2
          //     const y = top + height / 2 - image.height / 2
          //     ctx.drawImage(image, x, y)
          //   } else {
          //     image.onload = () => chart.draw()
          //   }
          // },
          // subtitle: {
          //   display: true,
          //   text: 'Custom Chart Subtitle',
          // },
        },
        layout: {
          padding: 8,
        },
        maintainAspectRatio: true,
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
        e[0] &&
        console.log('getElementAtEvent', dataChartData.labels[e[0].index])
      }
    />
    // </div>
  )
}

const OverviewContent = ({ data, modals, user }) => {
  const { products, sets } = useSelector((state) => state)

  return (
    <div className="flex flex-wrap justify-around px-3">
      <div className="flex-1 min-w-72 max-w-100">
        <DougnutContent title="Товары" data={products} />
      </div>
      <div className="flex-1 min-w-72 max-w-100">
        <DougnutContent title="Наборы" data={sets} />
      </div>
    </div>
  )
}

export default OverviewContent
