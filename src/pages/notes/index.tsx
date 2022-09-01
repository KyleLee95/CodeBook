import React, { useState } from 'react'
import Button from '../../components/Button'
import { useSession } from 'next-auth/react'
import { useCreateNote } from '../../hooks/useCreateNote'
import { useGetAllNotes } from '../../hooks/useGetAllNotes'
import Table from '../../components/Table'
import Head from 'next/head'
import SearchBar from '../../components/SearchBar'

const NotesTable = ({ searchTerm }: any) => {
  const { isLoading, isError, data } = useGetAllNotes(searchTerm)

  if (isLoading) {
    return <h2>loading...</h2>
  }
  if (isError) {
    return <h2>error</h2>
  }

  if (data?.notes.length === 0) {
    return <h2>No notes found</h2>
  }
  return <Table notes={data?.notes} />
}
const NotesList = () => {
  const { data: session } = useSession()
  const [searchTerm, setSearchTerm] = useState('')
  const createNewNoteMutation = useCreateNote()

  const createNewNote = () => {
    createNewNoteMutation.mutate({})
  }

  if (!session?.user?.id) {
    return <h2>please login</h2>
  }

  return (
    <div className="grid grid-cols-1 mx-auto">
      <Head>
        <title>CodeBook | Notes</title>
        <meta name="notes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Button text="Create New Note" handleClick={createNewNote} />
        <SearchBar handleChange={setSearchTerm} />
      </div>
      <NotesTable searchTerm={searchTerm} />
    </div>
  )
}

export default NotesList
