import { trpc } from '../utils/trpc'
import { Dispatch, SetStateAction } from 'react'
export const useRunUserCode = (setState: Dispatch<SetStateAction<string>>) => {
  const { useMutation } = trpc

  const mutation = useMutation(['codeEnvironments.javascript'], {
    onSuccess: (data) => {
      setState(data.results)
    },
    onMutate: () => {
      /*
        TODO:
        have some kind of running state here that creates a loading shell.
        */
    }
  })
  return mutation
}
