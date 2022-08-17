import { trpc } from '../utils/trpc'
export const useNote = (noteId: string | string[] | undefined) => {
  const id: number = parseInt(typeof noteId === 'string' ? noteId : '') // need as string because parseInt takes a string but router.query.id is

  const note = trpc.useQuery(['notes.getNoteById', { noteId: id }])

  return note
}
