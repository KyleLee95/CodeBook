import React from 'react'
import { useRouter } from 'next/router'
import { useNote } from '../../hooks/useNote'
import Head from 'next/head'
import Editor from '../../components/Editor'
import TitleInput from '../../components/TitleInput'
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'

const CodeEditor = dynamic(() => import('../../components/CodeEditor'), {
  ssr: false
})

const NoteEditor = () => {
  const router = useRouter()
  const { data: session, status } = useSession()
  const { isLoading, data, error } = useNote(router.query.id)

  if (!session?.user?.id) {
    return <h2>please login</h2>
  }

  if (error) {
    return <h2>An error occured</h2>
  }

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (!data || !data.id) {
    return <h2>not found</h2>
  }

  const defaultText =
    data?.text && typeof data.text === 'string' ? JSON.parse(data.text) : ''

  return (
    <div>
      <Head>
        <title>CodeBook | {data?.title}</title>
        <meta name="notes" content="CodeBook" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen grid gap-2 grid-cols-2">
        <div className="">
          <TitleInput title={data?.title} />
          <Editor text={defaultText} />
        </div>
        <div className="h-full">
          <CodeEditor code={data.code} />
        </div>
      </main>
    </div>
  )
}

export default NoteEditor
