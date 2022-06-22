import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function REQ({value}) {
    function changeValue() {
        console.log('changed value')
    }
    return (
        <a href="#" className={styles.card}>
        <h2 className="text-center">REQs</h2>
        <input onChange={changeValue} type="text" id="REQs" className="text-2xl text-center text-black h-64" value={value}></input>
        </a>
        )
}