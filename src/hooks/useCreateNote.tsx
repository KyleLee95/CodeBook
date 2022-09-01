import { trpc } from '../utils/trpc'
import { useRouter } from 'next/router'
export const useCreateNote = () => {
  const utils = trpc.useContext()
  const router = useRouter()
  return trpc.useMutation(['notes.createNote'], {
    onSuccess: (data) => {
      //invalidates the cache and refetches
      utils.invalidateQueries(['notes.getAllNotes'])
      //send user to new note page
      router.push(`/notes/${data.id}`)
    }
  })
}
