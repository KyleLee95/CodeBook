import Link from 'next/link'
import React from 'react'
import TableSmButton from './TableSmButton'
import { useDeleteNote } from '../hooks/useDeleteNote'
import { useGetAllNotes } from '../hooks/useGetAllNotes'

const Table = function ({ notes }: any) {
  const deleteNote = useDeleteNote()
  const confirmMessage = 'are you sure you want to delete this note?'
  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left ">
        <thead className="text-xs text-black uppercase bg-gray-50 ">
          <tr>
            <th scope="col" className="py-3 px-6">
              Title
            </th>
            <th scope="col" className="py-3 px-6">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => {}}
              >
                Created At
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-1 w-3 h-3"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 320 512"
                >
                  <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                </svg>
              </div>
            </th>
            <th scope="col" className="py-3 px-6">
              <div className="flex items-center cursor-pointer">
                Updated At
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-1 w-3 h-3"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 320 512"
                >
                  <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                </svg>
              </div>
            </th>
            <th scope="col" className="py-3 px-6">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note: any) => {
            return (
              <Link key={note.id} href={`/notes/${note.id}`}>
                <tr className="mx-2 border-b border-t shadow-sm cursor-pointer hover:bg-gray-800 rounded hover:text-white">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium whitespace-nowrap "
                  >
                    {note.title}
                  </th>
                  <td className="py-4 px-6 ">
                    {note.createdAt.toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">
                    {note.updatedAt.toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 text-left">
                    <TableSmButton
                      text="X"
                      handleClick={(event) => {
                        event?.stopPropagation() // stop the row link from triggering when click on the button

                        const confirmDelete = window.confirm(confirmMessage)
                        event?.preventDefault()
                        if (confirmDelete) {
                          deleteNote.mutate({ id: note.id })

                          return false
                        } else {
                          return false
                        }
                      }}
                    />
                  </td>
                </tr>
              </Link>
            )
          })}
        </tbody>
      </table>
    </div>
    // <table className="table-auto m-10">
    //   <thead>
    //     <tr className="border-t-0">
    //       <th className="py-3 px-6">
    //         <div className="flex items-center">
    //           Name
    //           <a href="#">
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               className="ml-1 w-3 h-3"
    //               aria-hidden="true"
    //               fill="currentColor"
    //               viewBox="0 0 320 512"
    //             >
    //               <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
    //             </svg>
    //           </a>
    //         </div>
    //       </th>
    //       <th className="py-3 px-6">
    //         <div className="flex items-center">
    //           Created At:
    //           <a href="#">
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               className="ml-1 w-3 h-3"
    //               aria-hidden="true"
    //               fill="currentColor"
    //               viewBox="0 0 320 512"
    //             >
    //               <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
    //             </svg>
    //           </a>
    //         </div>
    //       </th>
    //       <th className="py-3 px-6">
    //         <div className="flex items-center">
    //           Updated At:
    //           <a href="#">
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               className="ml-1 w-3 h-3"
    //               aria-hidden="true"
    //               fill="currentColor"
    //               viewBox="0 0 320 512"
    //             >
    //               <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
    //             </svg>
    //           </a>
    //         </div>
    //       </th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {notes
    //       .sort((a: any, b: any) => b.id - a.id)
    //       .map((note: any) => {
    //         return (
    //           <Link key={note.id} href={`/notes/${note.id}`}>
    //             <tr
    //               key={note.id}
    //               className="mx-2 border-b border-t shadow-sm cursor-pointer hover:bg-gray-800 rounded hover:text-white"
    //             >
    //               <td className="pl-7">{note.title}</td>
    //               <td className="pl-10">
    //                 {note.createdAt.toLocaleDateString()}
    //               </td>
    //               <td className="pl-10">
    //                 {note.updatedAt.toLocaleDateString()}
    //               </td>
    //               <td className="pr-10">
    //                 <TableSmButton
    //                   text="X"
    //                   handleClick={(event) => {
    //                     event?.stopPropagation()

    //                     const confirmDelete = window.confirm(confirmMessage)

    //                     window.addEventListener('beforeunload', (e) => {
    //                       e.preventDefault()
    //                     })

    //                     if (confirmDelete) {
    //                       deleteNote.mutate({ id: note.id })
    //                       event?.preventDefault()
    //                       return false
    //                     } else {
    //                       event?.preventDefault()
    //                       return false
    //                     }
    //                   }}
    //                 />
    //               </td>
    //             </tr>
    //           </Link>
    //         )
    //       })}
    //   </tbody>
    // </table>
  )
}

export default Table
