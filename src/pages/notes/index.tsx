import React from 'react'
import { trpc } from '../../utils/trpc'
import Link from 'next/Link'
import Button from '../../components/Button'
const NotesList = () => {
  const { isLoading, isError, data, error } = trpc.useQuery(
    ['notes.getAllNotes', { userId: '1' }],
    {}
  )
  const createNewNoteMutation = trpc.useMutation(['notes.createNote'])
  const createNewNote = () => {
    createNewNoteMutation.mutate({})
  }
  if (isLoading) {
    return 'loading...'
  }
  if (isError) {
    return error
  }

  if (data?.notes.length === 0) {
    return 'no notes!'
  }

  return (
    <div className="grid grid-cols-1 mx-auto">
      <div>
        <Button text="Create New Note" handleClick={createNewNote} />
      </div>
      <div>
        {data?.notes.map((note) => {
          return (
            <div key={note.id}>
              <Link href={`/notes/${note.id}`}>{note.title}</Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default NotesList
