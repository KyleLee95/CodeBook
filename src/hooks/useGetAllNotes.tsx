import { trpc } from '../utils/trpc'
export const useGetAllNotes = (searchTerm: string) => {
  const notes = trpc.useQuery(['notes.getAllNotes', { searchTerm }], {
    keepPreviousData: true
  })

  return notes
}
