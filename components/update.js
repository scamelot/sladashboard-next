import Head from 'next/head'
import Image from 'next/image'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { useRouter } from "next/router";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function Update() {

  const router = useRouter()

  const todaysDate = dayjs().format('MM-DD-YYYY')

  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()

    // Get data from the form.
    const data = {
      inc: Number(event.target.inc.value),
      req: Number(event.target.req.value),
      date: todaysDate,
      dateReadable: todaysDate
    }

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data)

    // API endpoint where we send form data.
    const endpoint = '/api/inc'

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: 'POST',
      // Tell the server we're sending JSON.
      headers: {
        'Content-Type': 'application/json',
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata
    }

    const response = await fetch(endpoint, options)

    // Get the response data from server as JSON.
    const result = await response.json()
    router.push({
    pathname: `/`,
    query: {updated: todaysDate }
    })
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="bg-black flex flex-row items-end">
    <Button variant="contained" onClick={handleClickOpen} style={{textTransform: 'none', background:''}}>
      Update SLAs
    </Button>

    <Dialog open={open} onClose={handleClose} PaperProps={{style: {backgroundColor: 'black', border: 'solid 1px gray'}}}>
    <DialogTitle>Update SLAs</DialogTitle>
    <DialogContent>
    <div className="bg-black text-white flex flex-row text-center">
      <main>
        <h1 className="text-2xl font-bold p-10">
          Update SLAs for {`${todaysDate}`}
        </h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row">
          <div className="flex flex-col">
          <h3 className='text-center'>INC</h3>
          <input id="inc" className="m-10 h-20 text-black text-center"></input>
          </div>
          <div>
          <h3 className='text-center'>REQ</h3>
          <input id="req" className="m-10 h-20 text-black text-center"></input>
          </div>
          {/* <SLAField name="INC" />
          <SLAField name="REQ" /> */}
        </div>
        <div className="flex flex-wrap max-w-auto">
        <button id="submit" type="submit" onClick={handleClose} className="border-2 px-8 py-4 rounded-md hover:bg-blue-800 bg-blue-600 mx-auto">Update</button>
        </div>
      </form>
      </main>
    </div>
    </DialogContent>
    <DialogActions>
    <Button onClick={handleClose}>Cancel</Button>
    </DialogActions>
    </Dialog>
    </div>
  )
}
