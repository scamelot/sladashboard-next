import { loadGetInitialProps } from 'next/dist/shared/lib/utils'
import Head from 'next/head'
import Image from 'next/image'

export default function Modal(props) {
    console.table(props)
    return (
        <div href="#" id="modal" className="modal w-3/4 self-center bg-blue-600 rounded-md p-2 transition-all duration-1000 ease-in-out">
        <h2 className="text-center font-bold">Success</h2>
        <h3 id='message' className='text-center' >SLAs updated.</h3>
        </div>
        )
}