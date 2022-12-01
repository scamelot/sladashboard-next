import Head from 'next/head'
import styles from '../styles/Home.module.css'
import SLAField from '../components/SLAField.js'
import Modal from '../components/modal.js'
import Update from '../components/update.js'
import React from 'react'
import { Router } from 'next/dist/client/router'

import IncChart from '../components/charts'

import dayjs from 'dayjs'
import SLACard from '../components/SLACard'
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
<div className={styles.main}>
      <Head>
        <title>SLA Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {updated ? <Modal /> : console.log('No update') }

        <div className="flex flex-wrap mt-2">
          <SLACard name='INCs' current={todaysInc} prev={yesterdaysInc} data={allData}/>
          {/* <SLAField name="INCs" value={`${todaysInc.value}%`} prev={`${yesterdaysInc.date}`} prevValue={`${yesterdaysInc.value}`}/> */}
          <SLACard name='REQs' current={todaysReq} prev={yesterdaysReq} data={allData}/>
        </div>
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