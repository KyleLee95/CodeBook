import { trpc } from '../utils/trpc'

export const useUpdateNote = () => {
  const utils = trpc.useContext()
  const { useMutation } = trpc
  const mutation = useMutation(['notes.updateNoteById'], {
    onMutate: (variables) => {
      /**
       * https://tanstack.com/query/v4/docs/guides/mutations?from=reactQueryV3&original=https://react-query-v3.tanstack.com/guides/mutations
       * 1. Cancel query so that you don't overwrite
       * 2. merge the two objects and return the optimistic state
       */
      utils.cancelQuery(['notes.getNoteById'])

      utils.setQueryData(['notes.getNoteById'], (staleState) => {
        return {
          ...staleState,
          //merging the two objects. variables only holds what you updated. everything else from "staleState" can be kept.
          ...variables
        }
      })
    },
    onSettled: () => {
      //invalidate the query so that your cache is up to date with the optimistic state
      utils.invalidateQueries(['notes.getNoteById'])
    }
  })
  return mutation
}
