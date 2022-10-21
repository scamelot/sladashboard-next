import { Chart } from 'chart.js/auto'
import { Line } from 'react-chartjs-2'

export default function IncChart(props) {
    const allData = props.data
    console.log(allData)

    let incData = []
    let incLabels = []
    allData.inc.forEach(datum => {
        incLabels.push(datum.date)
        incData.push(datum.value)
    })

    let reqData = []
    let reqLabels = []
    allData.req.forEach(datum => {
        reqLabels.push(datum.date)
        reqData.push(datum.value)
    })

    const data = {
            labels: incLabels,
            datasets: [{
                label: 'INC Percentage',
                data: incData,
                lineTension: 0.1,
                borderCapStyle: 'butt',
                borderJoinStyle: 'miter',
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 2,
            },
            {
                label: 'REQ Percentage',
                data: reqData,
                lineTension: 0.1,
                borderCapStyle: 'butt',
                borderJoinStyle: 'miter',
                backgroundColor: [
                    'rgba(67, 118, 197, 0.2)',
                ],
                borderColor: [
                    'rgba(67, 118, 197, 1)',
                ],
                borderWidth: 2,
            }]
        }

    const options = {
        scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }}
    return (
        <div style={{width: '50vw', height: 300}}>
        <Line data={data} width={'100px'} height={'100px'} options={options} />
        </div>
    )
}