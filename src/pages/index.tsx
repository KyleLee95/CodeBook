import type { NextPage } from 'next'
import Head from 'next/head'
import Button from '../components/Button'

import { signIn, useSession } from 'next-auth/react'
const Home: NextPage = () => {
  const { data: session, status } = useSession()
  return (
    <>
      <Head>
        <title>CodeBook</title>
        <meta name="description" content="CodeBOok" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
          Create <span className="text-purple-300">T3</span> App
        </h1>
        {session ? (
          'signed in'
        ) : (
          <Button text="Sign In" handleClick={() => signIn()} />
        )}
        <p className="text-2xl text-gray-700">This stack uses:</p>
        <div className="grid gap-3 pt-3 mt-3 text-center md:grid-cols-2 lg:w-2/3"></div>
        <div className="pt-6 text-2xl text-blue-500 flex justify-center items-center w-full">
          yay
        </div>
      </main>
    </>
  )
}
export default Home
