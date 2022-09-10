import type { NextPage } from 'next'
import Head from 'next/head'
import Editor from '../components/Editor'

import dynamic from 'next/dynamic'

const HomePageCodeEditor = dynamic(
  () => import('../components/HomePageCodeEditor'),
  {
    ssr: false
  }
)

import { signIn, useSession } from 'next-auth/react'
const Home: NextPage = () => {
  const { data: session, status } = useSession()

  return (
    <>
      <Head>
        <title>CodeBook</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen p-4">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
          A note taking app designed with programmers in mind
        </h1>
        <h2 className="text-2xl md:text-[2rem] leading-normal font-extrabold text-gray-700">
          Try the demo below:
        </h2>
        <div className="grid md:grid-cols-2 sm:grid-cols-1 h-screen">
          <Editor text="try me!" />
          <HomePageCodeEditor />
        </div>
      </main>
    </>
  )
}
export default Home
