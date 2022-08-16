import React, { SyntheticEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { trpc } from '../../utils/trpc'
import { useNote } from '../../hooks/useNote'
import CodeEditor from '../../components/CodeEditor'
import Editor from '../../components/Editor'

import { JSONValue } from 'superjson/dist/types'

interface noteType {
  id: number
  title: string
  text: string
  code: string
}

const NoteEditor = () => {
  const router = useRouter()
  const utils = trpc.useContext()
  const { isLoading, data, error } = useNote(router.query.id)
  const updateNoteOnDB = trpc.useMutation(['notes.updateNoteById'])

  const handleChange = (field: string, value?: JSONValue | string) => {
    if (!data?.note) {
      return
    }
    const code = {
      ...data?.note,
      [field]: value
    }

    updateNoteOnDB.mutate(code)
  }

  if (isLoading) {
    return 'Loading...'
  }

  if (!data?.note) {
    return 'not found'
  }

  return (
    <main className="min-h-screen grid gap-2 grid-cols-2">
      <div className="">
        <h3 className="text-2xl">{data?.note?.title}</h3>
        <Editor text={data?.note?.text} handleChange={handleChange} />
      </div>
      <div className="h-full">
        <CodeEditor code={data?.note?.code} handleChange={handleChange} />
      </div>
    </main>
  )
}

export default NoteEditor
