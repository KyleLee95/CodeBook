import { trpc } from '../utils/trpc'

export const useGetAllNotes = (searchTerm: string) => {
  const utils = trpc.useContext()
  const notes = trpc.useQuery(['notes.getAllNotes', { searchTerm }], {
    onSuccess(data) {
      //   utils.invalidateQueries(['notes.getAllNotes'])
      //   utils.setQueryData(['notes.getAllNotes'], () => {
      //     return {
      //       ...data
      //     }
      //   })
    }
  })
  console.log('notes', notes)
  return notes
}
