import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import SLAField from '../components/SLAField.js'
import Modal from '../components/modal.js'
import Update from '../components/update.js'
import React, { useState, useEffect } from 'react'
import { Router } from 'next/dist/client/router'
import { useRouter } from 'next/router'
import IncChart from '../components/charts'

import dayjs from 'dayjs'
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

const server = process.env.SERVER

const dateFormat = 'MM-DD-YYYY'
const today = dayjs().format(dateFormat)
console.log(today)
const yesterday = dayjs().subtract(1, 'day').format(dateFormat)
const lastWeek = dayjs().subtract(1, 'week').format(dateFormat)
console.log(lastWeek)

let todaysInc = 0
let yesterdaysInc = 0
let todaysReq = 0
let yesterdaysReq = 0

export default function Home({ data, allData }) {
  const router = useRouter()

  const [updated, setUpdated] = React.useState(false)
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  };

  const handleClose = () => {
    setOpen(false)
  };

  Router.events.on('routeChangeComplete', () => {
    setUpdated(true)
  })
  
//   useEffect(()=>{
//     if(router.isReady){

//     const { updatedDate } = router.query
//   }
// }, [updated]
//   );


  if (typeof window !== "undefined") {
    // const interval = setInterval(() => {
    //   router.reload(window.location.pathname)
    // },60000)
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
        <h1 className="text-6xl font-bold p-10">
          SLAs
        </h1>

        <div className="flex flex-wrap max-w-auto">
          <SLAField name="INCs" value={`${todaysInc.value}%`} prev={`${yesterdaysInc.date}`} prevValue={`${yesterdaysInc.value}`}/>
          <SLAField name="REQs" value={`${todaysReq.value}%`} prev={`${yesterdaysReq.date}`} prevValue={`${yesterdaysReq.value}`}/>
        </div>
        <div className="h-2/4"></div>
        <Update />
        <IncChart data={allData} />
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

    console.table(data)
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