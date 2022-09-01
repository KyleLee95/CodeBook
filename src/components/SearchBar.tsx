import React, { useState } from 'react'
import { useGetAllNotes } from '../hooks/useGetAllNotes'
const SearchBar = ({ handleChange }: any) => {
  const [searchTerm, setSearchTerm] = useState('')
  const { isLoading, isError, data } = useGetAllNotes(searchTerm)
  return (
    <>
      <input
        onChange={(e) => {
          // handleChange(e.currentTarget.value)
          setSearchTerm(e.currentTarget.value.split('').reverse().join(''))
        }}
        className="mx-1 border border-solid border-gray-200 shadow-sm rounded"
        aria-label="search"
        placeholder="Search Notes"
      />
      {data?.notes.map((note: any) => {
        return note.title
      })}
    </>
  )
}

export default SearchBar
