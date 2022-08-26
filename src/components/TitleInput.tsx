import React, { useState } from 'react'
import { useUpdateNote } from '../hooks/useUpdateNote'
import { useRouter } from 'next/router'
interface TitleInputProps {
  title: string | null | undefined
}
const TitleInput = ({ title }: TitleInputProps) => {
  const updateNote = useUpdateNote()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  if (open) {
    return (
      <input
        className="outline hover:outline-2"
        onChange={(e: React.FormEvent<HTMLInputElement>) => {
          const id =
            typeof router.query.id === 'string'
              ? parseInt(router.query.id)
              : NaN
          updateNote.mutate({
            title: e.currentTarget.value,
            id
          })
        }}
        defaultValue={title || ''}
      />
    )
  } else {
    return (
      <h3
        onClick={() => {
          setOpen(true)
        }}
      >
        {title}
      </h3>
    )
  }
}

export default TitleInput
