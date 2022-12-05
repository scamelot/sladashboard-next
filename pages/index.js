import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Modal from '../components/modal'
import React from 'react'
import { Router } from 'next/dist/client/router'
import { useUser } from '@auth0/nextjs-auth0/client'

import dayjs from 'dayjs'
import SLACard from '../components/SLACard'
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

const server = process.env.SERVER

let todaysInc = 0
let yesterdaysInc = 0
let todaysReq = 0
let yesterdaysReq = 0

export default function Home({ data, allData, allUsers }) {

  const { user, error, isLoading } = useUser()
  console.log(user)

  let access = false
  //check if user has access flag
  if (user) {
    access = allUsers.filter(x => x.user_id == user.sub)[0].access
  }

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
      { access ?
        <div className="flex flex-col mt-2">
          <SLACard name='INCs' current={todaysInc} prev={yesterdaysInc} data={allData}/>
          <SLACard name='REQs' current={todaysReq} prev={yesterdaysReq} data={allData}/>
        </div>
        : <div className="text-3xl">You do not have access to this resource.</div>
      }
    </div>
  )
}

export async function getServerSideProps() {
  try {
    const current = await fetch(`${server}/api/inc`)
    const data = await current.json()
    const all = await fetch(`${server}/api/inc/all`)
    const allData = await all.json()
    const userData = await fetch(`${server}/api/users`)
    const allUsers = await userData.json()

    return { props: { data, allData, allUsers }}
  }

  catch (err) {
    console.error(dayjs(), err)
  }

}