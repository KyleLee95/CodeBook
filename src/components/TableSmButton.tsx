import React, { SyntheticEvent } from 'react'

interface ButtonProps {
  handleClick: (e?: SyntheticEvent<Element, Event>, code?: string) => void
  text: string
}

const TableSmButton = ({ text, handleClick }: ButtonProps) => {
  return (
    <button
      onClick={handleClick}
      className="m-1 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-red-400 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 z-50000"
    >
      {text}
    </button>
  )
}

export default TableSmButton
