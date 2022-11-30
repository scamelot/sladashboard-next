import Head from 'next/head'
import styles from '../styles/Home.module.css'
import SLAField from '../components/SLAField.js'
import Modal from '../components/modal.js'
import Update from '../components/update.js'
import React from 'react'
import { Router } from 'next/dist/client/router'

import IncChart from '../components/charts'

import dayjs from 'dayjs'
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

const server = process.env.SERVER


let todaysInc = 0
let yesterdaysInc = 0
let todaysReq = 0
let yesterdaysReq = 0

export default function Home({ data, allData }) {

  const [updated, setUpdated] = React.useState(false)

  Router.events.on('routeChangeComplete', () => {
    setUpdated(true)
  })
  

  if (typeof window !== "undefined") {
    if (updated) {
      setTimeout(() => {
         let modalElement = document.querySelector(".modal")
          modalElement.classList.add('opacity-0')
        }, 
          3000
          );
    }
}
  todaysInc = data[0]
  yesterdaysInc = data[1]
  todaysReq = data[2]
  yesterdaysReq = data[3]

  return (
    <div className={styles.container}>
      <Head>
        <title>SLA Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      {updated ? <Modal /> : console.log('No update') }

        <div className="flex flex-wrap max-w-3xl mt-6 ">
          <SLAField name="INCs" value={`${todaysInc.value}%`} prev={`${yesterdaysInc.date}`} prevValue={`${yesterdaysInc.value}`}/>
          <SLAField name="REQs" value={`${todaysReq.value}%`} prev={`${yesterdaysReq.date}`} prevValue={`${yesterdaysReq.value}`}/>
        </div>
        
        <IncChart data={allData} />
        <Update />
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  try {
    const current = await fetch(`${server}/api/inc`)
    const data = await current.json()
    const all = await fetch(`${server}/api/inc/all`)
    const allData = await all.json()

    return { props: { data, allData }}
  }

  catch (err) {
    console.error(dayjs(), err)
    Router.reload(window.location.pathname)
  }

  finally {
  // const data = []
  // data[0] = todaysInc
  // data[1] = yesterdaysInc
  // data[2] = todaysReq
  // data[3] = yesterdaysReq
  //   return {props: { data }}
  }

}