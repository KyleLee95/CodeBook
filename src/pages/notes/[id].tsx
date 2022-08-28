import React from 'react'
import { useRouter } from 'next/router'
import { useNote } from '../../hooks/useNote'
import CodeEditor from '../../components/CodeEditor'
import Editor from '../../components/Editor'
import TitleInput from '../../components/TitleInput'
import { useSession } from 'next-auth/react'
const NoteEditor = () => {
  const router = useRouter()
  const { data: session, status } = useSession()
  const { isLoading, data, error } = useNote(router.query.id)

  if (!session?.user?.id) {
    return 'please login'
  }
  if (error) {
    return 'error'
  }

  if (isLoading) {
    return 'Loading...'
  }

  if (!data || !data.id) {
    return 'not found'
  }

  const defaultText =
    data?.text && typeof data.text === 'string' ? JSON.parse(data.text) : ''

  return (
    <main className="min-h-screen grid gap-2 grid-cols-2">
      <div className="">
        <TitleInput title={data?.title} />

        <Editor text={defaultText} />
      </div>
      <div className="h-full">
        <CodeEditor code={data.code} />
      </div>
    </main>
  )
}

export default NoteEditor
