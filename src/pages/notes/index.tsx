import React from 'react'
import { trpc } from '../../utils/trpc'
import Link from 'next/Link'
const NotesList = () => {
  const { isLoading, isError, data, error } = trpc.useQuery(
    ['notes.getAllNotes', { userId: 1 }],
    {}
  )
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
    <div>
      {data?.notes.map((note) => {
        return (
          <div key={note.id}>
            <Link href={`/notes/${note.id}`}>{note.title}</Link>
          </div>
        )
      })}
    </div>
  )
}

export default NotesList
