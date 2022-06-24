import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import SLAField from './inc.js'
import React, { useState } from 'react'

export default function Update() {


  const current = new Date()
  const todaysDate = `${current.getMonth()+1}-${current.getDate()}-${current.getFullYear()}`


  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()

    // Get data from the form.
    const data = {
      inc: Number(event.target.inc.value),
      req: Number(event.target.req.value),
      date: current,
      dateReadable: todaysDate
    }

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data)

    // API endpoint where we send form data.
    const endpoint = '/api/inc'

    // Form thxe request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: 'POST',
      // Tell the server we're sending JSON.
      headers: {
        'Content-Type': 'application/json',
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    }

    const response = await fetch(endpoint, options)

    // Get the response data from server as JSON.
    const result = await response.json()
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>SLA Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className="text-5xl font-bold underline p-10">
          Update SLAs for {`${todaysDate}`}
        </h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap">
          <div className="flex flex-col">
          <h3 className='text-center'>INC</h3>
          <input id="inc" className="m-10 h-20 text-black text-center"></input>
          </div>
          <div>
          <h3 className='text-center'>REQ</h3>
          <input id="req" className="m-10 h-20 text-black text-center"></input>
          </div>
        </div>
        <div className="flex flex-wrap max-w-auto">
        <button id="submit" type="submit" className="border-2 px-8 py-4 rounded-md hover:bg-blue-800 bg-blue-600 mx-auto">Update</button>
        </div>
      </form>
      </main>
    </div>
  )
}
