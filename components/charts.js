// import Chart from 'chart.js/auto';
import Annotation from 'chartjs-plugin-annotation';
// Global
import { Line } from 'react-chartjs-2'
import styles from '../styles/Home.module.css'
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend, ScriptableContext, } from "chart.js";
ChartJS.register(ArcElement, Annotation, Tooltip, Filler, Legend, CategoryScale, LinearScale, PointElement, LineElement);


export default function SLAChart(props) {
    const allData = props.data

    let incData = []
    let incLabels = []
    allData.inc.forEach(datum => {
        incLabels.push(datum.date.split('-').slice(0,2).join('-'))
        incData.push(datum.value)
    })
    let incDataLowest = [...incData].sort((a,b) => a-b)[0] 
    incDataLowest = incDataLowest < 90 ? incDataLowest : 90

    let reqData = []
    let reqLabels = []
    allData.req.forEach(datum => {
        reqLabels.push(datum.date.split('-').slice(0,2).join('-'))
        reqData.push(datum.value)
    })
    let reqDataLowest = [...reqData].sort((a,b) => a-b)[0]
    reqDataLowest = reqDataLowest < 95 ? reqDataLowest : 95


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
                min: reqDataLowest,
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
                    min: incDataLowest,
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

const style={
    display: 'flex', 
    justifyContent: 'center',
    flexDirection:'column', 
    zIndex:'0',
    marginTop: '2rem',
    left: '100px', 
    bottom:'100px', 
    width: '50vw', 
    height: '45vh'}

    return (
        <div className={styles.chart}>
        {props.name=='INCs' && <Line data={data} options={options} /> }
        {props.name=='REQs' && <Line data={reqChartData} options={reqOptions}/> }
        </div>
    )
}