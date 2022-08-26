import React, { useState } from 'react'
import Button from './Button'

interface DropDownButtonProps {
  stateOptions: any
  state: any
  setState: any
}
const DropDownButton = ({
  stateOptions,
  state,
  setState
}: DropDownButtonProps) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative inline-block text-left">
      <Button text={`Language: ${state}`} handleClick={() => setOpen(!open)} />
      {/**
       *
       * Flex flex-col turn the list into a vertical element
       * hidden hides them
       * bg-white drop-shadow-md adds a white background and some shadow
       * max-w-xs sets a max width for the dropdown as a whole
       */}

      <ul
        className={`${
          open
            ? ''
            : 'hidden flex-col bg-white drop-shadow-md w-full left-0 top-full absolute'
        }
           `}
      >
        {stateOptions.map((option: any) => {
          return (
            <li key={option}>
              <a
                onClick={() => {
                  setState(option)
                  setOpen(!open)
                }}
                className="block px-5 py-3 hover:bg-amber-300 border-b border-gray-200"
              >
                {option}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default DropDownButton
