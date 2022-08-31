import React from 'react'
import { trpc } from '../../utils/trpc'

import Button from '../../components/Button'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Table from '../../components/Table'
import Head from 'next/head'
const NotesList = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const utils = trpc.useContext()
  const { isLoading, isError, data, error } = trpc.useQuery([
    'notes.getAllNotes'
  ])
  const createNewNoteMutation = trpc.useMutation(['notes.createNote'], {
    onSuccess: (data) => {
      //invalidates the cache and refetches
      utils.invalidateQueries(['notes.getAllNotes'])
      //send user to new note page
      router.push(`/notes/${data.id}`)
    }
  })
  const createNewNote = () => {
    createNewNoteMutation.mutate({})
  }
  if (!session?.user?.id) {
    return 'please login'
  }
  if (isLoading) {
    return 'loading...'
  }
  if (isError) {
    return error
  }

  if (data?.notes.length === 0) {
    return (
      <div>
        <Button text="Create New Note" handleClick={createNewNote} />
        no notes!
      </div>
    )
  }
  // console.log(data?.notes)
  return (
    <div className="grid grid-cols-1 mx-auto">
      <Head>
        <title>CodeBook | Notes</title>
        <meta name="notes" content="CodeBook" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Table notes={data?.notes} />
    </div>
  )
}

export default NotesList
