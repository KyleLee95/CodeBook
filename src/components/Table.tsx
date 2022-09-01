import Link from 'next/link'
import React from 'react'

const Table = function ({ notes }: any) {
  return (
    <table className="table-auto m-10">
      <thead>
        <tr className="">
          <th className="float-left">Name</th>
          <th>Created At:</th>
          <th>Updated At:</th>
        </tr>
      </thead>
      <tbody>
        {notes
          .sort((a: any, b: any) => a.id - b.id)
          .map((note: any) => {
            return (
              <Link key={note.id} href={`/notes/${note.id}`}>
                <tr className="cursor-pointer hover:bg-gray-800 rounded-md hover:text-white">
                  <td className="py-2">{note.title}</td>
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
