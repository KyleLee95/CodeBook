import React from 'react'
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
      className="text-2xl font-semibold pl-5 hover:border-2 hover:border-gray-200 w-1/2 rounded shadow-sm"
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
