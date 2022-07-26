import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import SLAField from './SLAField.js'
import Modal from './modal.js'
import Update from './update.js'
import React, { useState, useEffect } from 'react'
import { Router } from 'next/dist/client/router'
import { useRouter } from 'next/router'
import Button from '@mui/material/Button'

import dayjs from 'dayjs'
import { compose } from '@mui/system'
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

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

export default function Home({ data }) {
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

  const getData = async () => {
    const allIncs = await fetch('http://localhost:3000/api/inc')
    let fetched = await allIncs.json()
    setData(fetched)
  }
  
  useEffect(()=>{
    if(router.isReady){

    const { updatedDate } = router.query
  }
}, [updated]
  );


  if (typeof window !== "undefined") {
    const interval = setInterval(() => {
      router.reload(window.location.pathname)
    },60000)
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

  //if no update yet set to last set data...is this necessary since we grab last two db entries?
  // if (!todaysInc) {
  //   todaysInc = yesterdaysInc
  // }

  // if (!todaysReq) {
  //   todaysReq = yesterdaysReq
  // }

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
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  const allIncs = await fetch('http://localhost:3000/api/inc')
  const data = await allIncs.json()

  return { props: { data }}

}