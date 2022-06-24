import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import SLAField from './inc.js'
import React, { useState } from 'react'

export default function Home() {

  return (
    <div className={styles.container}>
      <Head>
        <title>SLA Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className="text-5xl font-bold underline p-10">
          SLAs
        </h1>

        <div className="flex flex-wrap max-w-auto">
          <SLAField name="INCs" />
          <SLAField name="REQs" />
        </div>
      </main>
    </div>
  )
}
