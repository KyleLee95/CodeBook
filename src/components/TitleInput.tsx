import React, { useState } from 'react'
import { useUpdateNote } from '../hooks/useUpdateNote'
import { useRouter } from 'next/router'
interface TitleInputProps {
  title: string | null | undefined
}
const TitleInput = ({ title }: TitleInputProps) => {
  const updateNote = useUpdateNote()
  const router = useRouter()

  return (
    <input
      className="hover:border-2 hover:border-black"
      onChange={(e: React.FormEvent<HTMLInputElement>) => {
        const id =
          typeof router.query.id === 'string' ? parseInt(router.query.id) : NaN
        updateNote.mutate({
          title: e.currentTarget.value,
          id
        })
      }}
      defaultValue={title || ''}
    />
  )
}

export default TitleInput
