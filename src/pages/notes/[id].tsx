import React from 'react'
import { useRouter } from 'next/router'
import { trpc } from '../../utils/trpc'
import CodeEditor from '../../components/CodeEditor'
import Editor from '../../components/Editor'

const NoteEditor = () => {
  const router = useRouter()

  const id: number = parseInt(
    typeof router.query.id === 'string' ? router.query.id : ''
  ) // need as string because parseInt takes a string but router.query.id is

  const { isLoading, data } = trpc.useQuery(
    ['notes.getNoteById', { noteId: id }],
    {
      onError: () => {
        return 'error loading...'
      },
      onSuccess: () => {
        console.log('success!')
      }
    }
  )

  if (isLoading) {
    return 'Loading...'
  }

  if (!data?.note) {
    return 'not found'
  }
  const { note } = data

  return (
    <main className="min-h-screen grid gap-2 grid-cols-2">
      <div className="">
        <h3 className="text-2xl">{note?.title}</h3>
        <Editor text={note?.text} />
      </div>
      <div className="h-full">
        <CodeEditor code={note?.code} />
      </div>
    </main>
  )
}

export default NoteEditor
