import Link from 'next/link'
import React from 'react'

const Table = function ({ notes }) {
  return (
    <table className="table-auto">
      <thead>
        <tr className="">
          <th>Name</th>
          <th>Created At:</th>
          <th>Updated At:</th>
        </tr>
      </thead>
      <tbody>
        {notes
          .sort((a, b) => a.id - b.id)
          .map((note) => {
            return (
              <Link key={note.id} href={`/notes/${note.id}`}>
                <tr className="text-center cursor-pointer hover:bg-gray-200 rounded">
                  <td className="inline-block">{note.title}</td>
                  <td className="text-center">
                    {note.createdAt.toLocaleDateString()}
                  </td>
                  <td className="text-center">
                    {note.updatedAt.toLocaleDateString()}
                  </td>
                </tr>
              </Link>
            )
          })}
      </tbody>
    </table>
  )
}

export default Table
