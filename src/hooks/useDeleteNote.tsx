import { trpc } from '../utils/trpc'
import { useRouter } from 'next/router'
export const useDeleteNote = () => {
  const utils = trpc.useContext()
  const router = useRouter()
  return trpc.useMutation(['notes.deleteNote'], {
    onSuccess: (data) => {
      //invalidates the cache and refetches
      utils.invalidateQueries(['notes.getAllNotes'])
    }
  })
}
