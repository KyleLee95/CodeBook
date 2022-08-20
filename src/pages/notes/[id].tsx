import React, { SyntheticEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { trpc } from '../../utils/trpc'
import { useNote } from '../../hooks/useNote'
import CodeEditor from '../../components/CodeEditor'
import Editor from '../../components/Editor'
import { useSession } from 'next-auth/react'
import { JSONValue } from 'superjson/dist/types'

const NoteEditor = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const utils = trpc.useContext()
  const { isLoading, data, error } = useNote(router.query.id)
  const updateNoteOnDB = trpc.useMutation(['notes.updateNoteById'], {
    onMutate: (variables) => {
      utils.setQueryData(['notes.getNoteById'], variables)
    }
  })

  const handleChange = (field: string, value?: JSONValue | string) => {
    if (!data) {
      return
    }
    const updated = {
      ...data,
      [field]: value
    }
    if (!updated) return

    updateNoteOnDB.mutate(updated) //not sure how to fix this. need to research
  }

  if (error) {
    return 'error'
  }

  if (isLoading) {
    return 'Loading...'
  }

  if (!data) {
    return 'not found'
  }

  return (
    <main className="min-h-screen grid gap-2 grid-cols-2">
      <div className="">
        <h3 className="text-2xl">{data?.title}</h3>
        <Editor text={data?.text} handleChange={handleChange} />
      </div>
      <div className="h-full">
        <CodeEditor code={data?.code} handleChange={handleChange} />
      </div>
    </main>
  )
}

export default NoteEditor
