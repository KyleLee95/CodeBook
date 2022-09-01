import React from 'react'

const SearchBar = ({ handleChange }: any) => {
  return (
    <>
      <input
        onChange={(e) => {
          handleChange(e.currentTarget.value)
        }}
        className="mx-1 border border-solid border-gray-200 shadow-sm rounded"
        aria-label="search"
        placeholder="Search Notes"
      />
    </>
  )
}

export default SearchBar
