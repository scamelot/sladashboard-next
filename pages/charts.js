// import Chart from 'chart.js/auto';
import Annotation from 'chartjs-plugin-annotation';
// Global
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend, ScriptableContext, } from "chart.js";
ChartJS.register(ArcElement, Annotation, Tooltip, Filler, Legend, CategoryScale, LinearScale, PointElement, LineElement);


export default function IncChart(props) {
    const allData = props.data
    console.log(allData)

    let incData = []
    let incLabels = []
    allData.inc.forEach(datum => {
        incLabels.push(datum.date.replace('-2022',''))
        incData.push(datum.value)
    })

    let reqData = []
    let reqLabels = []
    allData.req.forEach(datum => {
        reqLabels.push(datum.date.replace('-2022', ''))
        reqData.push(datum.value)
    })

    const reqChartData = {
            labels: reqLabels,
            datasets:[{
                label: 'REQ Percentage',
                data: reqData,
                lineTension: 0.4,
                borderCapStyle: 'butt',
                borderJoinStyle: 'miter',
                backgroundColor: [
                    'rgba(67, 118, 197, 0.2)',
                ],
                borderColor: [
                    'rgba(0, 253, 255, 1)',
                ],
                borderWidth: 2,
            }]
    }

    const data = {
            labels: incLabels,
            datasets: [{
                label: 'INC Percentage',
                data: incData,
                lineTension: 0.4,
                borderCapStyle: 'butt',
                borderJoinStyle: 'miter',
                backgroundColor: [
                    'rgba(0, 255, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(0, 255, 0, 1)',
                ],
                borderWidth: 2,
            }],
        }

    const reqOptions = {
        scales: {
            x: {
                grid: {
                    color: 'rgba(100,100,100,0.4)'
                }
            },
            y: {
                grid: {
                    color: 'rgba(100,100,100,0.4)'
                },
                min: 95,
            },
        },
        maintainAspectRatio: false,
        plugins: {
            animation: {
                duration: 5
            },
        annotation: {
            annotations: [{
            type: 'box',
            mode: 'horizontal',
            xMin: -1,
            xMax: 99,
            yMin: 96.219,
            yMax: 97.161,
            backgroundColor: 'rgba(255,180,0,0.4)',
            scaleID: 'y',
            value: 97.160,
            borderColor: 'rgb(255, 255, 0, 0.4)',
            borderWidth: 1,
            label: {
                enabled: false,
                content: 'Req Warning',
            },
        },
        {
            type: 'box',
            mode: 'horizontal',
            xMin: -1,
            xMax: 99,
            yMin: 0,
            yMax: 96.219,
            backgroundColor: 'rgba(255,0,0,0.4)',
            value: 96.219,
            borderWidth: 1,
            label: {
                enabled: false,
                content: 'Req Failure',
            }
        }],
    }}}

    const options = {
            scales: {
                x: {
                    grid: {
                        color: 'rgba(100,100,100,0.4)'
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(100,100,100,0.4)'
                    },
                    min: 90,
                },
            },
    maintainAspectRatio: false,
    plugins: {
        animation: {
            duration: 5
        },
        annotation: {
            annotations: [{
                type: 'box',
            mode: 'horizontal',
            xMin: -1,
            xMax: 99,
            yMin: 92.895,
            yMax: 94.850,
            backgroundColor: 'rgba(255,180,0,0.4)',
                value: 94.850,
                borderColor: 'rgb(255, 255, 0, 0.4)',
                borderWidth: 1,
                label: {
                    enabled: false,
                    content: 'INC Warning',
                }
            },
            {
                type: 'box',
            mode: 'horizontal',
            xMin: -1,
            xMax: 99,
            yMin: 0,
            yMax: 92.895,
            backgroundColor: 'rgba(255,0,0,0.4)',
                value: 92.894,
                borderColor: 'rgb(255, 0, 0, 0.4)',
                borderWidth: 1,
                label: {
                    enabled: false,
                    content: 'INC Failure',
                }
            },
            ],
            drawTime: 'afterDraw'
        }
    }  
}

    return (
        <div style={{display: 'flex', marginLeft:'-45vw', justifyContent: 'between',flexDirection:'row',zIndex:'0', left: '100px', bottom:'100px', width: '45vw', height: 400}}>
        <Line data={data} width={'100px'} height={'100px'} options={options} />
        <Line data={reqChartData} options={reqOptions} />
        </div>
    )
}