import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import { trpc } from '../../utils/trpc'
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
        return <div key={note.id}>{note.title}</div>
      })}
    </div>
  )
}

export default NotesList
