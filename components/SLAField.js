import styles from '../styles/Home.module.css'

export default function SLAField(props) {

    const GOOD = 'bg-green-700'
    const OKAY = 'bg-yellow-500'
    const BAD = 'bg-red-600'
    const goalText = {
        low: " to goal",
        high: " above goal"
    }
    //INCEXP, INCMIN = 94.850, 92.894
    // REQEXP, REQMIN = 97.160, 96.219
    const incValues = [92.894,94.850]
    const reqValues = [96.219,97.160]
    let toGoal = 0
    let goalLabel = ''

    function changeValue() {
        let values = []
        let value = 0

        if (props.value) {
            value = Number(props.value.replace('%',''))
            console.log("VALUE = " + value)
        }

        if (props.name.includes('INCs')) {
            values = incValues
        } else { values = reqValues }

        toGoal = Math.abs(values[1] - value).toFixed(3)

        if (value < values[0]) {
            goalLabel = goalText.low
            return BAD

        }
        else if (value >= values[0] &&  value < values[1]) {
            goalLabel = goalText.low
            return OKAY

        }
        else {
            goalLabel = goalText.high
            return GOOD

        }    
    }

    const fieldStyle = changeValue()
    const delta = (Number(props.value.replace('%','')) - Number(props.prevValue.replace('%',''))).toFixed(3)
    
    const aboveReqFailure = Number(props.value.replace('%','')) - reqValues[0]
    const aboveIncFailure = Number(props.value.replace('%','')) - incValues[0]
    let failure = 0
    if (props.name.includes('INCs')) {
        failure = aboveIncFailure.toFixed(3)
    } else { failure = aboveReqFailure.toFixed(3) }

    return (
        <a href="#" className={styles.card}>
        <h2 className="text-center font-bold text-5xl">{props.name}</h2>
        <input readOnly={true} type="text" id="INCs" className={`text-8xl rounded-lg text-center text-white w-3/4 h-5/6 m-5 ${fieldStyle}`} value={props.value}></input>
        <h3 id='delta' className={'text-center text-4xl'} >Change since {`${props.prev}`}: {`${delta}%`}</h3>
        <h2 id='goal' className='text-center text-6xl' >{`${toGoal}`}% {`${goalLabel}`}</h2>
        <h2 id='failure' className='text-center text-4xl mb-5' > {`${failure}% above minimum`}</h2>
        </a>
        )
}