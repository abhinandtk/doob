import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <button type="button" class="btn btn-primary">Primary</button>
    <div className='test' >f</div>
    <div className='help' >f</div>
    </>
  )
}
