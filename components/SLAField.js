import styles from '../styles/Home.module.css'
import {incLimits, reqLimits} from '../config/limits'
import {colors} from '../config/colors'

export default function SLAField(props) {

    const goalText = {
        low: " to goal",
        high: " above goal"
    }
    console.log(incLimits)
    console.log(colors)
    const incValues = incLimits
    const reqValues = reqLimits
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
            return colors.BAD

        }
        else if (value >= values[0] &&  value < values[1]) {
            goalLabel = goalText.low
            return colors.OKAY

        }
        else {
            goalLabel = goalText.high
            return colors.GOOD

        }    
    }

    const fieldStyle = changeValue()
    console.log(fieldStyle)
    const delta = (Number(props.value.replace('%','')) - Number(props.prevValue.replace('%',''))).toFixed(3)
    
    const aboveReqFailure = Number(props.value.replace('%','')) - reqValues[0]
    const aboveIncFailure = Number(props.value.replace('%','')) - incValues[0]
    let failure = 0
    if (props.name.includes('INCs')) {
        failure = aboveIncFailure.toFixed(3)
    } else { failure = aboveReqFailure.toFixed(3) }

    //Delta color highlighting
    let deltaColor = ''
    if (delta > 0) {
        deltaColor = 'text-green-500'
    }
    else if (delta < 0) {
        deltaColor = 'text-red-500'
    }
    else {
        deltaColor = 'text-white'
    }

    return (
        <a href="#" className={styles.card}>
        <h2 className="text-center lg:text-5xl sm:text-lg">{props.name}</h2>
        <input readOnly={true} type="text" id="INCs" className={`lg:text-8xl sm:text-6xl rounded-lg text-center text-white w-3/4 h-5/6 m-5 ${fieldStyle}`} value={props.value}></input>
        <h3 id='delta' className={`text-center lg:text-4xl sm:text-md ${deltaColor}`}>Change since {`${props.prev}`}: {`${delta}%`}</h3>
        <h2 id='goal' className='text-center lg:text-6xl sm:text-lg'>{`${toGoal}`}% {`${goalLabel}`}</h2>
        <h2 id='failure' className='text-center lg:text-4xl sm:text-sm mb-5' > {`${failure}% above minimum`}</h2>
        </a>
        )
}