import React from 'react'

interface SearchBarProps {
  handleChange: (event: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ handleChange }) => {
  return (
    <>
      <input
        onChange={(e) => {
          handleChange(e.currentTarget.value)
        }}
        className="px-1 py-1 mx-1 border border-solid border-gray-200 shadow-sm rounded"
        aria-label="search"
        placeholder="Search Notes"
      />
    </>
  )
}

export default SearchBar
