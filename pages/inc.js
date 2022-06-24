import { loadGetInitialProps } from 'next/dist/shared/lib/utils'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function SLAField(props) {

    const GOOD = 'bg-green-700'
    const OKAY = 'bg-yellow-500'
    const BAD = 'bg-red-600'
    
    const incValues = [94,95]
    const reqValues = [96,97]

    function changeColor(e, to) {
        const values = [BAD, OKAY, GOOD]
        values.forEach(color => {
            e.target.classList.remove(color)
        })
        e.target.classList.add(to)
        e.target.classList.add('text-white')
    }

    function changeValue(e) {
        let values = []
        const value = e.target.value.replace('%', '')
        if (props.name.includes('INCs')) {
            values = incValues
        } else { values = reqValues }

        if (value < values[0]) {
            changeColor(e,BAD)
        }
        else if (value >= values[0] &&  value < values[1]) {
            changeColor(e,OKAY)
        }
        else {
           changeColor(e,GOOD)
        }    
    }

    return (
        <a href="#" className={styles.card}>
        <h2 className="text-center font-bold">{props.name}</h2>
        <input onChange={changeValue} type="text" id="INCs" className={`text-8xl text-center text-black h-64`} value={props.value}></input>
        </a>
        )
}