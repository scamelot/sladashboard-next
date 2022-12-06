import styles from '../styles/Home.module.css'
import React, { useEffect } from 'react'
import { Router } from 'next/dist/client/router'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useState } from 'react'

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

  const [access, setAccess] = useState(false)
  const [kioskMode, setKioskMode] = useState(false)

  let correctKey = allUsers.filter(x => x.key)[0].key

  //check if user has access flag
  //check for kiosk key
  useEffect(() => {
    if (user) {
      setAccess(allUsers.filter(x => x.user_id == user.sub)[0].access)
    }
  if (typeof window !== 'undefined') {
    const savedKey = window.localStorage.getItem('kioskKey')
    console.log(savedKey)
    if (savedKey == correctKey) {
      setAccess(true)
      setKioskMode(true)
      }
    }
  }, [user,allUsers,correctKey])

  const [updated, setUpdated] = React.useState(false)

  Router.events.on('routeChangeComplete', () => {
    setUpdated(true)
  })
  
  todaysInc = data[0]
  yesterdaysInc = data[1]
  todaysReq = data[2]
  yesterdaysReq = data[3]

  const shouldRender = () => {
    return user || kioskMode
  }

  return (
  <div className={styles.main}>
        {(user || kioskMode) ?
        access ?
          <div className="flex flex-col mt-2">
            <SLACard name='INCs' current={todaysInc} prev={yesterdaysInc} data={allData}/>
            <SLACard name='REQs' current={todaysReq} prev={yesterdaysReq} data={allData}/>
          </div>
          //if access is false
          : <p className="text-3xl">You do not have access to this resource.</p>
        : //if not logged in
        <p className="text-3xl">Please log in.</p>}
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