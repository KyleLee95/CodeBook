import { trpc } from '../utils/trpc'
let counter = 0
export const useGetAllNotes = (searchTerm: string) => {
  const utils = trpc.useContext()
  const notes = trpc.useQuery(['notes.getAllNotes', { searchTerm }], {
    onSuccess(data) {}
  })

  return notes
}
