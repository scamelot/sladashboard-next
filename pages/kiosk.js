import { useState } from "react"
import Link from "next/link"
import styles from '../styles/Home.module.css'

const server = process.env.SERVER

export default function Kiosk({correctKey}) {

    //TODO
    //verify input matches kioskKey
    //if so, write to localStorage
    //allow rendering if kioskKey

    const [inputKey, setInputKey] = useState('')

    let correctUI = false

    const handleChange = (e) => {
        setInputKey(e.target.value)
        if (inputKey == correctKey) {
            correctUI = true
            if (typeof window !== undefined) {
                window.localStorage.setItem('kioskKey',correctKey)
                alert('Correct!')
            }
        }
    }

    return(
            <div className={styles.main}>
                <div>
                <h2 className='text-4xl text-green-500'>Kiosk Mode</h2>
                <label htmlFor="kioskKey">Kiosk Key:</label>
                </div>
                <input type="text" name="kioskKey" placeholder="32-bit key here" className='text-black' onChange={handleChange}></input>
                
                <div className='my-5'><Link href="/"><span className='text-2xl bg-indigo-300 p-3 rounded-md hover:bg-indigo-600'>Go Back</span></Link></div>
            </div>
    )
}

export async function getServerSideProps() {
    const userData = await fetch(`${server}/api/users`)
    let correctKey = await userData.json()
    correctKey = correctKey.filter(x=>x.key)[0].key
    console.log(correctKey)
    return {
        props: {correctKey}
    }

}